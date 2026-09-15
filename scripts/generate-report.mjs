import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pptx.title = "Isla — Landing Performance Report";

const NAVY = "040A0F";
const NAVY_SOFT = "0B1320";
const CYAN = "00BFFF";
const CYAN_DIM = "0099CC";
const WHITE = "FFFFFF";
const MUTED = "8AA0B2";
const CARD = "111B26";
const GREEN = "22C55E";
const AMBER = "F59E0B";

const HEAD = { fontFace: "Calibri", color: WHITE };
const BODY = { fontFace: "Calibri", color: WHITE };

// ─── helpers ───────────────────────────────────────────────────────────────
const addDark = () => {
  const s = pptx.addSlide();
  s.background = { color: NAVY };
  return s;
};

const addLight = () => {
  const s = pptx.addSlide();
  s.background = { color: WHITE };
  return s;
};

const footer = (s, page, total) => {
  s.addText("Isla · Landing Performance Report · 29 abr → 29 mai 2026", {
    x: 0.4, y: 7.05, w: 9, h: 0.3, fontSize: 10, color: MUTED, fontFace: "Calibri",
  });
  s.addText(`${page} / ${total}`, {
    x: 12.4, y: 7.05, w: 0.6, h: 0.3, fontSize: 10, color: MUTED, fontFace: "Calibri", align: "right",
  });
};

const TOTAL = 8;

// ─── Slide 1 — Capa ────────────────────────────────────────────────────────
{
  const s = addDark();
  // accent block
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 7.5, fill: { color: CYAN } });
  s.addText("ISLA", {
    x: 0.9, y: 0.6, w: 6, h: 0.5, ...HEAD, fontSize: 14, bold: true, charSpacing: 8, color: CYAN,
  });
  s.addText("Landing Performance Report", {
    x: 0.9, y: 1.4, w: 11.5, h: 1.4, ...HEAD, fontSize: 54, bold: true,
  });
  s.addText("Análise dos últimos 30 dias · 29 abr → 29 mai 2026", {
    x: 0.9, y: 3.0, w: 11.5, h: 0.5, ...BODY, fontSize: 22, color: MUTED,
  });
  s.addText("isla.to", {
    x: 0.9, y: 6.6, w: 6, h: 0.4, ...BODY, fontSize: 14, color: CYAN, italic: true,
  });
  s.addText("Gerado em 29 mai 2026", {
    x: 8, y: 6.6, w: 4.93, h: 0.4, ...BODY, fontSize: 12, color: MUTED, align: "right",
  });
}

