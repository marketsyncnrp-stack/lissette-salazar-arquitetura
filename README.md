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