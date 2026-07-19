# Pacote de transferência — Nil Lus / Antigravity

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
- Registros de links: 221
- Arquivos de asset originais copiados: 203
- HTMLs brutos copiados: 12
- Links por categoria: {'Contato': 4, 'Outros links externos': 1, 'Páginas internas Wix': 168, 'Redes sociais': 36, 'YouTube': 12}
- URLs de embeds/mídias detectados no HTML: 14

## Regras para uma homepage rápida
- Não incluir todos os iframes de YouTube/Spotify na home.
- Mostrar cards/miniaturas e abrir o player apenas após interação.
- Usar a galeria completa em rota/modal com carregamento progressivo.
- Preservar links externos oficiais como saída leve.
- Não inventar nomes, anos, créditos, licenças ou contatos ausentes; marcar pendências para validação humana.

## Observações técnicas
- Os nomes físicos de alguns arquivos preservam o formato/URL obtido do Wix e podem não refletir o formato real do conteúdo. Consulte `assets_enriched.json` antes de renomear ou converter.
- A pasta é uma cópia; os originais de coleta permanecem intactos em `handoff-nillus/`.