// ─── Slide 2 — Visão Geral (KPIs) ──────────────────────────────────────────
{
  const s = addLight();
  s.addText("Visão Geral", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addText("Resumo executivo · últimos 30 dias", { x: 0.5, y: 1.05, w: 12, h: 0.4, fontSize: 16, color: "6B7A88", fontFace: "Calibri" });

  const kpis = [
    { v: "1.027", l: "Visitantes únicos", c: CYAN },
    { v: "1.425", l: "Pageviews", c: CYAN },
    { v: "1,39", l: "Páginas por visita", c: NAVY },
    { v: "53s", l: "Duração média de sessão", c: NAVY },
    { v: "84%", l: "Bounce rate", c: AMBER },
    { v: "97%", l: "Tráfego na home (/)", c: GREEN },
  ];
  const W = 3.95, H = 1.7, gx = 0.5, gy = 1.7, gap = 0.2;
  kpis.forEach((k, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = gx + col * (W + gap), y = gy + row * (H + gap);
    s.addShape(pptx.shapes.RECTANGLE, { x, y, w: W, h: H, fill: { color: "F3F6F9" }, line: { color: "E2E8EE", width: 0.5 } });
    s.addShape(pptx.shapes.RECTANGLE, { x, y, w: 0.08, h: H, fill: { color: k.c }, line: { type: "none" } });
    s.addText(k.v, { x: x + 0.25, y: y + 0.2, w: W - 0.35, h: 0.8, fontSize: 44, bold: true, color: NAVY, fontFace: "Calibri" });
    s.addText(k.l, { x: x + 0.25, y: y + 1.05, w: W - 0.35, h: 0.5, fontSize: 14, color: "6B7A88", fontFace: "Calibri" });
  });

  s.addText("Insight: tráfego concentrado na home, com sessões curtas mas focadas — visitantes chegam, leem e saem (típico de B2B early-stage).", {
    x: 0.5, y: 5.6, w: 12.3, h: 0.9, fontSize: 13, italic: true, color: "475569", fontFace: "Calibri",
  });
  footer(s, 2, TOTAL);
}

// ─── Slide 3 — Origem do tráfego ───────────────────────────────────────────
{
  const s = addLight();
  s.addText("Origem do tráfego", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addText("De onde vêm os 1.027 visitantes", { x: 0.5, y: 1.05, w: 12, h: 0.4, fontSize: 16, color: "6B7A88", fontFace: "Calibri" });

  const data = [
    { name: "Origem", labels: ["Direct", "LinkedIn", "Twitter/X", "TabNews", "Google", "YouTube", "Facebook", "Hotjar"], values: [637, 256, 44, 37, 26, 18, 6, 3] },
  ];
  s.addChart(pptx.charts.BAR, data, {
    x: 0.5, y: 1.6, w: 8, h: 5.2,
    barDir: "bar", chartColors: [CYAN],
    showLegend: false, showValue: true,
    catAxisLabelFontSize: 12, valAxisLabelFontSize: 10,
    catAxisLabelColor: NAVY, valAxisLabelColor: "6B7A88",
    dataLabelFontSize: 11, dataLabelColor: NAVY,
  });

  // Insights box
  s.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 1.6, w: 4.1, h: 5.2, fill: { color: NAVY }, line: { type: "none" } });
  s.addText("Insights", { x: 9.0, y: 1.8, w: 3.7, h: 0.4, fontSize: 18, bold: true, color: CYAN, fontFace: "Calibri" });
  const insights = [
    "Direct (62%) — força da marca e tráfego salvo/digitado.",
    "LinkedIn é o canal orgânico #1 (25% combinando web + app + lnkd.in).",
    "TabNews trouxe 37 visitantes — vale repetir esse tipo de post.",
    "Google ainda baixo (2,5%) — SEO em fase inicial.",
  ];
  s.addText(
    insights.map((t, i) => ({
      text: t,
      options: { bullet: { code: "2022" }, breakLine: i < insights.length - 1, paraSpaceAfter: 10 },
    })),
    { x: 9.0, y: 2.3, w: 3.7, h: 4.5, fontSize: 12, color: WHITE, fontFace: "Calibri", valign: "top" }
  );

  footer(s, 3, TOTAL);
}

