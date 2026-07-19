from __future__ import annotations

import csv
import hashlib
import json
import re
import shutil
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "handoff-nillus"
PROTOTYPE = ROOT / "landing-nil-lus"
DEST = ROOT / "entrega-nil-lus-antigravity_v2"
ZIP = ROOT / "entrega-nil-lus-antigravity_v2.zip"

if DEST.exists() or ZIP.exists():
    raise SystemExit("Destino v2 já existe; não sobrescrevendo arquivos.")

IGNORE = shutil.ignore_patterns(".DS_Store", "__pycache__", "*.pyc")

for folder in [
    "00_LEIA_PRIMEIRO",
    "01_ASSETS_ORIGINAIS",
    "02_LINKS_E_MIDIAS",
    "03_PAGINAS_E_CONTEUDO_ORIGINAL",
    "04_AUDITORIA_E_REPROCESSAMENTO",
    "05_PROTOTIPO_OPCIONAL_HERMES",
]:
    (DEST / folder).mkdir(parents=True, exist_ok=False)

# Human-facing sources first.
for name in [
    "DOSSIE_HANDOFF_GOOGLE_AI_STUDIO.md",
    "DESIGN_SYSTEM_E_DIRECAO_DE_REDESIGN.md",
    "conteudo-extraido-por-pagina.md",
]:
    shutil.copy2(SOURCE / name, DEST / "00_LEIA_PRIMEIRO" / name)

# Full raw asset library and its origin map.
shutil.copytree(SOURCE / "assets", DEST / "01_ASSETS_ORIGINAIS" / "biblioteca-completa", ignore=IGNORE)
for name in ["assets_enriched.json", "assets.json", "downloaded-assets.json"]:
    shutil.copy2(SOURCE / "extraction" / name, DEST / "01_ASSETS_ORIGINAIS" / name)

# Original page representations and content data.
html_dest = DEST / "03_PAGINAS_E_CONTEUDO_ORIGINAL" / "html-bruto-wix"
shutil.copytree(SOURCE / "extraction", html_dest, ignore=shutil.ignore_patterns(
    ".DS_Store", "assets.json", "assets_enriched.json", "downloaded-assets.json", "links.json", "pages.json", "text-items.json", "crawl.log"
))
for name in ["pages.json", "text-items.json"]:
    shutil.copy2(SOURCE / "extraction" / name, DEST / "03_PAGINAS_E_CONTEUDO_ORIGINAL" / name)

# Original links plus a readable categorized index.
links = json.loads((SOURCE / "extraction" / "links.json").read_text())
shutil.copy2(SOURCE / "extraction" / "links.json", DEST / "02_LINKS_E_MIDIAS" / "links-completos.json")

def category(link: dict) -> str:
    url = (link.get("absolute_url") or link.get("href") or "").lower()
    domain = urlparse(url).netloc.lower()
    if "youtube.com" in domain or "youtu.be" in domain:
        return "YouTube"
    if "spotify.com" in domain or "soundcloud.com" in domain or "bandcamp.com" in domain or "deezer.com" in domain or "music.apple.com" in domain:
        return "Streaming"
    if any(s in domain for s in ["instagram.com", "facebook.com", "twitter.com", "x.com", "linkedin.com", "tiktok.com"]):
        return "Redes sociais"
    if url.startswith("mailto:") or url.startswith("tel:"):
        return "Contato"
    if link.get("kind") == "internal":
        return "Páginas internas Wix"
    if "wix.com" in domain:
        return "Infraestrutura Wix"
    return "Outros links externos"

categorized = []
for link in links:
    item = dict(link)
    item["categoria"] = category(link)
    categorized.append(item)

with (DEST / "02_LINKS_E_MIDIAS" / "links-por-categoria.csv").open("w", newline="", encoding="utf-8") as f:
    columns = ["categoria", "text", "title", "absolute_url", "source_page", "kind"]
    writer = csv.DictWriter(f, fieldnames=columns)
    writer.writeheader()
    for item in categorized:
        writer.writerow({key: item.get(key, "") for key in columns})

by_category = defaultdict(list)
for item in categorized:
    by_category[item["categoria"]].append(item)
