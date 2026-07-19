#!/usr/bin/env python3
"""Create compact, auditable text and image metadata inventories from crawl output."""
from __future__ import annotations
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote
from crawl_site import PageParser

ROOT = Path(__file__).parent
EXTRACTION = ROOT / "extraction"
OUT = ROOT

pages = json.loads((EXTRACTION / "pages.json").read_text())
assets = json.loads((EXTRACTION / "assets.json").read_text())
downloaded = json.loads((EXTRACTION / "downloaded-assets.json").read_text())
try:
    from PIL import Image
except ImportError:
    Image = None

# URL -> all source pages, retaining operational asset links.
usage = defaultdict(set)
for a in assets:
    usage[a["absolute_url"]].add(a["source_page"])

local_by_url = {d["url"]: d for d in downloaded if isinstance(d, dict) and d.get("file")}
enriched = []
for url, local in local_by_url.items():
    record = {
        "source_url": url,
        "local_file": local["file"],
        "bytes": local["bytes"],
        "content_type": local["content_type"],
        "sha256": local["sha256"],
        "used_on_pages": sorted(usage[url]),
        "filename_hint": unquote(url.split("/")[-1]),
    }
    path = OUT / local["file"]
    if Image and local["content_type"].startswith("image/"):
        try:
            with Image.open(path) as img:
                record["width"] = img.width
                record["height"] = img.height
                record["mode"] = img.mode
                record["format"] = img.format
        except Exception as exc:
            record["image_probe_error"] = str(exc)
    enriched.append(record)
enriched.sort(key=lambda a: (a["used_on_pages"], a["local_file"]))
(EXTRACTION / "assets_enriched.json").write_text(json.dumps(enriched, ensure_ascii=False, indent=2), encoding="utf-8")

# Convert the SSR HTML body content into a readable exact-text inventory.
lines = ["# Inventário textual extraído — site Nil Lus", "", "Fonte: HTML SSR público, por página. A navegação/rodapé são repetidos por design.", ""]
for page in pages:
    if not page.get("html_file"):
        continue
    parser = PageParser()
    parser.feed((OUT / page["html_file"]).read_text(encoding="utf-8", errors="replace"))
    values = []
    last = None
    for item in parser.text:
        value = item["text"].replace("&nbsp;", " ").strip()
        if not value or value == last:
            continue
        # technical UI labels are preserved only if not a massive script/style artifact.
        if len(value) > 1:
            values.append(value)
            last = value
    slug = page["url"].replace("https://nillus2021.wixsite.com/website", "") or "/"
    lines.extend([f"## {slug}", "", f"URL: {page['url']}", "", "### Texto visível em ordem de DOM", ""])
    lines.extend([f"- {v}" for v in values])
    lines.append("")
(OUT / "conteudo-extraido-por-pagina.md").write_text("\n".join(lines), encoding="utf-8")

print(json.dumps({"images_enriched": len(enriched), "pages_text_exported": sum(1 for p in pages if p.get('html_file'))}, ensure_ascii=False))
