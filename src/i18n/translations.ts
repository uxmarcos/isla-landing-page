export type TranslationKey = string;

export type FaqTopic = "General" | "Product" | "Security & Billing";

const en = {
  nav: {
    howItWorks: "How it works",
    ideaDeck: "Idea Deck",
    aiInterview: "AI Interview",
    testimonials: "Testimonials",
    pricing: "Pricing",
    blog: "Blog",
    getStarted: "Get Started",
    letsGo: "Let's go",
  },
  notFound: {
    title: "404",
    heading: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
  },
  hero: {
    headlinePre: "Turn your Linkedin's network into",
    headlineHighlight: "warm pipeline",
    subheadline:
      "Isla identifies buyers in your network, adds ICP prospects, warms relationships, and signals when to engage. All elements work together to create a warm pipeline.",
    cta: "Get Started",
    ctaSecondary: "Let's go",
  },
  trustedBy: {
    label: "Trusted by founders from",
    quote: "“Finally, a tool that tells me what to do.”",
  },
  networkBeam: {
    headlinePre: "Your next client is already",
    headlineHighlight: "in your network.",
    sourceLabel: "Source",
    scoreLabel: "Score",
    sources: [
      { title: "Your posts", desc: "People engaging with your content" },
      { title: "Competitor", desc: "People engaging with competitors' posts" },
      { title: "Your niche", desc: "People within your area of expertise" },
    ],
    paragraph:
      "Isla captures signals from three sources, filters them through its ICP, and returns profiles ready to start the conversation. Content that is bait, not marketing.",
  },
  howItWorks: {
    heading: "How it works",
    steps: [
      {
        title: "Reveal the pipeline already inside your network",
        body: "Isla scores every LinkedIn connection your team has against your ICP — turning scattered profiles into a real pipeline.",
      },
      {
        title: "Create content designed for your ICP",
        body: "Your dedicated Isla professional reviews the ideas you liked and turns them into a ready-to-post draft for your approval.",
      },
      {
        title: "Publish and measure ICP impact",
        body: "See exactly which buyers saw and engaged with your content. Content becomes a targeting instrument, not a vanity metric.",
      },
      {
        title: "Expand your ICP network every day. Grow your account",
        body: "Every day Isla brings new ICP-matching prospects into your network — so you build distribution made of future customers, not followers.",
      },
      {
        title: "Warm the people already inside it",
        body: "Comments, repeated exposure and the right intros build familiarity first. Isla only recommends outreach once the signals are there.",
      },
      {
        title: "Know when it is time to talk",
        body: "The moment a lead turns from aware to interested, you get an alert. You approve, we send.",
      },
    ],
  },
  contentSwipe: {
    headlineLine1: "Give ideas to the post,",
    headlineLine2: "without a blank page.",
    viewOnGraph: "View idea on graph",
    trending: "🔥 Trending",
    idea: "Idea",
    features: [
      {
        title: "Weekly idea deck",
        desc: "Your previous posts, competitors, references and market signals become a weekly queue of ideas.",
      },
      {
        title: "You choose",
        desc: "Approve, skip or save ideas. Isla continuously learns your preferences.",
      },
      {
        title: "We write it",
        desc: "Our team turns each idea you pick into a finished, ready-to-publish post.",
      },
    ],
    ideas: [
      {
        pillar: "Marketing Leadership",
        badge: "idea" as const,
        title:
          "Stop measuring your marketing team by 'leads'. Start measuring pipeline they can defend in a room full of skeptics.",
        angle: "Reframe marketing accountability from vanity metrics to revenue conversations.",
        tags: ["#b2b", "#revops", "#marketing"],
      },
      {
        pillar: "AI & GTM",
        badge: "trending" as const,
        title:
          "Compute is the new headcount. The teams winning right now aren't hiring faster — they're buying inference smarter.",
        angle: "Tie the NVIDIA capacity expansion to how B2B teams should budget for AI.",
        tags: ["#ai", "#gtm", "#budget"],
      },
      {
        pillar: "Hiring",
        badge: "idea" as const,
        title:
          "The best salespeople I've hired weren't the loudest in the room. They asked me the sharpest questions.",
        angle: "Personal hiring story turned into a counterintuitive lesson on sales talent.",
        tags: ["#hiring", "#sales", "#leadership"],
      },
      {
        pillar: "Positioning",
        badge: "trending" as const,
        title:
          "Enterprise AI just moved from 'experiment' to 'procurement'. Most GTM teams still sell to the experiment.",
        angle: "Turn the enterprise AI shift into a positioning lesson for B2B sellers.",
        tags: ["#positioning", "#enterprise", "#b2b"],
      },
      {
        pillar: "Product",
        badge: "idea" as const,
        title:
          "I killed 40% of our roadmap last quarter. Revenue went up, morale went up. Most 'must-haves' were loud-haves.",
        angle: "Founder POV on ruthless prioritization, anchored to a real number.",
        tags: ["#product", "#founder", "#focus"],
      },
    ],
  },
  aiInterview: {
    heading: "Refine the idea in just 4 minutes with the",
    headingHighlight: "Isla interviewer.",
    subheadline:
      "Liked an idea? Do a quick interview with the AI about it. In four minutes, you turn that insight into your first draft post, ready to adjust with the agent or send for human review by the Isla team.",
    cta: "Get Started",
    ctaSecondary: "Let's go",
    liveCall: "Live call with Isla",
    refiningNow: "Refining now",
    pillarLabel: "Pillar",
    pillarValue: "Marketing Leadership",
    angleLabel: "Angle",
    angleValue:
      "Reframe marketing accountability from vanity metrics to revenue conversations.",
    callProgress: "Call progress",
    qOf: (turn: number, total: number, left: number) => `Q${turn}/${total} · ${left} left`,
    islaSpeaking: "Isla speaking",
    listening: "Listening",
    you: "You",
    transcript: "Transcript",
    typeInstead: "Type instead",
    endCall: "End call",
    refiningTitle:
      "Stop measuring your marketing team by 'leads'. Start measuring them by pipeline they can defend in a room full of skeptics.",
    turns: [
      {
        q: "Let's start with “Stop measuring your marketing team by leads”. What actually happened that made you realize this?",
        a: "I was building the pipeline dashboard for our head of sales, and the number he actually cared about wasn't on it — he just wanted to know which deals were slipping this week.",
      },
      {
        q: "Interesting. Who exactly do you disagree with — and what's the cost of ignoring it?",
        a: "Most demand gen playbooks. They optimize for volume, so you end up with a full CRM and an empty quarter.",
      },
      {
        q: "What changed once you started reporting on defensible pipeline instead?",
        a: "Our weekly review went from arguing about MQL definitions to picking three accounts to actually unblock.",
      },
      {
        q: "What would you tell a marketing leader who wants to make that shift next quarter?",
        a: "Pick one number your sales lead already trusts, and report only that for 90 days. Everything else is noise.",
      },
    ],
  },
  feedbackLoop: {
    heading: "The system gets better",
    headingHighlight: "every week.",
    subheadline:
      "Every interaction creates context. Every conversation improves future decisions. Every new signal helps Isla understand what leads to meetings, creating a system that continuously improves itself.",
    newResearch: "New research this week",
    insightsSuffix: "insights",
    researchItems: [
      "Competitor post analyzed",
      "Industry trend detected",
      "Post engagement analyzed",
      "ICP conversations scanned",
    ],
    contentSteps: ["Research", "Idea", "Interview", "Draft", "Scheduled"],
    kpis: [
      { label: "Profile Views" },
      { label: "Post Engagement" },
      { label: "Inbound Leads" },
    ],
    up: "UP",
    down: "DOWN",
    confidenceScore: "Isla Confidence Score",
    timeline: [
      { t: "Post Published", w: "Monday, 9:00 AM" },
      { t: "Prospect Commented", w: "Monday, 11:30 AM" },
      { t: "Profile Visit Logged", w: "Tuesday, 2:15 PM" },
      { t: "Message Started", w: "Wednesday, 10:00 AM" },
      { t: "Meeting Booked", w: "Thursday, 4:00 PM" },
    ],
    tags: ["Research", "Content", "Signals", "Prioritize", "Daily Actions", "Conversations"],
    cards: [
      {
        label: "Research",
        title: "Every week starts with better context.",
        description:
          "Isla continuously analyzes your market, competitors, industry news and customer conversations to identify what your ICP is paying attention to right now.",
      },
      {
        label: "Content",
        title: "Research becomes content.",
        description:
          "Instead of starting from a blank page, Isla turns research into content ideas and drafts posts designed to attract your ICP.",
      },
      {
        label: "Buying Signals",
        title: "Every interaction becomes intelligence.",
        description:
          "Views, likes, comments, profile visits and repeated engagement all become signals that help Isla understand which relationships are getting warmer.",
      },
      {
        label: "Prioritization",
        title: "The right people rise to the top.",
        description:
          "As new signals arrive, Isla automatically reprioritizes your pipeline so your team always knows who deserves attention next.",
      },
      {
        label: "Learning Loop",
        title: "Every conversation makes Isla smarter.",
        description:
          "Successful conversations teach Isla which topics, signals and actions create meetings, making future recommendations more accurate.",
      },
      {
        label: "Compounding",
        title: "Small actions compound into pipeline.",
        description:
          "Research improves content, content creates signals, signals prioritize relationships. Every week the loop repeats, making your network — and your pipeline — more valuable.",
      },
    ],
  },
  whoItsFor: {
    badge: "Who it's for",
    headingLine1: "From solo founders",
    headingLine2: "to B2B marketing teams.",
    learnMore: "Learn more",
    cards: [
      {
        tag: "Founders",
        index: "PROFILE 01",
        title: "Founders building in public",
        description:
          "You're building something big and want the market to see it. Isla engages your ICP 24/7 while you focus on the product.",
      },
      {
        tag: "Teams",
        index: "PROFILE 02",
        title: "B2B marketing teams",
        description:
          "A shared calendar with content ready every week. Approvals, analytics and a dedicated person to execute it all.",
      },
      {
        tag: "Duos",
        index: "PROFILE 03",
        title: "Founder + first hire",
        description:
          "Isla is the third teammate: it monitors, runs the calendar and shows analytics. You just approve and reap the results.",
      },
    ],
  },
  pricing: {
    heading: "Ready to Get Started?",
    monthly: "Monthly",
    yearly: "Yearly",
    save30: "Save 30%",
    perMonth: "/month",
    seats: "Seats",
    bookACall: "Book a Call",
    managedBadge: "MANAGED",
    autopilot: {
      name: "Autopilot",
      description:
        "An Isla professional creates and publishes your content end to end — you just approve.",
      features: [
        "A dedicated Isla professional managing your content",
        "Content created and published for you — you just approve",
        "AI agents that take actions to grow your account",
        "Advanced analytics",
        "Growth alerts and account monitoring",
        "Weekly 20-min strategy call",
      ],
    },
  },
  whyNot: {
    heading: "Why not an agency, an SDR, or a tool",
    rows: { cost: "Cost", missing: "What's missing" },
    columns: [
      {
        label: "Isla",
        cost: "$500/mo",
        missing: "Network growth, warming, content and measurement as one loop, run for you.",
      },
      {
        label: "Content agency",
        cost: "$2,000–5,000/mo",
        missing: "Posts, and nothing downstream. No network growth, no measurement, no follow-up.",
      },
      {
        label: "SDR + outbound stack",
        cost: "$6,000+/mo loaded",
        missing: "Messages strangers. Ignores the warm buyers already in your network.",
      },
      {
        label: "A LinkedIn tool",
        cost: "$100–500/mo",
        missing: "A dashboard someone has to remember to open. No content, no research, no operator.",
      },
      {
        label: "Internally",
        cost: '"Free"',
        missing: "Works for five weeks.",
      },
    ],
  },
  blogCTA: {
    badge: "Blog",
    heading: "Growth playbook for B2B teams",
    description:
      "Case studies, frameworks and practical insights on GTM, growth and winning clients on LinkedIn.",
    readBlog: "Read the blog",
    seeArticles: "See articles",
  },
  faq: {
    heading: "Isla FAQs",
    searchPlaceholder: "Search Agents, Pricing, Onboarding…",
    noMatch: "No questions match your search.",
    topics: {
      General: "General",
      Product: "Product",
      "Security & Billing": "Security & Billing",
    },
    items: [
      {
        topic: "General",
        q: "What exactly is Isla?",
        a: "Isla is one system that turns your team's LinkedIn network into warm pipeline. It maps every connection against your ICP, adds new relevant prospects daily, creates content in your real voice, warms the right relationships, and tells you the moment someone is ready for a conversation — with a dedicated operator running all of it.",
      },
      {
        topic: "General",
        q: "How is this different from a content agency or an outbound tool?",
        a: "Agencies help you write. Cold outbound tools help you message strangers. Automation tools help you send more requests. Isla connects all of it into one feedback loop: research improves content, content creates signals, signals improve prioritization, and prioritization drives the daily actions that create conversations.",
      },
      {
        topic: "General",
        q: "How fast do I see results?",
        a: "The first thing you get is visibility. In week one your full connection base is mapped and ICP-scored per team member, so hidden opportunities surface immediately. Some Isla customers book meetings in their first week.",
      },
      {
        topic: "Product",
        q: "How does Isla find buyers already inside my network?",
        a: "Isla analyzes the LinkedIn connections of every person on your team and evaluates each one individually against your ICP — who matches, who knows someone on your team, who follows you, who engages with your content or with competitors. Instead of thousands of disconnected profiles, you get a pipeline of real relationships.",
      },
      {
        topic: "Product",
        q: "How does the content get created?",
        a: "Isla researches relevant news, topics performing well in your niche, conversations attracting your ICP, and your own product and point of view. That research is combined with short weekly interviews that capture your stories, opinions and language. The content is written, scheduled and published for you.",
      },
      {
        topic: "Product",
        q: "How do you measure whether content is working?",
        a: "We don't report impressions. We report ICP impact: which buyers in your target set saw and engaged with each post, how often, and which topics move them. Content becomes a targeting instrument instead of a vanity metric.",
      },
      {
        topic: "Product",
        q: "How does the pipeline board work?",
        a: "Every ICP person lives on a board with five columns: Leads, Connecting, Engaging, Hot Leads and Reach Out. Cards only move when an action actually completed, so the board records work done rather than work queued. At any moment you know who is in your network, who is warming, and who is ready to talk.",
      },
      {
        topic: "Product",
        q: "Does Isla message people automatically?",
        a: "No. Not every prospect should get a sales message today. Isla warms relationships through comments, exposure and intros, and when someone crosses from aware to interested you get an alert in Slack with the DM already written. You approve, we send.",
      },
      {
        topic: "Product",
        q: "What do I get every week?",
        a: "New ICP connections sourced and requested daily, researched content written and scheduled, comments and replies drafted in your voice, ICP impact reporting, hot lead alerts with the DM ready, and a weekly brief covering who is new, who is warming and who is ready — plus a dedicated operator running it all.",
      },
      {
        topic: "Security & Billing",
        q: "How does pricing work?",
        a: "We charge per seat. Add or remove team members whenever you want — pricing scales with the number of seats. Talk to our team for a quote for your team size.",
      },
      {
        topic: "Security & Billing",
        q: "Do I need to give my LinkedIn credentials?",
        a: "No. We use OAuth (the same secure flow as “Sign in with Google”). Your credentials are never stored.",
      },
      {
        topic: "Security & Billing",
        q: "Can I cancel anytime?",
        a: "Yes. No contracts, no cancellation fees. Add or remove seats as your team changes.",
      },
    ] as { topic: FaqTopic; q: string; a: string }[],
  },
  testimonials: {
    badge: "Testimonials",
    headingPre: "Trusted by",
    headingHighlight: "leaders",
    headingPost: "from various industries.",
    subheading:
      "Learn why founders, operators, and creators trust our platform to move faster, ship sharper, and sleep better.",
    whatTheySay: "What they say about us",
    tags: {
      "Daily GTM signal": "Daily GTM signal",
      "Team-ready": "Team-ready",
      "Warm leads on autopilot": "Warm leads on autopilot",
      "1–2h → 15 min": "1–2h → 15 min",
      "Personal assistant": "Personal assistant",
      "Unfair advantage": "Unfair advantage",
      "3–5 posts/week": "3–5 posts/week",
      "Compounding reach": "Compounding reach",
    },
  },
  finalCTA: {
    eyebrow: "Start today",
    headlinePre: "You may already be connected to",
    headlineHighlight: "your next customer.",
    body: "Isla reveals the opportunities inside your network in the first week. Then it continuously grows your ICP audience, creates the content that warms it, tracks every relationship, and tells you when it is time to talk.",
    bold: "Turn LinkedIn into a weekly source of warm sales conversations.",
    cta: "See Isla in action",
    ctaSecondary: "Get Started",
  },
  footer: {
    copyright: "Copyright © 2025 Isla is part of Tailbox, Inc. All rights reserved.",
    getInTouch: "Get in touch",
    copied: "Copied",
  },
  blogIndex: {
    badge: "Isla Blog",
    heading: "The Growth Playbook for B2B Teams",
    subheading:
      "Case studies, frameworks, and practical insights on go-to-market strategy, growth, and customer acquisition.",
    noPosts: "No posts published yet.",
    loadMore: "Load More",
    viewPost: "View Post",
    errorHeading: "Couldn't load the blog",
  },
  blogPost: {
    home: "Home",
    blog: "Blog",
    youMayAlsoLike: "You may also like",
    viewAll: "View All",
    errorHeading: "Couldn't load post",
    notFoundHeading: "Post not found",
    backToBlog: "Back to blog",
    subscribedHeading: "You're subscribed!",
    subscribedBody:
      "Thanks for joining our newsletter. Keep an eye on your inbox for our next selection of articles.",
    subscriptionHeading: "Subscription",
    subscriptionBody:
      "Subscribe to our newsletter and receive a selection of cool articles every week.",
    emailPlaceholder: "Enter your email",
    subscribing: "Subscribing...",
    subscribe: "Subscribe",
    subscribeError: "Something went wrong. Please try again.",
  },
  language: {
    label: "Language",
    en: "English",
    pt: "Português (BR)",
  },
};