lines = [
    "# Links e mídias catalogados",
    "",
    "Este arquivo é uma visão legível do inventário completo. O JSON `links-completos.json` preserva todos os 221 registros e respectivos contextos de origem.",
    "",
]
for label in sorted(by_category):
    unique = []
    seen = set()
    for item in by_category[label]:
        url = item.get("absolute_url", "")
        if url and url not in seen:
            unique.append(item)
            seen.add(url)
    lines += [f"## {label} ({len(unique)} URLs únicas)", ""]
    for item in unique:
        text = (item.get("text") or item.get("title") or "sem rótulo").replace("\n", " ").strip()
        lines.append(f"- [{text}]({item.get('absolute_url', '')})")
    lines.append("")
(DEST / "02_LINKS_E_MIDIAS" / "LINKS_E_MIDIAS.md").write_text("\n".join(lines), encoding="utf-8")

# URLs embedded in the Wix HTML do not necessarily appear as anchor tags in links.json.
# Keep them separately so the receiving agent can identify YouTube/Spotify/etc. references.
media_hosts = ("youtube.com", "youtu.be", "spotify.com", "soundcloud.com", "vimeo.com", "bandcamp.com", "deezer.com", "music.apple.com")
embedded = []
seen_embeds = set()
for html_path in sorted((SOURCE / "extraction").glob("*.html")):
    raw = html_path.read_text(encoding="utf-8", errors="ignore")
    raw = raw.replace("\\u002F", "/").replace("\\/", "/").replace("&amp;", "&")
    for url in re.findall(r"https?://[^\"'<>\\\s]+", raw):
        url = url.rstrip(".,;)]}")
        try:
            host = urlparse(url).netloc.lower()
        except ValueError:
            continue
        if any(media_host in host for media_host in media_hosts):
            key = (html_path.name, url)
            if key not in seen_embeds:
                embedded.append({"source_html": html_path.name, "url": url, "host": host})
                seen_embeds.add(key)
with (DEST / "02_LINKS_E_MIDIAS" / "embeds-e-midias-detectados.csv").open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["source_html", "host", "url"])
    writer.writeheader()
    writer.writerows(embedded)
embed_counts = Counter(item["host"] for item in embedded)
embed_lines = ["# Embeds e mídias detectados no HTML Wix", "", "Este índice complementa `links-completos.json`: captura URLs de plataformas de mídia existentes no HTML, inclusive quando não aparecem como links clicáveis.", ""]
for host, count in sorted(embed_counts.items()):
    embed_lines += [f"## {host} ({count})", ""]
    for item in (x for x in embedded if x["host"] == host):
        embed_lines.append(f"- `{item['source_html']}` — {item['url']}")
    embed_lines.append("")
(DEST / "02_LINKS_E_MIDIAS" / "EMBEDS_E_MIDIAS.md").write_text("\n".join(embed_lines), encoding="utf-8")

# Audit/reprocess materials: useful but not necessary to start in Antigravity.
for name in ["crawl_site.py", "enrich_inventory.py", "build_antigravity_package_v2.py"]:
    shutil.copy2(SOURCE / name, DEST / "04_AUDITORIA_E_REPROCESSAMENTO" / name)
shutil.copy2(SOURCE / "extraction" / "crawl.log", DEST / "04_AUDITORIA_E_REPROCESSAMENTO" / "crawl.log")

# Preserve the prior local prototype separately and explicitly as non-canonical inspiration.
shutil.copytree(PROTOTYPE, DEST / "05_PROTOTIPO_OPCIONAL_HERMES", ignore=IGNORE, dirs_exist_ok=True)

