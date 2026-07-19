# Handoff completo — Nil Lus

## Objetivo

Reconstruir como uma landing page contemporânea, rápida e responsiva o site público legado de Nil Lus, preservando integralmente o acervo textual, visual e de credibilidade já publicado. Este diretório é a fonte operacional para o Google AI Studio ou uma equipe de design/desenvolvimento.

- Site auditado: https://nillus2021.wixsite.com/website
- Plataforma observada: Wix / Wix Thunderbolt (site legado; não é recomendação de stack)
- Idiomas observados: português como padrão e seletor para inglês
- Escopo rastreado: 12 páginas públicas em português; home em inglês também identificada
- Resultado da varredura: 221 registros de link, 328 referências de asset, 179 imagens locais com metadados e dimensões e 24 recursos técnicos/HTML adicionais preservados

## Estrutura entregue

| Arquivo/pasta | Conteúdo e uso |
|---|---|
| `conteudo-extraido-por-pagina.md` | Texto visível completo extraído em ordem de DOM, separado por URL. É a fonte de verdade textual; não resumir nem reescrever sem validação editorial. |
| `extraction/pages.json` | As 12 páginas auditadas, títulos, HTML local e contagens. |
| `extraction/links.json` | Os 221 links com texto, URL de origem, destino absoluto e classificação. |
| `extraction/assets.json` | Todas as 328 referências descobertas, inclusive técnicas. |
| `extraction/downloaded-assets.json` | Registro de download, MIME, bytes e SHA-256. |
| `extraction/assets_enriched.json` | Inventário operacional dos 203 recursos locais; 179 imagens têm largura, altura, formato, hash, URL original e páginas de uso. |
| `extraction/page-*.html` | HTML SSR bruto preservado, por página, para auditoria estrutural. |
| `assets/` | Arquivos locais baixados do Wix. Não renomear sem atualizar o inventário. |
| `crawl_site.py` e `enrich_inventory.py` | Scripts reproduzíveis de extração e enriquecimento. |
| `DESIGN_SYSTEM_E_DIRECAO_DE_REDESIGN.md` | Separação entre design observado e design recomendado. |

## Mapa do site atual

| Rota atual | Rótulo de navegação PT | Papel editorial / conteúdo principal |
|---|---|---|
| `/website` | Início | Hero: “Cantor, músico, compositor e poeta. Nil Lus. Um artista completo”. |
| `/website/discografia` | Discografia | Galeria de 10 capas de discos; atualmente sem títulos textuais acessíveis. |
| `/website/músicas` | Músicas | Página publicada, mas sem copy textual acessível fora da navegação; preservar como área de faixas/players depois de confirmar destinos. |
| `/website/audiovisual` | Audiovisual | Página publicada com componente de vídeo Wix; sem descrição textual acessível. |
| `/website/notícias` | Mídias | Acervo extenso de matérias, incluindo Alma Feminina, trajetória internacional, Como Caído del Cielo e perfil esportivo/musical. |
| `/website/biografia` | Biografia | Biografia artística, formação, handball, obra, turnês e foto de Martin Bülow. |
| `/website/galeria` | Galeria | Galeria de 26 fotografias sem legendas acessíveis. |
| `/website/literatura` | Literatura | Livros, Poetosfera e homenagem “O Baú de Lygia”. |
| `/website/nilluslcantorlcompositorlpoetalmineiro` | Prêmios | Linha do tempo de premiações de 2007 a 2021. A URL precisa ser corrigida na reconstrução. |
| `/website/teatro-cinema` | Teatro&Cinema | Trilhas sonoras para teatro e cinema. |
| `/website/canhão-handball` | Canhão Handball | História esportiva, poema/canção “Atleta Para Sempre” e galeria de 15 fotos tituladas. |
| `/website/contato` | Contato | Contatos de Diaspora Consultancy e Odaras Productions, além de formulário. |

### Navegação observada

`Início · Discografia · Músicas · Audiovisual · Mídias · Biografia · Galeria · Literatura · Prêmios · Teatro&Cinema · Canhão Handball · Contato`

No inglês observado: `Start · Discography · Songs · Videos · Media · Biography · Gallery · Literature · Awards · Theater&Cinema · Handball cannon · Contact`.

## Conteúdo editorial e fatos a preservar

### Posicionamento/hero

- PT: “Cantor, músico, compositor e poeta. Nil Lus. Um artista completo”.
- EN: “Singer, musician, composer and poet. Nil Lus. A complete artist”.

### Biografia — fatos publicados

- Nascido em Belo Horizonte/MG; radicado na Europa desde os anos 1990.
- Músico, cantor, compositor, escritor e poeta.
- Formação citada: Educação Física pela UFMG; Administração de Empresas e Economia pela FUMEC.
- Ex-atleta da Seleção Brasileira de Handball; campeão Nacional e Sul-Americano; apelido “Canhão”.
- Primeiro livro de poemas e primeira canção (“Pássaro De Fogo”) aos 10 anos.
- Distinção honrosa, aos 15 anos, no 1º Concurso Nacional Fritz Teixeira Salles de Poesia, tema “Poemia”.
- O texto da página registra mais de 1.000 canções, 17 discos e previsão do 18º álbum, “Amores Líquidos”, no fim de 2021.
- Concertos por América, Europa e Ásia; projeto lusófono “Sons da Fala” em Portugal com Sérgio Godinho, Vitorino e Tito Paris, entre outros.
- Crédito de foto: Martin Bülow.