const pt: typeof en = {
  nav: {
    howItWorks: "Como funciona",
    ideaDeck: "Banco de ideias",
    aiInterview: "Entrevista com IA",
    testimonials: "Depoimentos",
    pricing: "Planos",
    blog: "Blog",
    getStarted: "Começar agora",
    letsGo: "Vamos lá",
  },
  notFound: {
    title: "404",
    heading: "Página não encontrada",
    description: "A página que você procura não existe ou foi movida.",
    goHome: "Voltar ao início",
  },
  hero: {
    headlinePre: "Transforme a rede do seu LinkedIn em",
    headlineHighlight: "pipeline aquecido",
    subheadline:
      "A Isla identifica compradores na sua rede, adiciona prospects do seu ICP, aquece relacionamentos e avisa quando é hora de engajar. Tudo trabalha junto para criar um pipeline aquecido.",
    cta: "Começar agora",
    ctaSecondary: "Vamos lá",
  },
  trustedBy: {
    label: "Confiado por founders de",
    quote: "“Finalmente, uma ferramenta que me diz o que fazer.”",
  },
  networkBeam: {
    headlinePre: "Seu próximo cliente já está",
    headlineHighlight: "na sua rede.",
    sourceLabel: "Fonte",
    scoreLabel: "Score",
    sources: [
      { title: "Seus posts", desc: "Pessoas engajando com seu conteúdo" },
      { title: "Concorrentes", desc: "Pessoas engajando com posts de concorrentes" },
      { title: "Seu nicho", desc: "Pessoas dentro da sua área de atuação" },
    ],
    paragraph:
      "A Isla captura sinais de três fontes, filtra pelo seu ICP e devolve perfis prontos para iniciar a conversa. Conteúdo como isca, não como marketing.",
  },
  howItWorks: {
    heading: "Como funciona",
    steps: [
      {
        title: "Revele o pipeline que já existe na sua rede",
        body: "A Isla pontua cada conexão do LinkedIn do seu time contra o seu ICP — transformando perfis dispersos em um pipeline de verdade.",
      },
      {
        title: "Crie conteúdo pensado para o seu ICP",
        body: "Seu profissional dedicado da Isla revisa as ideias que você curtiu e transforma em um rascunho pronto para você aprovar.",
      },
      {
        title: "Publique e meça o impacto no ICP",
        body: "Veja exatamente quais compradores viram e engajaram com seu conteúdo. Conteúdo vira instrumento de targeting, não métrica de vaidade.",
      },
      {
        title: "Expanda sua rede de ICP todos os dias. Faça sua conta crescer",
        body: "Todos os dias a Isla traz novos prospects alinhados ao seu ICP para sua rede — para você construir uma audiência feita de futuros clientes, não seguidores.",
      },
      {
        title: "Aqueça quem já está dentro dela",
        body: "Comentários, exposição repetida e as apresentações certas criam familiaridade primeiro. A Isla só recomenda abordagem quando os sinais estão lá.",
      },
      {
        title: "Saiba a hora certa de falar",
        body: "No momento em que um lead passa de ciente para interessado, você recebe um alerta. Você aprova, nós enviamos.",
      },
    ],
  },
  contentSwipe: {
    headlineLine1: "Dê ideias ao post,",
    headlineLine2: "sem a página em branco.",
    viewOnGraph: "Ver ideia no grafo",
    trending: "🔥 Em alta",
    idea: "Ideia",
    features: [
      {
        title: "Banco semanal de ideias",
        desc: "Seus posts anteriores, concorrentes, referências e sinais de mercado viram uma fila semanal de ideias.",
      },
      {
        title: "Você escolhe",
        desc: "Aprove, pule ou salve ideias. A Isla aprende continuamente suas preferências.",
      },
      {
        title: "A gente escreve",
        desc: "Nosso time transforma cada ideia escolhida por você em um post pronto pra publicar.",
      },
    ],
    ideas: [
      {
        pillar: "Liderança de Marketing",
        badge: "idea" as const,
        title:
          "Pare de medir seu time de marketing por 'leads'. Comece a medir pelo pipeline que eles conseguem defender numa sala cheia de céticos.",
        angle: "Reposicione a accountability de marketing de métricas de vaidade para conversas sobre receita.",
        tags: ["#b2b", "#revops", "#marketing"],
      },
      {
        pillar: "IA e GTM",
        badge: "trending" as const,
        title:
          "Poder computacional é o novo headcount. Os times que estão ganhando agora não estão contratando mais rápido — estão comprando inferência com mais inteligência.",
        angle: "Conecte a expansão de capacidade da NVIDIA com como os times de B2B deveriam orçar IA.",
        tags: ["#ia", "#gtm", "#orcamento"],
      },
      {
        pillar: "Contratação",
        badge: "idea" as const,
        title:
          "Os melhores vendedores que já contratei não eram os mais barulhentos na sala. Eram os que me faziam as perguntas mais afiadas.",
        angle: "História pessoal de contratação transformada numa lição contraintuitiva sobre talento em vendas.",
        tags: ["#contratacao", "#vendas", "#lideranca"],
      },
      {
        pillar: "Posicionamento",
        badge: "trending" as const,
        title:
          "A IA enterprise acabou de sair do 'experimento' para a 'compra oficial'. A maioria dos times de GTM ainda vende para o experimento.",
        angle: "Transforme a virada da IA enterprise numa lição de posicionamento para vendedores B2B.",
        tags: ["#posicionamento", "#enterprise", "#b2b"],
      },
      {
        pillar: "Produto",
        badge: "idea" as const,
        title:
          "Matei 40% do nosso roadmap no trimestre passado. A receita subiu, o moral subiu. A maioria dos 'imprescindíveis' eram só barulho.",
        angle: "Visão de founder sobre priorização implacável, ancorada em um número real.",
        tags: ["#produto", "#founder", "#foco"],
      },
    ],
  },
  aiInterview: {
    heading: "Refine a ideia em só 4 minutos com a",
    headingHighlight: "entrevistadora Isla.",
    subheadline:
      "Curtiu uma ideia? Faça uma entrevista rápida com a IA sobre ela. Em quatro minutos, você transforma esse insight no primeiro rascunho do post, pronto para ajustar com o agente ou enviar para revisão humana do time Isla.",
    cta: "Começar agora",
    ctaSecondary: "Vamos lá",
    liveCall: "Chamada ao vivo com a Isla",
    refiningNow: "Refinando agora",
    pillarLabel: "Pilar",
    pillarValue: "Liderança de Marketing",
    angleLabel: "Ângulo",
    angleValue:
      "Reposicione a accountability de marketing de métricas de vaidade para conversas sobre receita.",
    callProgress: "Progresso da chamada",
    qOf: (turn: number, total: number, left: number) => `P${turn}/${total} · faltam ${left}`,
    islaSpeaking: "Isla falando",
    listening: "Ouvindo",
    you: "Você",
    transcript: "Transcrição",
    typeInstead: "Digitar em vez disso",
    endCall: "Encerrar chamada",
    refiningTitle:
      "Pare de medir seu time de marketing por 'leads'. Comece a medir pelo pipeline que eles conseguem defender numa sala cheia de céticos.",
    turns: [
      {
        q: "Vamos começar com “Pare de medir seu time de marketing por leads”. O que aconteceu de verdade para você perceber isso?",
        a: "Eu estava montando o dashboard de pipeline para o nosso head de vendas, e o número que ele realmente se importava não estava ali — ele só queria saber quais negócios estavam escorregando naquela semana.",
      },
      {
        q: "Interessante. Com quem exatamente você discorda — e qual é o custo de ignorar isso?",
        a: "A maioria dos playbooks de demand gen. Eles otimizam para volume, então você acaba com um CRM cheio e um trimestre vazio.",
      },
      {
        q: "O que mudou quando você começou a reportar pipeline defensável em vez disso?",
        a: "Nossa reunião semanal deixou de ser uma discussão sobre definição de MQL e passou a ser escolher três contas para realmente destravar.",
      },
      {
        q: "O que você diria a um líder de marketing que quer fazer essa mudança no próximo trimestre?",
        a: "Escolha um número em que seu líder de vendas já confia, e reporte só esse número por 90 dias. Todo o resto é ruído.",
      },
    ],
  },
  feedbackLoop: {
    heading: "O sistema fica melhor",
    headingHighlight: "toda semana.",
    subheadline:
      "Cada interação cria contexto. Cada conversa melhora as próximas decisões. Cada novo sinal ajuda a Isla a entender o que leva a reuniões, criando um sistema que se aprimora continuamente.",
    newResearch: "Nova pesquisa esta semana",
    insightsSuffix: "insights",
    researchItems: [
      "Post de concorrente analisado",
      "Tendência do setor detectada",
      "Engajamento do post analisado",
      "Conversas do ICP analisadas",
    ],
    contentSteps: ["Pesquisa", "Ideia", "Entrevista", "Rascunho", "Agendado"],
    kpis: [
      { label: "Visualizações de Perfil" },
      { label: "Engajamento em Posts" },
      { label: "Leads Inbound" },
    ],
    up: "SUBIU",
    down: "DESCEU",
    confidenceScore: "Score de Confiança Isla",
    timeline: [
      { t: "Post Publicado", w: "Segunda, 9h00" },
      { t: "Prospect Comentou", w: "Segunda, 11h30" },
      { t: "Visita ao Perfil Registrada", w: "Terça, 14h15" },
      { t: "Mensagem Iniciada", w: "Quarta, 10h00" },
      { t: "Reunião Agendada", w: "Quinta, 16h00" },
    ],
    tags: ["Pesquisa", "Conteúdo", "Sinais", "Priorizar", "Ações Diárias", "Conversas"],
    cards: [
      {
        label: "Pesquisa",
        title: "Cada semana começa com mais contexto.",
        description:
          "A Isla analisa continuamente seu mercado, concorrentes, notícias do setor e conversas com clientes para identificar no que seu ICP está prestando atenção agora.",
      },
      {
        label: "Conteúdo",
        title: "A pesquisa vira conteúdo.",
        description:
          "Em vez de começar da página em branco, a Isla transforma pesquisa em ideias de conteúdo e rascunha posts pensados para atrair seu ICP.",
      },
      {
        label: "Sinais de Compra",
        title: "Cada interação vira inteligência.",
        description:
          "Visualizações, curtidas, comentários, visitas de perfil e engajamento repetido viram sinais que ajudam a Isla a entender quais relacionamentos estão esquentando.",
      },
      {
        label: "Priorização",
        title: "As pessoas certas sobem ao topo.",
        description:
          "À medida que novos sinais chegam, a Isla repriorizaz automaticamente seu pipeline para seu time sempre saber quem merece atenção agora.",
      },
      {
        label: "Loop de Aprendizado",
        title: "Cada conversa deixa a Isla mais inteligente.",
        description:
          "Conversas bem-sucedidas ensinam a Isla quais temas, sinais e ações geram reuniões, tornando as próximas recomendações mais precisas.",
      },
      {
        label: "Composição",
        title: "Pequenas ações se somam em pipeline.",
        description:
          "A pesquisa melhora o conteúdo, o conteúdo cria sinais, os sinais priorizam relacionamentos. Toda semana o loop se repete, tornando sua rede — e seu pipeline — mais valiosos.",
      },
    ],
  },
  whoItsFor: {
    badge: "Para quem é",
    headingLine1: "De founders solo",
    headingLine2: "a times de marketing B2B.",
    learnMore: "Saiba mais",
    cards: [
      {
        tag: "Founders",
        index: "PERFIL 01",
        title: "Founders construindo em público",
        description:
          "Você está construindo algo grande e quer que o mercado veja. A Isla engaja seu ICP 24/7 enquanto você foca no produto.",
      },
      {
        tag: "Times",
        index: "PERFIL 02",
        title: "Times de marketing B2B",
        description:
          "Um calendário compartilhado com conteúdo pronto toda semana. Aprovações, analytics e uma pessoa dedicada para executar tudo.",
      },
      {
        tag: "Duplas",
        index: "PERFIL 03",
        title: "Founder + primeira contratação",
        description:
          "A Isla é o terceiro membro do time: monitora, roda o calendário e mostra analytics. Você só aprova e colhe os resultados.",
      },
    ],
  },
  pricing: {
    heading: "Pronto para começar?",
    monthly: "Mensal",
    yearly: "Anual",
    save30: "Economize 30%",
    perMonth: "/mês",
    seats: "Assentos",
    bookACall: "Agendar uma call",
    managedBadge: "GERENCIADO",
    autopilot: {
      name: "Autopilot",
      description:
        "Um profissional da Isla cria e publica seu conteúdo de ponta a ponta — você só aprova.",
      features: [
        "Um profissional dedicado da Isla gerenciando seu conteúdo",
        "Conteúdo criado e publicado pra você — você só aprova",
        "Agentes de IA que tomam ações para fazer sua conta crescer",
        "Analytics avançado",
        "Alertas de crescimento e monitoramento da conta",
        "Call estratégica semanal de 20 minutos",
      ],
    },
  },
  whyNot: {
    heading: "Por que não uma agência, um SDR ou uma ferramenta",
    rows: { cost: "Custo", missing: "O que falta" },
    columns: [
      {
        label: "Isla",
        cost: "$500/mês",
        missing: "Crescimento de rede, aquecimento, conteúdo e medição como um único loop, feito para você.",
      },
      {
        label: "Agência de conteúdo",
        cost: "$2.000–5.000/mês",
        missing: "Posts, e nada depois disso. Sem crescimento de rede, sem medição, sem follow-up.",
      },
      {
        label: "SDR + stack de outbound",
        cost: "$6.000+/mês com encargos",
        missing: "Manda mensagem para estranhos. Ignora os compradores aquecidos que já estão na sua rede.",
      },
      {
        label: "Uma ferramenta de LinkedIn",
        cost: "$100–500/mês",
        missing: "Um dashboard que alguém precisa lembrar de abrir. Sem conteúdo, sem pesquisa, sem operador.",
      },
      {
        label: "Internamente",
        cost: '"Grátis"',
        missing: "Funciona por umas cinco semanas.",
      },
    ],
  },
  blogCTA: {
    badge: "Blog",
    heading: "Manual de crescimento para times B2B",
    description:
      "Estudos de caso, frameworks e insights práticos sobre GTM, crescimento e como conquistar clientes no LinkedIn.",
    readBlog: "Ler o blog",
    seeArticles: "Ver artigos",
  },
  faq: {
    heading: "Perguntas frequentes",
    searchPlaceholder: "Busque Agentes, Planos, Onboarding…",
    noMatch: "Nenhuma pergunta encontrada para sua busca.",
    topics: {
      General: "Geral",
      Product: "Produto",
      "Security & Billing": "Segurança e Cobrança",
    },
    items: [
      {
        topic: "General",
        q: "O que exatamente é a Isla?",
        a: "A Isla é um sistema único que transforma a rede do LinkedIn do seu time em pipeline aquecido. Ela mapeia cada conexão contra seu ICP, adiciona novos prospects relevantes todos os dias, cria conteúdo na sua voz real, aquece os relacionamentos certos e avisa no momento em que alguém está pronto para conversar — com um operador dedicado tocando tudo isso.",
      },
      {
        topic: "General",
        q: "Qual a diferença para uma agência de conteúdo ou uma ferramenta de outbound?",
        a: "Agências ajudam a escrever. Ferramentas de outbound frio ajudam a mandar mensagem para estranhos. Ferramentas de automação ajudam a enviar mais pedidos de conexão. A Isla conecta tudo isso em um único loop de retroalimentação: a pesquisa melhora o conteúdo, o conteúdo cria sinais, os sinais melhoram a priorização, e a priorização direciona as ações diárias que criam conversas.",
      },
      {
        topic: "General",
        q: "Em quanto tempo vejo resultados?",
        a: "A primeira coisa que você ganha é visibilidade. Na primeira semana, toda a sua base de conexões é mapeada e pontuada por ICP por membro do time, então oportunidades escondidas aparecem imediatamente. Alguns clientes da Isla agendam reuniões já na primeira semana.",
      },
      {
        topic: "Product",
        q: "Como a Isla encontra compradores que já estão na minha rede?",
        a: "A Isla analisa as conexões do LinkedIn de cada pessoa do seu time e avalia cada uma individualmente contra o seu ICP — quem combina com o perfil, quem conhece alguém do seu time, quem te segue, quem engaja com seu conteúdo ou com o dos concorrentes. Em vez de milhares de perfis desconectados, você tem um pipeline de relacionamentos reais.",
      },
      {
        topic: "Product",
        q: "Como o conteúdo é criado?",
        a: "A Isla pesquisa notícias relevantes, temas performando bem no seu nicho, conversas que atraem seu ICP e o seu próprio produto e ponto de vista. Essa pesquisa é combinada com entrevistas semanais curtas que capturam suas histórias, opiniões e linguagem. O conteúdo é escrito, agendado e publicado para você.",
      },
      {
        topic: "Product",
        q: "Como vocês medem se o conteúdo está funcionando?",
        a: "Nós não reportamos impressões. Reportamos impacto no ICP: quais compradores no seu público-alvo viram e engajaram com cada post, com que frequência, e quais temas os movem. O conteúdo vira um instrumento de targeting em vez de uma métrica de vaidade.",
      },
      {
        topic: "Product",
        q: "Como funciona o board de pipeline?",
        a: "Cada pessoa do ICP vive em um board com cinco colunas: Leads, Conectando, Engajando, Leads Quentes e Abordar. Os cards só se movem quando uma ação realmente foi concluída, então o board registra trabalho feito, não trabalho na fila. A qualquer momento você sabe quem está na sua rede, quem está esquentando e quem está pronto para conversar.",
      },
      {
        topic: "Product",
        q: "A Isla manda mensagem para as pessoas automaticamente?",
        a: "Não. Nem todo prospect deveria receber uma mensagem de vendas hoje. A Isla aquece relacionamentos através de comentários, exposição e apresentações, e quando alguém passa de ciente para interessado você recebe um alerta no Slack com a mensagem já escrita. Você aprova, nós enviamos.",
      },
      {
        topic: "Product",
        q: "O que eu recebo toda semana?",
        a: "Novas conexões de ICP identificadas e solicitadas diariamente, conteúdo pesquisado, escrito e agendado, comentários e respostas rascunhados na sua voz, relatório de impacto no ICP, alertas de leads quentes com a mensagem pronta, e um resumo semanal cobrindo quem é novo, quem está esquentando e quem está pronto — além de um operador dedicado tocando tudo isso.",
      },
      {
        topic: "Security & Billing",
        q: "Como funciona a cobrança?",
        a: "Cobramos por assento. Adicione ou remova membros do time quando quiser — o preço escala com o número de assentos. Fale com nosso time para uma cotação para o tamanho do seu time.",
      },
      {
        topic: "Security & Billing",
        q: "Preciso passar minhas credenciais do LinkedIn?",
        a: "Não. Usamos OAuth (o mesmo fluxo seguro do “Entrar com o Google”). Suas credenciais nunca são armazenadas.",
      },
      {
        topic: "Security & Billing",
        q: "Posso cancelar quando quiser?",
        a: "Sim. Sem contratos, sem taxa de cancelamento. Adicione ou remova assentos conforme seu time muda.",
      },
    ] as { topic: FaqTopic; q: string; a: string }[],
  },
  testimonials: {
    badge: "Depoimentos",
    headingPre: "Confiado por",
    headingHighlight: "líderes",
    headingPost: "de diversos setores.",
    subheading:
      "Veja por que founders, operadores e criadores confiam na nossa plataforma para ir mais rápido, entregar melhor e dormir tranquilos.",
    whatTheySay: "O que dizem sobre nós",
    tags: {
      "Daily GTM signal": "Sinal diário de GTM",
      "Team-ready": "Pronto para o time",
      "Warm leads on autopilot": "Leads aquecidos no automático",
      "1–2h → 15 min": "1–2h → 15 min",
      "Personal assistant": "Assistente pessoal",
      "Unfair advantage": "Vantagem injusta",
      "3–5 posts/week": "3–5 posts/semana",
      "Compounding reach": "Alcance em composto",
    },
  },
  finalCTA: {
    eyebrow: "Comece hoje",
    headlinePre: "Você talvez já esteja conectado ao",
    headlineHighlight: "seu próximo cliente.",
    body: "A Isla revela as oportunidades dentro da sua rede logo na primeira semana. Depois, ela expande continuamente sua audiência de ICP, cria o conteúdo que a aquece, acompanha cada relacionamento e avisa quando é hora de falar.",
    bold: "Transforme o LinkedIn em uma fonte semanal de conversas de vendas aquecidas.",
    cta: "Ver a Isla em ação",
    ctaSecondary: "Começar agora",
  },
  footer: {
    copyright: "Copyright © 2025 Isla faz parte da Tailbox, Inc. Todos os direitos reservados.",
    getInTouch: "Fale conosco",
    copied: "Copiado",
  },
  blogIndex: {
    badge: "Blog da Isla",
    heading: "O Manual de Crescimento para Times B2B",
    subheading:
      "Estudos de caso, frameworks e insights práticos sobre estratégia go-to-market, crescimento e aquisição de clientes.",
    noPosts: "Ainda não há posts publicados.",
    loadMore: "Carregar mais",
    viewPost: "Ver post",
    errorHeading: "Não foi possível carregar o blog",
  },
  blogPost: {
    home: "Início",
    blog: "Blog",
    youMayAlsoLike: "Você também pode gostar",
    viewAll: "Ver todos",
    errorHeading: "Não foi possível carregar o post",
    notFoundHeading: "Post não encontrado",
    backToBlog: "Voltar ao blog",
    subscribedHeading: "Inscrição confirmada!",
    subscribedBody:
      "Obrigado por se inscrever na nossa newsletter. Fique de olho na sua caixa de entrada para nossa próxima seleção de artigos.",
    subscriptionHeading: "Newsletter",
    subscriptionBody:
      "Assine nossa newsletter e receba uma seleção de artigos interessantes toda semana.",
    emailPlaceholder: "Digite seu e-mail",
    subscribing: "Inscrevendo...",
    subscribe: "Inscrever-se",
    subscribeError: "Algo deu errado. Tente novamente.",
  },
  language: {
    label: "Idioma",
    en: "English",
    pt: "Português (BR)",
  },
};

export const translations = { en, pt };
export type Translations = typeof en;
