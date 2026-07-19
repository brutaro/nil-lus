#!/usr/bin/env python3
"""Auditable crawler for the public Nil Lus Wix site."""
from __future__ import annotations

import hashlib
import json
import mimetypes
import re
import ssl
import sys
import time
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, unquote, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen

ROOT = "https://nillus2021.wixsite.com/website"
OUT = Path("handoff-nillus")
EXTRACTION = OUT / "extraction"
ASSETS_DIR = OUT / "assets"
SITE_PREFIX = "/website"
USER_AGENT = "Mozilla/5.0 (compatible; public-site-handoff-audit/1.0)"
# The local Python trust store cannot validate the Wix certificate chain while curl
# can. This crawler only reads the user-supplied public HTTPS site.
SSL_CONTEXT = ssl._create_unverified_context()

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links: list[dict] = []
        self.assets: list[dict] = []
        self.text: list[dict] = []
        self._stack: list[str] = []
        self._attrs: list[dict] = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        self._stack.append(tag)
        self._attrs.append(d)
        if tag == "a" and d.get("href"):
            self.links.append({"href": d["href"], "text": "", "title": d.get("title", "")})
        for attr in ("src", "href", "poster", "srcset", "data-src", "data-image-info"):
            value = d.get(attr)
            if value and (tag in {"img", "video", "source", "link", "script", "iframe"} or attr in {"src", "poster", "data-src", "srcset"}):
                self.assets.append({"tag": tag, "attribute": attr, "value": value})
        style = d.get("style", "")
        for item in re.findall(r"url\(([^)]+)\)", style):
            self.assets.append({"tag": tag, "attribute": "style-url", "value": item.strip(" '\"")})

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self._stack:
            self._stack.pop()
            self._attrs.pop()

    def handle_data(self, data):
        value = " ".join(data.split())
        if not value:
            return
        tag = self._stack[-1] if self._stack else "document"
        if tag not in {"script", "style", "noscript", "template"}:
            self.text.append({"tag": tag, "text": value})
        if self.links and self._stack and "a" in self._stack:
            self.links[-1]["text"] = (self.links[-1]["text"] + " " + value).strip()

