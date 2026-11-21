# Lissette Salazar — Arquitetura & Interiores

Landing page editorial, mobile-first, desenvolvida sob medida para a arquiteta Lissette Salazar.

## Proposta de identidade

- **Conceito:** Arquitetura com significado, do conceito aos detalhes.
- **Tom:** Autoral, acolhedor, preciso, arquitetônico.
- **Paleta:** off-white `#f7f5f0`, branco `#fffefa`, madeira `#947965`, vinho-terra `#7e403e` e vinho profundo `#693536`, texto carvão `#272521`.
- **Fontes:** Zodiak + Ranade (Fontshare) com fontes de fallback; CSS custom, sem frameworks visuais nem templates de SaaS.
- **Referência de composição:** [Atelier – Real Estate Landing Page por Xoraa Studio / Luthfi Setiaji](https://dribbble.com/shots/27745721-Atelier-Real-Estate-Landing-Page). O layout deste repositório é uma implementação autoral e **não** uma cópia literal do design de referência.

## Conteúdo entregue

- Hero fotográfico editorial, navegação responsiva e CTA.
- Manifesto e linguagem profissional.
- Grade assimétrica com filtros de referências visuais e modal de detalhes.
- Seção Sobre com duas fotos fornecidas pela cliente.
- Galeria horizontal navegável por botão, toque e teclado.
- Processo criativo em etapas e seção de contato.
- Formulário que prepara o briefing e abre WhatsApp / e-mail após configuração.
- Responsividade mobile, atributos acessíveis e SEO básico.

## Como visualizar

O site é estático, **sem necessidade de npm ou build**.

1. Abra `index.html` em um navegador com acesso à internet.
2. Alternativamente, na pasta do projeto: `python -m http.server 8000` e acesse `http://localhost:8000`.

As imagens demonstrativas são carregadas do domínio `images.unsplash.com`, portanto exigem internet. Os retratos da Lissette estão em `assets/` e ficam disponíveis offline.

## Publicação em novo repositório GitHub

O repositório oficial do projeto é `marketsyncnrp-stack/lissette-salazar-arquitetura`. Para clonar e executar localmente:

```sh
git clone https://github.com/marketsyncnrp-stack/lissette-salazar-arquitetura.git
cd lissette-salazar-arquitetura
python -m http.server 8000
```

É possível hospedar em Vercel, Netlify ou GitHub Pages. Para GitHub Pages, configurar a publicação do branch main / raiz. O código-fonte é mantido diretamente no branch `main` deste repositório.

## Antes de entrar no ar (necessário)

1. **Substituir todas as fotos de referência** (`content.js`) por fotografias de projetos **reais e autorizados**. Não apresentar imagens ilustrativas como obras de Lissette.
2. Confirmar formação, registro profissional, experiência e eventualmente especialidades com a arquiteta antes de publicar informações biográficas definitivas. O texto atual só usa os fatos fornecidos pelo cliente.
3. Definir o canal profissional em `content.js`: `contactEmail` ou `contactWhatsapp`. Sem um deles, o botão apenas copia o briefing.
4. Confirmar o endereço/cidade de atuação. Aqui utilizamos Vila Velha/ES como referência de localização da instituição e do contexto do projeto, não como endereço profissional verificado.
5. Configurar domínio, redes sociais, política de privacidade, LGPD e formulário com consentimento se houver tratamento de dados.
6. Fazer revisão de acessibilidade, compatibilidade, teste de URLs remotas e otimização final de imagens para produção.

### Sobre as imagens ilustrativas

Fotos de interiores e arquitetura no site usam a **Unsplash License** (https://unsplash.com/license), que permite uso comercial em geral. Os links individuais e autores estão registrados nos dados de cada projeto em `content.js`. A página identifica explicitamente essas fotos como demonstração. A resolução servida pela CDN é variável e otimizada para desempenho, não necessariamente 4K nativo; para o portfólio definitivo, utilizar arquivos originais de alta resolução fornecidos pela profissional.

### Imagens da arquiteta

Os arquivos `assets/lissette-retrato-pedra.webp` e `assets/lissette-retrato-porta.webp` foram recortados das capturas de tela fornecidas pelo cliente. Substituir por imagens originais, preservando a autorização de uso e a qualidade adequada para web.

## Fotografia de referência — atualização de direção artística
A seleção visual se inspira em aspectos de arquitetura afetiva e interiores artesanais observados em [Jhenny Keller / Jhenny à Obra](https://www.instagram.com/jhennykeller/). Não existe parceria, autoria ou endosso da criadora. Nenhuma imagem da conta dela foi copiada para este site.

A direção editorial de Lissette permanece independente: base off-white e vinho-terra, serifas elegantes e fotos de interiores com livros, plantas, cor, azulejos, marcenaria, tecidos, iluminação quente e móveis com história.

As imagens da capa, portfólio, galeria e destaques são referências **ilustrativas** de fotógrafos no Unsplash, sob [licença Unsplash](https://unsplash.com/license). Não são trabalhos executados pela Lissette. Substituir por fotografias autorizadas dos projetos reais antes da apresentação do portfólio definitivo.

| Uso | Fotógrafo | Fonte |
|---|---|---|
| hero1 | Clay Banks | https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-flat-screen-tv-9FFtnyiV4Dg |
| hero2 | Clay Banks | https://unsplash.com/photos/cozy-living-room-with-vintage-furniture-and-plants-BOEc--YhUXc |
| hero3 | K F | https://unsplash.com/photos/cozy-living-room-with-plants-and-vintage-furniture-f2FIEtEGT04 |
| room | Clay Banks | https://unsplash.com/photos/cozy-living-room-with-plush-sofa-and-wooden-chest-E0pZm6b2z7A |
| kitchen | Clay Banks | https://unsplash.com/photos/bright-kitchen-with-light-green-cabinets-and-wooden-table-WRy3gg0qAW4 |
| details | Clay Banks | https://unsplash.com/photos/vintage-wooden-kitchen-cabinets-with-tiled-backsplash--arHnjrOy_0 |
| fabric | Virginia Marinova | https://unsplash.com/photos/cozy-seating-area-with-vintage-chairs-and-patterned-sofa-Ade1qXkSQDA |
| retro | Kibeom Jin | https://unsplash.com/photos/cozy-room-with-vintage-decor-and-plants-C_wFwGMhqEw |
| soft | Luis J. Corniel | https://unsplash.com/photos/a-cozy-rustic-living-room-with-eclectic-decor-gC7g0V-Ugyc |
| garden | Inga Gaile | https://unsplash.com/photos/a-cozy-interior-with-vintage-furniture-and-greenery-Y2_yMjiFEpk |
| lounge | Clay Banks | https://unsplash.com/photos/cozy-living-room-with-sofas-and-television-YruTk_dHKzk |
