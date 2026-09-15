# Isla Landing Page - v2

Crie uma Hero Section exatamente como descrito abaixo:

Estrutura Geral

Crie uma hero section fullscreen com fundo em vídeo MP4 (/background.mp4) com autoplay, muted, loop e playsinline. Sobre o vídeo, aplique um overlay escuro semi-transparente (rgba(0,0,0,0.55)) para garantir legibilidade. Todo o conteúdo fica centralizado verticalmente e horizontalmente na tela.

Conteúdo — ordem de cima para baixo

1. Badge (pill superior)

Fundo: #00BFFF (ciano vibrante)

Texto: • Your LinkedIn Agent — branco, bold, fonte pequena (~13px)

Border-radius: totalmente arredondado (pill)

Padding: 6px 18px

Centralizado horizontalmente

2. Headline principal

Fonte grande (~72px desktop, ~40px mobile), peso light/thin

Cor: branco

Texto linha 1: Your GTM employee

Texto linha 2: that + never takes a day off. (essa parte em #00BFFF, itálico)

Centralizado

3. Subtítulo

Cor: cinza claro (#aaa)

Fonte: ~18px, peso normal

Texto: Isla monitors LinkedIn 24/7, spots the right opportunities for your business, and sends you the exact signal — right where you work.

Largura máxima: 560px, centralizado

4. Botões — lado a lado, centralizados

Botão primário: fundo #00BFFF, texto branco bold — Start building my visibility →

Botão secundário: fundo transparente, borda branca, texto branco — See how it works

Border-radius: 8px, padding: 14px 28px

Gap entre botões: 16px

5. Checkmarks de benefícios

Ícone ✓ em #00BFFF + texto branco

3 itens lado a lado: 1 month free trial · Dedicated operator for your team · Setup in 5 minutes

Fonte pequena (~13px), gap entre itens: 32px

6. Widget "Isla Agent" (iframe/HTML embed)

Renderize o componente HTML externo importado de IslaAgentWidget (arquivo HTML que será anexado separadamente)

Envolva em um container com: fundo #111 (dark), border-radius 12px, sombra suave, largura máxima 660px, centralizado

Simule aparência de janela macOS: 3 círculos coloridos (vermelho, amarelo, verde) no canto superior esquerdo + título Isla Agent centralizado em cinza claro

Dentro do widget: sidebar esquerda com itens de canal (# isla-signals destacado em azul, # warm-leads, # analytics, # calendar, # content) + área principal à direita com header # isla-signals + subtítulo Isla delivers signals here

7. Rodapé da seção

Texto: TRUSTED BY FOUNDERS FROM — fonte pequena, cinza, uppercase, tracking largo

Logos: Y Combinator, A16Z, Latitud, MIT, Link Ventures (repetidos)

No canto direito: ⭐⭐⭐⭐⭐ + frase em itálico "Finally, a tool that tells me what to do."

Estilo e Técnica

Framework: React + Tailwind CSS

Vídeo de fundo: tag <video> absoluta, object-fit: cover, width/height 100%, z-index -1

Overlay: div absoluta com bg-black/55 sobre o vídeo

Animações: entrada suave com opacity + translateY em cascata (badge → headline → subtítulo → botões → widget), usando animation-delay crescente

Fontes sugeridas: Google Fonts — Syne ou DM Sans para headline; Inter apenas para textos pequenos

Responsivo: stack vertical em mobile, ajuste de tamanhos de fonte

Observações importantes

O arquivo de vídeo será fornecido como /background.mp4 — use essa referência no src do <video>

O widget "Isla Agent" será um componente React separado (IslaAgentWidget.jsx) que você vai importar — deixe o import pronto mas o componente pode ser um placeholder até o arquivo ser anexado

Não use imagens placeholder — o widget deve ser construído em HTML/CSS real como descrito acima

-inseri um anexo de uma imagem de como a tela deve ser, use como referencia e seja fiel

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://isla-lp-v2.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/84cfec85-7e80-4b85-af7c-d1539eea769f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
