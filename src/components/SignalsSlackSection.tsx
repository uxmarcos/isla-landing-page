import { ThumbsUp, MessageSquare, Hash } from "lucide-react";

const bullets = [
  "Detecta quando o lead publica e dá o like",
  "Sugere comentário na sua voz, via Slack",
  "Aquece o lead e prepara o convite de conexão",
];

export function SignalsSlackSection() {
  return (
    <section
      data-nav-theme="light"
      className="relative w-full bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
          {/* Left */}
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-isla-cyan">
              Sinais fortes, na hora certa
            </span>
            <h2
              className="font-display mt-5 text-[38px] font-light leading-[1.05] text-slate-900 md:text-[52px]"
              style={{ letterSpacing: "-0.4px" }}
            >
              A Isla te avisa no Slack quando{" "}
              <span className="text-isla-cyan italic">aquecer cada lead.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-slate-500 md:text-[17px]">
              Quando um lead do seu funil posta, a Isla percebe. Ela dá o like e
              sugere um comentário na sua voz, direto no Slack, pra você
              aprovar. Cada interação orgânica aquece o lead e movimenta o seu
              perfil — e prepara o convite de conexão.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-slate-700">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-isla-cyan" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Slack mockup */}
          <div className="rounded-2xl border border-slate-200 bg-white border border-slate-200 p-1.5 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)]">
            <div className="rounded-xl bg-white border border-slate-200 text-slate-900">
              {/* Slack header */}
              <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                <Hash className="h-4 w-4 text-slate-500" strokeWidth={2.5} />
                <span className="text-[13.5px] font-semibold">isla-signals</span>
                <span className="ml-auto text-[11px] text-slate-400">agora</span>
              </div>

              {/* Slack message */}
              <div className="space-y-3 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-isla-cyan to-purple-500 text-[12px] font-bold text-white">
                    IS
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13.5px] font-semibold">Isla</span>
                      <span className="rounded bg-[#4a5474] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase text-slate-700">
                        APP
                      </span>
                      <span className="text-[11px] text-slate-400">2:14 PM</span>
                    </div>

                    {/* Card attachment */}
                    <div className="mt-2 border-l-2 border-isla-cyan pl-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-[11px] font-bold text-white">
                          PL
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold">Pedro Lima</span>
                            <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase text-emerald-300">
                              Postou agora
                            </span>
                          </div>
                          <p className="text-[11.5px] text-slate-500">
                            Founder · Magnet · no seu funil
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 rounded-md bg-slate-50 p-3 text-[12.5px] leading-relaxed text-slate-700">
                        "Passei 2 anos achando que outbound era volume. Estava
                        errado. O que mudou o jogo foi qualificar antes de falar…"
                      </p>

                      <div className="mt-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Comentário sugerido
                        </p>
                        <p className="mt-1.5 rounded-md border border-slate-200 bg-slate-100/70 p-3 text-[12.5px] leading-relaxed text-slate-700">
                          Esse ponto sobre qualificar antes é subestimado
                          demais. A gente viu o reply rate dobrar quando parou
                          de tratar volume como estratégia. Curioso: quanto
                          tempo levou pra sentir a virada?
                        </p>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                          <ThumbsUp className="h-3.5 w-3.5" strokeWidth={2.25} />
                          Dar like
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-md bg-isla-cyan px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(0,191,255,0.6)]">
                          <MessageSquare className="h-3.5 w-3.5" strokeWidth={2.25} />
                          Aprovar comentário
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignalsSlackSection;