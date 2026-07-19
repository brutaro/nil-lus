# Design system — observado e recomendado para o novo site Nil Lus

## 1. Evidência observada no site legado

Este bloco descreve o que foi efetivamente encontrado no Wix; não é uma recomendação de réplica literal.

| Área | Observação verificável |
|---|---|
| Tecnologia | Wix Thunderbolt; componentes Wix, galerias e player de vídeo. |
| Fundo/conteúdo | Páginas de acervo usam fundo escuro e texto branco. Trechos de HTML têm `color:#FFFFFF`. |
| Tipos encontrados | Tahoma nos textos ricos; Arial/Helvetica como fallback do body; fontes carregadas/declarações: Poppins, Raleway, Marck Script, Helvetica Light. |
| Logo | PNG “Cópia_de_segurança_de_logo nil luz.png”; versões de 228×98 e 456×196 preservadas em `assets/`. |
| Header | Logo à esquerda, seletor de idioma, navegação horizontal longa de 12 itens. |
| Home | Hero predominantemente visual: retrato/fotografia + uma frase de posicionamento. |
| Mídia | Galerias Wix de capas, fotos, certificados e imagens de contexto; muitas sem alt/legenda editorial. |
| Footer | Ícones Facebook, YouTube e Instagram; texto “2021 Freehand Digital Brazil”; contato. |
| Interações | Menu, seletor de idioma, galerias/lightbox e elemento de vídeo. |

Problemas do legado: menu extenso e pouco hierarquizado; conteúdo longo sem ritmo editorial; informação desatualizada; ausência de semântica/alt em acervos; URL de Prêmios inadequada; dependência de Wix; banner publicitário externo; pouca orientação clara para escutar, assistir ou contratar.

## 2. Direção visual recomendada

### Conceito

**“Arquivo vivo de um artista sem fronteiras.”**

A experiência deve unir música brasileira, poesia, memória visual, cinema e trajetória internacional. O resultado precisa ser noturno e cinematográfico, mas caloroso; sofisticado sem parecer corporativo; artístico sem reduzir a navegação ou legibilidade.

### Princípios

1. O artista e sua obra vêm antes da interface.
2. Fotografia autêntica e capas são prova cultural, não decoração de fundo.
3. Informação verificável é apresentada como acervo editorial: data, contexto, local e crédito quando disponível.
4. Acessibilidade não é opcional: contraste, foco, leitura, teclado e redução de movimento.
5. Navegação curta no topo; profundidade em seções e páginas de acervo.

## 3. Tokens visuais propostos

Estes tokens são recomendados para o redesign. Validar contraste e ajustar em implementação real.

```css
:root {
  --color-ink: #111214;          /* fundo principal */
  --color-ink-raised: #1B1D20;   /* cards / superfícies */
  --color-ink-soft: #272A2E;     /* bordas sutis */
  --color-ivory: #F5F0E7;        /* texto/áreas claras */
  --color-mist: #C9C1B6;         /* texto secundário */
  --color-gold: #C99E54;         /* destaque, foco, linhas */
  --color-gold-soft: #E4C98E;    /* hover em área escura */
  --color-wine: #762E38;         /* acento dramático, não texto longo */
  --color-success: #8FB996;
  --color-error: #F08A85;

  --font-display: "Cormorant Garamond", "Iowan Old Style", Georgia, serif;
  --font-body: "DM Sans", "Poppins", Arial, sans-serif;
  --font-script: "Marck Script", cursive; /* uso raro: assinatura/poesia */

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --content-max: 76rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.75rem;
  --shadow-image: 0 24px 70px rgb(0 0 0 / 0.35);
}
```

### Tipografia

| Papel | Família/estilo | Desktop | Mobile | Uso |
|---|---|---:|---:|---|
| Display XL | Cormorant Garamond, semibold | clamp(3.5rem, 8vw, 7.5rem) | 3rem–4rem | Hero e títulos de acervo. |
| H1/H2 | Cormorant Garamond, semibold | 3rem–4.5rem | 2.25rem–3rem | Grandes seções. |
| H3 | DM Sans/Poppins, 600, caixa alta opcional | 1rem–1.25rem | 1rem | Categorias, cards e metadata. |
| Corpo | DM Sans/Poppins, 400/450 | 1.0625rem, 1.65 | 1rem, 1.6 | Biografia e notícias. |
| Legenda | DM Sans/Poppins, 400 | .8125rem | .8125rem | Créditos e datas. |
| Poema | Marck Script apenas em trechos curtos | 1.6rem–2rem | 1.4rem | Nunca para corpo longo. |

Evitar Tahoma/Arial como escolha de marca. Eles servem de evidência do legado, não do novo sistema.

## 4. Layout e componentes

### Grid