Observação editorial importante: números e afirmações variam entre páginas (por exemplo, 1.000 / 1.200 canções; 15 / 17 discos; 45 / 47 países). Antes da publicação, centralizar uma biografia oficial atualizada e usar apenas uma versão validada.

### Literatura

- “A Viagem para o Outro Lado” — romance com trilha sonora; lançado em 2010; terceira edição no Brasil.
- “Dadivante” — aforismos; lançado em 2012; calendário de reflexões com fotografias de Sabine Geilke.
- “Poetosfera” — coleção de poemas sobre amor, vida e outras inspirações.
- Tetralogia/thriller esotérico anunciada para 2021, acompanhada de trilha instrumental.
- Texto/homenagem a Lygia Fagundes Telles: “O Baú de Lygia”, letra e música Nil Lus.

### Prêmios — linha do tempo publicada

- 2021 — BEST MUSIC VIDEO AWARD / LAHFF, Inglaterra, por “A Coroa Sem Rei”.
- 2020 — nomeado ao Best of Brazil European Awards, artistas de World Music na Europa.
- 2019 — prêmio no London Art House Film Festival, no espaço da BBC de Londres.
- 2018 — indicação ao Grammy Latino; “Todos os Tons”; produção de Victor Flowers e Celso Rangel.
- 2017 — Prêmio de poesia José Maria Heredia, Prefeitura de Toluca/México.
- 2016 — participação nos 50 anos do Montreux Jazz Festival, a convite de Quincy Jones.
- 2010 — láurea Le Mérite Et Devouement Français, Senado Francês.
- 2008 — nomeação de Cônsul dos Poetas do Mundo; fundação do Instituto Nil Lus, com alegação de apadrinhamento de 350 crianças.
- 2007 — Médaille d’Argent, Academia Francesa de Ciências, Letras e Cultura, Paris.

### Teatro e cinema

Teatro: Tambores na Noite; Esperando Godot; Bella Ciao; O Mercado de Escravos; O Último Dia de Florbela Espanca; Advenha; Lux; Ninguém Reparou na Primavera; King — I Have a Dream.

Cinema: Amal Hamburg; O Caminho de Volta; The Quest for Love.

### Canhão Handball

- Seleção Brasileira de Handball entre 1980 e 1985; campeão Nacional e Sul-Americano, conforme texto publicado.
- Texto integral da canção/poema “Atleta Para Sempre” está em `conteudo-extraido-por-pagina.md`.
- Legendas de 15 imagens: Viagem em equipe; Treinamento no Centro Olímpico — EUA; Seleção Mineira Universitária; RPM Hand; Nil Lus “Canhão” no pré-olímpico — EUA; Handball Colégio Estadual; Hand Ginástico; Hand Ginástico III; Afonso e Ataíde; Grupo de ex-atletas do Ginástico Clube de BH; Campeonato Pré-Olímpico — EUA; Canadá X Brasil — Pan-americano de Handball; Hand Estadual Central; Hand Ginástico II; Ginástica Olímpica — Colégio Estadual Ataíde.

### Mídias/notícias

O texto integral de todas as matérias foi preservado no inventário textual. Conteúdos principais:

1. “Nil Lus abre a turnê de seu show Alma Feminina 05/10” — lançamento do CD e show no Teatro Bradesco, Belo Horizonte.
2. “Nil Lus representa a musicalidade brasileira de excelência no mundo!” — carreira, prêmios, discos, Montreux, indicação ao Grammy e lançamentos.
3. “Das quadras aos palcos do mundo” — perfil biográfico/esportivo, publicado por superesportes.com.br em 03/09/2018.
4. Vídeo/entrevista “River FlashTv - entrevista Nil Lus no Montreux Jazz Festival 2016”.

## Links, CTAs e contatos

### CTAs funcionais observados

| Elemento | Destino atual | Decisão para o novo site |
|---|---|---|
| Logo | Home | manter; usar como retorno à home. |
| Menu | 12 rotas internas | consolidar em navegação desktop e drawer mobile. |
| Facebook | https://www.facebook.com/nil.lus.5 | manter apenas após validação de atividade/posse. |
| YouTube | https://www.youtube.com/channel/UCUqyv0K5bz3rEK5EPdZmsHg | CTA primário de vídeo. |
| Instagram | https://www.instagram.com/nillusoficial/ | CTA primário social. |
| MySpace | http://www.myspace.com/odarasprod | arquivar ou remover do menu público; preservar somente como referência histórica. |
| Wix “Crie o seu hoje” | anúncio de plataforma | remover integralmente. |
| Contato | rota interna | trocar por CTA “Booking e imprensa” e formulário real. |

