import Link from "next/link";

const discovery = [
  { n: "01", t: "Onde sua experiência está mais vulnerável" },
  { n: "02", t: "Qual parte da jornada precisa de atenção" },
  { n: "03", t: "O que depende demais de pessoas e improviso" },
  { n: "04", t: "Se sua empresa está criando motivos para o cliente voltar" },
  { n: "05", t: "Qual deveria ser seu próximo foco de 90 dias" },
];

const audience = [
  "donos e fundadores",
  "gestores",
  "líderes de atendimento",
  "profissionais de experiência do cliente",
  "gestores comerciais",
  "responsáveis pela jornada do cliente",
  "consultores e profissionais que trabalham com negócios",
];

export default function Home() {
  return (
    <main className="relative min-h-screen star-field">
      <section className="relative overflow-hidden mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/10 blur-3xl" aria-hidden />
        <div className="absolute left-1/3 top-10 h-40 w-40 rounded-full bg-gold/5 blur-3xl" aria-hidden />
        <p className="text-electric text-[11px] tracking-[0.3em] uppercase font-medium">
          Magia dos Detalhes
        </p>
        <h1 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] text-cream">
          Você acha que sua empresa entrega uma boa experiência.
          <br />
          <span className="text-gold">Mas... entrega mesmo?</span>
        </h1>
        <p className="mt-7 text-cream/70 text-base sm:text-lg max-w-2xl leading-relaxed">
          Responda algumas perguntas e descubra onde sua empresa pode estar perdendo
          clareza, consistência, encantamento ou oportunidades de recompra.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-cream/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          Inspirado em princípios de marcas que encantam — não em fórmulas prontas.
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center rounded-full bg-gold text-navy-deep font-semibold px-7 py-4 text-sm tracking-wide hover:bg-cream transition-colors"
          >
            FAZER O RAIO-X
          </Link>
          <span className="text-cream/50 text-sm">
            Leva aproximadamente 5–7 minutos.
          </span>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl text-cream/60 text-xs sm:text-sm">
          <div><span className="text-gold font-display text-2xl sm:text-3xl">22</span><br/>perguntas</div>
          <div><span className="text-gold font-display text-2xl sm:text-3xl">5</span><br/>blocos da jornada</div>
          <div><span className="text-gold font-display text-2xl sm:text-3xl">90</span><br/>dias de foco</div>
        </div>
      </section>

      <section className="relative border-t border-white/5 bg-navy-mid/40">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="font-display text-3xl sm:text-4xl text-cream max-w-3xl">
            Experiência não é um departamento.
            <br />
            <span className="text-electric">É tudo que o cliente atravessa.</span>
          </h2>
          <p className="mt-6 text-cream/70 max-w-2xl leading-relaxed">
            A experiência começa muito antes do primeiro “oi” — e continua muito depois
            do “obrigado pela compra”. Ela é cada detalhe que o cliente percebe, sente e
            precisa atravessar até chegar ao resultado que comprou.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { n: "01", t: "Observe", d: "o que o cliente percebe — mesmo quando ninguém comenta." },
              { n: "02", t: "Organize", d: "o que precisa acontecer, na ordem certa, sempre." },
              { n: "03", t: "Repita", d: "o que funcionou, até virar padrão — não exceção." },
            ].map((s) => (
              <div key={s.n} className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
                <span className="text-gold font-display text-2xl">{s.n}</span>
                <h3 className="mt-3 text-cream text-lg">{s.t}</h3>
                <p className="mt-2 text-cream/60 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <h2 className="font-display text-3xl sm:text-4xl text-cream">
          O que você vai descobrir
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discovery.map((d) => (
            <div key={d.n} className="border border-white/10 rounded-2xl p-5 bg-white/[0.02] card-hover">
              <span className="text-electric text-xs tracking-widest">{d.n}</span>
              <p className="mt-3 text-cream text-[15px] leading-snug">{d.t}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center rounded-full border border-gold/60 text-gold font-semibold px-7 py-4 text-sm tracking-wide hover:bg-gold hover:text-navy-deep transition-colors"
          >
            QUERO DESCOBRIR
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 bg-navy-mid/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-display text-3xl sm:text-4xl text-cream">Para quem é?</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {audience.map((a) => (
              <li key={a} className="flex items-start gap-3 text-cream/75">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-14 text-center text-cream/50 text-sm">
        <p className="italic font-display text-cream/70 max-w-2xl mx-auto text-base sm:text-lg">
          “A experiência que vira história é a que o cliente sente vontade de contar
          pra outra pessoa.”
        </p>
        <p className="mt-6">Phillipe Lontra · Idealizador da Magia dos Detalhes</p>
        <p className="mt-2">
          <a className="hover:text-electric" href="https://instagram.com/phillipelontra" target="_blank" rel="noreferrer">@phillipelontra</a>
        </p>
      </footer>
    </main>
  );
}