def request(url: str) -> tuple[bytes, str]:
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,*/*;q=0.8"})
    with urlopen(req, timeout=45, context=SSL_CONTEXT) as response:
        return response.read(), response.headers.get_content_type()

def canonical(url: str) -> str:
    p = urlparse(url)
    return urlunparse((
        p.scheme,
        p.netloc,
        quote(unquote(p.path.rstrip("/") or "/"), safe="/%:@"),
        "",
        quote(unquote(p.query), safe="=&%:@/?"),
        "",
    ))

def classify(url: str) -> str:
    p = urlparse(url)
    if url.startswith("mailto:"):
        return "email"
    if url.startswith("tel:"):
        return "telephone"
    if "wa.me" in p.netloc or "whatsapp" in url.lower():
        return "whatsapp"
    if p.netloc == "nillus2021.wixsite.com" and p.path.startswith(SITE_PREFIX):
        return "internal"
    return "external"

def filename_for(url: str, content_type: str) -> str:
    p = urlparse(url)
    base = unquote(Path(p.path).name) or "asset"
    base = re.sub(r"[^A-Za-z0-9._-]+", "_", base)[:120]
    stem, ext = (Path(base).stem, Path(base).suffix)
    if not ext:
        ext = mimetypes.guess_extension(content_type) or ".bin"
    digest = hashlib.sha256(url.encode()).hexdigest()[:12]
    return f"{stem}_{digest}{ext}"

def main():
    EXTRACTION.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    queue = deque([ROOT])
    seen: set[str] = set()
    pages: list[dict] = []
    all_links: list[dict] = []
    all_assets: list[dict] = []
    all_text: list[dict] = []

    while queue:
        url = canonical(queue.popleft())
        if url in seen:
            continue
        seen.add(url)
        try:
            raw, ctype = request(url)
        except (HTTPError, URLError, TimeoutError) as e:
            pages.append({"url": url, "error": str(e)})
            continue
        html = raw.decode("utf-8", "replace")
        slug = urlparse(url).path.replace(SITE_PREFIX, "").strip("/") or "inicio"
        safe_slug = re.sub(r"[^A-Za-z0-9._-]+", "_", unquote(slug))
        html_path = EXTRACTION / f"page-{safe_slug}.html"
        html_path.write_text(html, encoding="utf-8")
        parser = PageParser()
        parser.feed(html)
        title_match = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
        title = re.sub(r"\s+", " ", title_match.group(1)).strip() if title_match else ""
        page = {"url": url, "title": title, "html_file": str(html_path.relative_to(OUT)), "bytes": len(raw), "content_type": ctype, "links": len(parser.links), "assets": len(parser.assets), "text_nodes": len(parser.text)}
        pages.append(page)
        for link in parser.links:
            absolute = urljoin(url, link["href"])
            item = {**link, "source_page": url, "absolute_url": absolute, "kind": classify(absolute)}
            all_links.append(item)
            if item["kind"] == "internal":
                parsed = urlparse(absolute)
                if parsed.query in {"", "lang=en"}:
                    queue.append(absolute)
        for asset in parser.assets:
            raw_value = asset["value"].split(",")[0].strip().split(" ")[0]
            if raw_value.startswith("data:") or raw_value.startswith("#"):
                continue
            absolute = urljoin(url, raw_value)
            all_assets.append({**asset, "source_page": url, "absolute_url": absolute})
        for text in parser.text:
            all_text.append({**text, "source_page": url})
        print(f"fetched {url}: {len(raw)} bytes; queue={len(queue)}", file=sys.stderr)
        time.sleep(0.15)

    # Extract Wix media URLs embedded in page JSON that don't live as HTML attributes.
    media_pattern = re.compile(r'https?://static\.wixstatic\.com/media/[^"\\\s<>]+')
    for page in pages:
        if "html_file" not in page:
            continue
        html = (OUT / page["html_file"]).read_text(encoding="utf-8", errors="replace")
        for u in media_pattern.findall(html):
            all_assets.append({"tag": "embedded-page-data", "attribute": "media-url", "value": u, "source_page": page["url"], "absolute_url": u})

    # Stable deduplication while retaining source-page provenance in the first observed record.
    dedup_links = []
    seen_link = set()
    for x in all_links:
        key = (x["source_page"], x["absolute_url"], x["text"])
        if key not in seen_link:
            seen_link.add(key); dedup_links.append(x)
    dedup_assets = []
    seen_asset = set()
    for x in all_assets:
        key = x["absolute_url"]
        if key not in seen_asset:
            seen_asset.add(key); dedup_assets.append(x)

    downloaded = []
    for index, asset in enumerate(dedup_assets, 1):
        url = asset["absolute_url"]
        if urlparse(url).netloc not in {"static.wixstatic.com", "nillus2021.wixsite.com"}:
            continue
        try:
            raw, ctype = request(url)
            name = filename_for(url, ctype)
            dest = ASSETS_DIR / name
            dest.write_bytes(raw)
            downloaded.append({"url": url, "file": str(dest.relative_to(OUT)), "bytes": len(raw), "content_type": ctype, "sha256": hashlib.sha256(raw).hexdigest()})
            print(f"asset {index}/{len(dedup_assets)} {name}", file=sys.stderr)
        except Exception as e:
            downloaded.append({"url": url, "error": str(e)})

    (EXTRACTION / "pages.json").write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8")
    (EXTRACTION / "links.json").write_text(json.dumps(dedup_links, ensure_ascii=False, indent=2), encoding="utf-8")
    (EXTRACTION / "assets.json").write_text(json.dumps(dedup_assets, ensure_ascii=False, indent=2), encoding="utf-8")
    (EXTRACTION / "text-items.json").write_text(json.dumps(all_text, ensure_ascii=False, indent=2), encoding="utf-8")
    (EXTRACTION / "downloaded-assets.json").write_text(json.dumps(downloaded, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"pages": len(pages), "links": len(dedup_links), "assets": len(dedup_assets), "downloaded": len(downloaded)}, ensure_ascii=False))

if __name__ == "__main__":
    main()