# Human onboarding file, written after counts are known.
asset_files = [p for p in (DEST / "01_ASSETS_ORIGINAIS" / "biblioteca-completa").rglob("*") if p.is_file()]
html_files = list((DEST / "03_PAGINAS_E_CONTEUDO_ORIGINAL" / "html-bruto-wix").glob("*.html"))
category_counts = Counter(item["categoria"] for item in categorized)
readme = f"""# Pacote de transferência — Nil Lus / Antigravity

## O que é
Pacote autocontido da auditoria pública do site legado de Nil Lus.
Fonte original: https://nillus2021.wixsite.com/website

Este material é preparado para upload/cópia no Antigravity ou Google AI Studio. Ele preserva o acervo original, o conteúdo extraído e a documentação de reconstrução. Não contém credenciais.

## Ordem recomendada de uso no Antigravity
1. Leia `00_LEIA_PRIMEIRO/DOSSIE_HANDOFF_GOOGLE_AI_STUDIO.md`.
2. Leia `00_LEIA_PRIMEIRO/DESIGN_SYSTEM_E_DIRECAO_DE_REDESIGN.md`.
3. Use `00_LEIA_PRIMEIRO/conteudo-extraido-por-pagina.md` como fonte textual por página.
4. Consulte `01_ASSETS_ORIGINAIS/assets_enriched.json` para localizar cada asset por URL de origem, dimensões, hash e páginas em que apareceu.
5. Consulte `02_LINKS_E_MIDIAS/LINKS_E_MIDIAS.md` para navegar por links de forma humana; use o JSON para rastreabilidade completa.
6. Só então desenhe a interface. Use o protótipo Hermes apenas como referência opcional, não como fonte editorial.

## Estrutura
- `00_LEIA_PRIMEIRO/` — briefing, design system e texto consolidado.
- `01_ASSETS_ORIGINAIS/` — biblioteca integral baixada + inventários de origem.
- `02_LINKS_E_MIDIAS/` — todos os links em JSON, CSV categorizado e índice Markdown.
- `03_PAGINAS_E_CONTEUDO_ORIGINAL/` — HTML bruto das páginas Wix, páginas mapeadas e nós de texto.
- `04_AUDITORIA_E_REPROCESSAMENTO/` — scripts e log para auditoria/recoleta.
- `05_PROTOTIPO_OPCIONAL_HERMES/` — estudo visual local; não é a implementação canônica solicitada para o Antigravity.

## Inventário deste pacote
- Páginas públicas rastreadas: 12
- Registros de links: {len(links)}
- Arquivos de asset originais copiados: {len(asset_files)}
- HTMLs brutos copiados: {len(html_files)}
- Links por categoria: {dict(sorted(category_counts.items()))}
- URLs de embeds/mídias detectados no HTML: {len(embedded)}

## Regras para uma homepage rápida
- Não incluir todos os iframes de YouTube/Spotify na home.
- Mostrar cards/miniaturas e abrir o player apenas após interação.
- Usar a galeria completa em rota/modal com carregamento progressivo.
- Preservar links externos oficiais como saída leve.
- Não inventar nomes, anos, créditos, licenças ou contatos ausentes; marcar pendências para validação humana.

## Observações técnicas
- Os nomes físicos de alguns arquivos preservam o formato/URL obtido do Wix e podem não refletir o formato real do conteúdo. Consulte `assets_enriched.json` antes de renomear ou converter.
- A pasta é uma cópia; os originais de coleta permanecem intactos em `handoff-nillus/`.
"""
(DEST / "00_LEIA_PRIMEIRO" / "README_IMPORTACAO.md").write_text(readme, encoding="utf-8")

# Machine-readable manifest plus integrity hashes for the transfer package.
files = []
for path in sorted(p for p in DEST.rglob("*") if p.is_file()):
    relative = path.relative_to(DEST).as_posix()
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    files.append({"path": relative, "bytes": path.stat().st_size, "sha256": digest})
manifest = {
    "package": DEST.name,
    "source_site": "https://nillus2021.wixsite.com/website",
    "source_counts": {"pages": 12, "links": len(links), "assets_copied": len(asset_files)},
    "files": files,
}
(DEST / "00_LEIA_PRIMEIRO" / "manifesto-entrega.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

shutil.make_archive(str(ZIP.with_suffix("")), "zip", ROOT, DEST.name)
print(json.dumps({
    "package": str(DEST),
    "zip": str(ZIP),
    "asset_files": len(asset_files),
    "links": len(links),
    "html_files": len(html_files),
    "package_bytes": sum(p.stat().st_size for p in DEST.rglob("*") if p.is_file()),
    "zip_bytes": ZIP.stat().st_size,
}, ensure_ascii=False, indent=2))