// ─── Slide 4 — Dispositivo e Geografia ─────────────────────────────────────
{
  const s = addLight();
  s.addText("Dispositivo & Geografia", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });

  // Device donut
  s.addText("Dispositivo", { x: 0.5, y: 1.3, w: 6, h: 0.4, fontSize: 18, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addChart(pptx.charts.DOUGHNUT,
    [{ name: "Dispositivo", labels: ["Desktop", "Mobile"], values: [637, 388] }],
    {
      x: 0.5, y: 1.7, w: 5.5, h: 4.8,
      chartColors: [CYAN, NAVY],
      showLegend: true, legendPos: "b", legendFontSize: 12,
      showPercent: true, dataLabelColor: WHITE, dataLabelFontSize: 14,
      holeSize: 55,
    }
  );

  // Country bars
  s.addText("Top países", { x: 6.5, y: 1.3, w: 6, h: 0.4, fontSize: 18, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addChart(pptx.charts.BAR,
    [{ name: "País", labels: ["Brasil", "EUA", "Portugal", "Índia", "UK", "Azerbaijão", "Holanda"], values: [708, 162, 12, 10, 10, 10, 7] }],
    {
      x: 6.5, y: 1.7, w: 6.5, h: 4.8,
      barDir: "bar", chartColors: [CYAN],
      showLegend: false, showValue: true,
      catAxisLabelFontSize: 11, dataLabelFontSize: 10,
    }
  );

  s.addText("Insight: 69% Brasil, 16% EUA — público concentrado no BR. Mobile (38%) cresce mas desktop (62%) ainda lidera, oportunidade pra otimizar versão mobile.", {
    x: 0.5, y: 6.55, w: 12.3, h: 0.5, fontSize: 12, italic: true, color: "475569", fontFace: "Calibri",
  });
  footer(s, 4, TOTAL);
}

// ─── Slide 5 — Tendência diária ────────────────────────────────────────────
{
  const s = addLight();
  s.addText("Tendência diária", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addText("Visitantes por dia · 29 abr → 29 mai", { x: 0.5, y: 1.05, w: 12, h: 0.4, fontSize: 16, color: "6B7A88", fontFace: "Calibri" });

  const days = [13,15,25,16,24,30,158,71,25,32,9,16,80,34,25,24,108,38,18,45,30,24,34,24,12,16,16,20,29,12,4];
  const labels = ["29/4","30/4","1/5","2/5","3/5","4/5","5/5","6/5","7/5","8/5","9/5","10/5","11/5","12/5","13/5","14/5","15/5","16/5","17/5","18/5","19/5","20/5","21/5","22/5","23/5","24/5","25/5","26/5","27/5","28/5","29/5"];
  s.addChart(pptx.charts.LINE,
    [{ name: "Visitantes", labels, values: days }],
    {
      x: 0.5, y: 1.6, w: 12.3, h: 4.5,
      chartColors: [CYAN],
      showLegend: false,
      lineDataSymbol: "circle", lineDataSymbolSize: 6,
      catAxisLabelFontSize: 9, valAxisLabelFontSize: 10,
      lineSize: 3,
    }
  );

  s.addText("Picos identificados:", { x: 0.5, y: 6.2, w: 3, h: 0.3, fontSize: 13, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addText("• 05/mai — 158 visitantes (maior pico)   • 15/mai — 108   • 11/mai — 80", {
    x: 3.4, y: 6.2, w: 9.5, h: 0.3, fontSize: 13, color: "475569", fontFace: "Calibri",
  });
  s.addText("Hipótese: picos coincidem com posts no LinkedIn ou menções externas — vale correlacionar com calendário editorial.", {
    x: 0.5, y: 6.6, w: 12.3, h: 0.5, fontSize: 11, italic: true, color: "6B7A88", fontFace: "Calibri",
  });
  footer(s, 5, TOTAL);
}

// ─── Slide 6 — Antes vs Depois (placeholder) ───────────────────────────────
{
  const s = addLight();
  s.addText("Antes vs Depois", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });
  s.addText("Landing anterior × landing atual", { x: 0.5, y: 1.05, w: 12, h: 0.4, fontSize: 16, color: "6B7A88", fontFace: "Calibri" });

  // Table header
  const headers = ["Métrica", "Antes", "Depois", "Δ"];
  const rows = [
    ["Conversion Rate", "—", "—", "—"],
    ["Bounce Rate", "—", "84%", "—"],
    ["Avg Session Duration", "—", "53s", "—"],
    ["Scroll Depth (50%)", "—", "(a coletar)", "—"],
    ["CTA Click Rate", "—", "(a coletar)", "—"],
    ["Leads gerados", "—", "—", "—"],
    ["CPL (mídia paga)", "—", "—", "—"],
    ["Organic traffic", "—", "1.027 / 30d", "—"],
  ];
  const colW = [4.5, 2.7, 2.7, 2.4];
  const x0 = 0.5, y0 = 1.7;
  const buildRow = (cells, isHeader) => cells.map((c, i) => ({
    text: c,
    options: {
      bold: isHeader,
      fill: { color: isHeader ? NAVY : (i === 0 ? "F3F6F9" : WHITE) },
      color: isHeader ? WHITE : NAVY,
      fontSize: isHeader ? 14 : 13,
      align: i === 0 ? "left" : "center",
      valign: "middle",
      fontFace: "Calibri",
    },
  }));
  s.addTable([buildRow(headers, true), ...rows.map((r) => buildRow(r, false))], {
    x: x0, y: y0, w: colW.reduce((a, b) => a + b, 0),
    colW, rowH: 0.45,
    border: { type: "solid", color: "E2E8EE", pt: 0.5 },
  });

  s.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 6.0, w: 12.3, h: 1.0, fill: { color: "FFF7E6" }, line: { color: AMBER, width: 1 } });
  s.addText("Aguardando dados da landing anterior — cole os números (CR, Bounce, Avg Duration, Leads, CPL) e geramos v2 deste slide preenchido.", {
    x: 0.7, y: 6.1, w: 11.9, h: 0.8, fontSize: 13, color: "78540C", fontFace: "Calibri", valign: "middle",
  });
  footer(s, 6, TOTAL);
}

// ─── Slide 7 — Funil ───────────────────────────────────────────────────────
{
  const s = addDark();
  s.addText("Funil da Landing", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: WHITE, fontFace: "Calibri" });
  s.addText("Da visita à conversão", { x: 0.5, y: 1.05, w: 12, h: 0.4, fontSize: 16, color: MUTED, fontFace: "Calibri" });

  // Funnel steps (trapezoid simulation with shrinking rectangles)
  const steps = [
    { label: "Visitantes", pct: "100%", value: "1.027 (últimos 30d)", w: 11.0 },
    { label: "Scroll 50% da página", pct: "~?", value: "evento ativado hoje", w: 9.0 },
    { label: "Viu seção de prova social", pct: "~?", value: "evento ativado hoje", w: 7.0 },
    { label: "Clicou em CTA (Book a Call)", pct: "~?", value: "evento ativado hoje", w: 5.0 },
    { label: "Reuniões agendadas (conversão)", pct: "~?", value: "Cal.com (a integrar)", w: 3.2 },
  ];
  let y = 1.6;
  steps.forEach((step, i) => {
    const x = (13.33 - step.w) / 2;
    const color = i === 0 ? CYAN : i === steps.length - 1 ? GREEN : CYAN_DIM;
    s.addShape(pptx.shapes.RECTANGLE, { x, y, w: step.w, h: 0.7, fill: { color }, line: { type: "none" } });
    s.addText(
      [
        { text: `${step.label}  `, options: { bold: true, fontSize: 14 } },
        { text: step.pct, options: { fontSize: 14, color: NAVY } },
      ],
      { x, y, w: step.w, h: 0.7, color: WHITE, fontFace: "Calibri", align: "center", valign: "middle" }
    );
    s.addText(step.value, { x: 0.5, y: y + 0.72, w: 12.3, h: 0.22, fontSize: 9, color: MUTED, fontFace: "Calibri", align: "center" });
    y += 1.0;
  });

  s.addText("Instrumentação ativada hoje (29 mai 2026). Funil real com números preenchidos disponível em ~14 dias.", {
    x: 0.5, y: 6.75, w: 12.3, h: 0.3, fontSize: 11, italic: true, color: CYAN, fontFace: "Calibri", align: "center",
  });
  footer(s, 7, TOTAL);
}

// ─── Slide 8 — Próximos passos ─────────────────────────────────────────────
{
  const s = addLight();
  s.addText("Próximos passos", { x: 0.5, y: 0.45, w: 12, h: 0.6, fontSize: 36, bold: true, color: NAVY, fontFace: "Calibri" });

  const actions = [
    { t: "1. Aguardar dados de funil (2 semanas)", d: "Eventos scroll_depth, section_viewed e cta_clicked já instrumentados via PostHog. Coleta começa hoje." },
    { t: "2. Reforçar LinkedIn (canal #1 orgânico)", d: "256 visitantes em 30d. Aumentar cadência de posts e correlacionar picos (5, 11, 15/mai) com conteúdo publicado." },
    { t: "3. Otimizar experiência mobile (38% e crescendo)", d: "Auditar hero, CTAs e tempo de carregamento em mobile. Bounce alto pode estar enviesado por mobile." },
    { t: "4. Investigar bounce 84%", d: "Duração de 53s sugere que visitantes estão lendo — não é abandono total. Confirmar com Hotjar recordings nas próximas 2 semanas." },
    { t: "5. SEO em fase inicial (Google 2,5%)", d: "Investir em conteúdo orgânico e schema markup para capturar busca de marca e categoria (LinkedIn GTM Agent)." },
  ];
  let y = 1.4;
  actions.forEach((a) => {
    s.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 0.95, fill: { color: CYAN }, line: { type: "none" } });
    s.addText(a.t, { x: 0.75, y, w: 12, h: 0.35, fontSize: 15, bold: true, color: NAVY, fontFace: "Calibri" });
    s.addText(a.d, { x: 0.75, y: y + 0.35, w: 12, h: 0.6, fontSize: 12, color: "475569", fontFace: "Calibri" });
    y += 1.08;
  });

  footer(s, 8, TOTAL);
}

await pptx.writeFile({ fileName: "/mnt/documents/isla-landing-report-v1.pptx" });
console.log("✓ Gerado: /mnt/documents/isla-landing-report-v1.pptx");