### Emails publicados

- info@odarasprod.com
- booking@odarasprod.com
- carlos@odarasprod.com
- brasil@odarasprod.com

### Contatos publicados

- Diaspora Consultancy Limited — Suite 41, Cresset House, Retreat Place, London, E9 6RW, Inglaterra.
- John Fayika: +44 7436 863157.
- Daniel Lutaaya: +44 7443 355046.
- Odaras Productions Sàrl — Carlos Rodrigues, Case Postale 254, 1820 Montreux, Switzerland; Nº CH-550.1.104.734-8.
- Tel/Fax: +41 21 963 30 66/67; celulares +55 21 9658 7474 e +41 79411 69 54.

## Assets

- 179 imagens baixadas localmente e analisadas, em `assets/`.
- Volume de imagens: aproximadamente 6,99 MB.
- 203 recursos locais no inventário enriquecido; os itens não-imagem incluem respostas HTML/técnicas preservadas para auditoria.
- `assets_enriched.json` contém URL Wix original, arquivo local, bytes, SHA-256, formato, dimensões e páginas de uso.
- Galeria: 26 imagens sem legenda acessível. Não inventar legendas; usar filename/URL como chave editorial até curadoria manual.
- Discografia: 10 capas sem títulos acessíveis. Não associar título de álbum à capa por inferência visual; confirmar com o artista/equipe.
- Variações de resolução do mesmo recurso existem no diretório; selecionar a maior versão visualmente equivalente para a produção final.

## Riscos e decisões obrigatórias antes de publicar

1. Atualizar todos os dados datados de 2021, especialmente discografia, prêmios, calendário, contatos e biografia.
2. Validar direitos, créditos, recortes e qualidade de cada foto antes de reutilizar.
3. Validar números biográficos inconsistentes antes de colocá-los em cards/SEO.
4. Não copiar o banner publicitário Wix nem copyright “2021 Freehand Digital Brazil”.
5. Confirmar os destinos de Músicas e Audiovisual: o HTML evidencia componentes, mas não oferece título/descrição acessível suficiente para uma migração sem curadoria.
6. Converter AVIF/JPEG/PNG para derivadas WebP/AVIF responsivas, mantendo os originais como master.

## Prompt pronto para Google AI Studio

```text
Crie uma landing page premium, responsiva e acessível para o artista brasileiro Nil Lus — cantor, músico, compositor, escritor e poeta de Belo Horizonte, com trajetória internacional entre Brasil e Europa. Use como fontes de conteúdo e mídia os arquivos do diretório handoff-nillus: DOSSIE_HANDOFF_GOOGLE_AI_STUDIO.md, conteudo-extraido-por-pagina.md, extraction/assets_enriched.json e assets/.

Não reproduza Wix, não use banner Wix e não invente fatos, links, títulos de álbuns, datas, prêmios ou créditos. Preserve o conteúdo como acervo; quando houver inconsistência factual ou campo sem legenda, use a estrutura proposta sem apresentar dado não confirmado.

Arquitetura: home única longa com âncoras: Início, Sobre, Discografia, Música e vídeos, Prêmios, Literatura, Teatro e cinema, Galeria, Canhão Handball, Mídias e Contato. Acrescente uma rota ou modal para a biografia completa e uma listagem/arquivo de notícias. Inclua alternância PT/EN preparada para i18n, mas não traduza conteúdo longo automaticamente.

Hero de alto impacto: fotografia principal do acervo, overlay escuro legível, logotipo oficial, frase “Cantor, músico, compositor e poeta. Nil Lus. Um artista completo” e CTAs “Ouça Nil Lus” e “Booking e imprensa”. Abaixo, use prova social objetiva (Montreux, Grammy Latino/indicação, prêmios internacionais) somente após o texto final ser validado.

Direção visual: contemporânea, cinematográfica, autoral, sofisticada; fundo grafite/quase preto, marfim para texto, dourado envelhecido como destaque e vermelho-vinho discreto como acento. Tipografia: display serif editorial para títulos e sans geométrica legível para UI/corpo. Não usar visual genérico de festival nem gradientes excessivos. Fotos em grid editorial assimétrico com recorte consistente, lightbox acessível e créditos quando existentes.

Implementar HTML/CSS/JS ou React limpo, sem dependência de Wix. Priorize performance: imagens responsivas, lazy loading, srcset, WebP/AVIF, sem autoplay com som, carregamento rápido e SEO completo. Inclua alt texts descritivos, contraste AA, foco visível, navegação por teclado, menu mobile, redução de movimento e formulário real com estados de erro/sucesso. Configure Open Graph, JSON-LD MusicGroup/Person quando os fatos forem validados e URLs canônicas.

Entregue código completo, componentes reutilizáveis, tokens de design centralizados, conteúdo em objeto/JSON separado, e uma lista de campos editoriais pendentes de confirmação.
```