- Conteúdo: máximo 1216px, margens laterais fluidas de 20px a 64px.
- Hero: altura entre 82svh e 100svh; garantir que título/CTAs não fiquem sobre área facial crítica.
- Seções: espaçamento vertical 96px–160px em desktop e 64px–96px em mobile.
- Grid de acervo: 12 colunas desktop, 6 tablet, 2 mobile; não forçar imagens verticais em cards horizontais.
- Texto de leitura: largura máxima de 68–72 caracteres.

### Header

- Transparente sobre o hero; muda para `--color-ink` sólido após scroll.
- Logo com altura máxima de 48px no desktop e 36px no mobile.
- Navegação curta: Sobre, Música, Acervo, Notícias, Contato. Subitens ficam no mega-menu ou nas âncoras.
- Botão de destaque: “Booking e imprensa”.
- PT/EN como controle explícito; não traduzir automaticamente textos de acervo.

### Hero

- Foto autêntica principal; overlay gradiente sólido discreto, nunca opacidade que destrua a imagem.
- Eyebrow: “Nil Lus”.
- Título/manifesto: usar o posicionamento preservado.
- CTAs: “Ouça Nil Lus” (destino a confirmar) e “Booking e imprensa” (âncora contato).
- Indicador de scroll discreto, com alternativa de reduzir movimento.

### Cards e galerias

- Capas de disco: quadradas; título, ano, links de escuta somente quando confirmados.
- Prêmios: timeline horizontal no desktop, vertical no mobile; imagem do diploma/prêmio + ano + descrição.
- Fotos: masonry moderado, lightbox com setas, Escape para fechar, contador, crédito e alt.
- Notícias: cards editoriais com categoria, fonte, data publicada (se confirmada), resumo e link para a íntegra.
- Não transformar texto biográfico longo em carrossel.

### Contato

- Dois caminhos nítidos: “Booking internacional” e “Imprensa/projetos”.
- Formulário com nome, e-mail, assunto, mensagem, consentimento e resposta de sucesso/erro.
- Telefones e emails como links `tel:` e `mailto:`; proteger spam no frontend se a estratégia permitir.

## 5. Motion e comportamento

| Interação | Diretriz |
|---|---|
| Entrada de seção | Fade + deslocamento vertical máximo de 12px; 220–350ms; respeitar `prefers-reduced-motion`. |
| Hero | Parallax extremamente leve ou nenhum em mobile. |
| Hover de mídia | Zoom máximo 1.03, overlay com título/crédito; sem flashing. |
| Lightbox | Modal com foco preso, Escape, labels acessíveis e preload somente da próxima imagem. |
| Header | Transição de cor/sombra ao rolar; sem animação brusca. |
| Carregamento | Skeleton discreto apenas em galerias; usar dimensões definidas para evitar CLS. |

## 6. Requisitos técnicos e de acessibilidade

- Contraste mínimo AA: texto marfim em fundo `--color-ink`; não usar dourado como texto pequeno sobre preto sem teste.
- Todo asset visual precisa de alt contextual, ou `alt=""` se puramente decorativo.
- `button` e `a` com foco visível em dourado e área mínima de toque 44×44px.
- Sem autoplay sonoro. Vídeo deve ter controles, legenda/transcrição quando houver fala e thumbnail otimizada.
- Imagens: `width` e `height`, `srcset`, lazy loading fora do viewport; preservar o master local.
- SEO: título por página, meta description, canonical, Open Graph e JSON-LD somente com dados validados.
- Internacionalização: conteúdo por locale em arquivos separados; rotas sugeridas `/pt` e `/en`.
- Performance: sem runtime Wix; imagens otimizadas; fontes auto-hospedadas ou carregadas de forma não bloqueante; meta de LCP < 2,5 s em 4G razoável.

## 7. Arquitetura de informação recomendada

1. Hero
2. A obra em poucas linhas / biografia curta
3. Destaques musicais (conteúdo/destinos pendentes de confirmação)
4. Discografia
5. Vídeos selecionados
6. Trajetória e marcos internacionais
7. Prêmios
8. Literatura
9. Teatro e cinema
10. Galeria
11. Canhão Handball (bloco editorial especial)
12. Mídias/notícias
13. Booking e contato
14. Footer com redes e créditos atualizados

Páginas secundárias sugeridas: `/biografia`, `/discografia`, `/midias`, `/galeria`, `/contato`. A página de Prêmios deve ter slug limpo: `/premios`.

## 8. Pendências que não podem ser inferidas

- Logo master em vetor ou PNG de alta resolução/transparente.
- Ordem, nome, ano e plataforma de cada capa da Discografia.
- Destinos oficiais de streaming, vídeos e press kit.
- Versão atual da biografia, números e prêmios.
- Legendas, autoria, direitos e crédito das fotos.
- Dados atuais de booking, assessoria e formulário.
- Fotografia oficial de hero e seu crédito.

Nenhum desses itens deve ser inventado pelo Google AI Studio.
