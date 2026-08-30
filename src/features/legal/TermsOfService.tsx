const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-frost font-sans text-ink antialiased">
      <main className="max-w-2xl mx-auto px-8 py-32 md:py-48">

        <header className="mb-24">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-8">
            Mipador Accessories · Legal
          </p>
          <h1 className="text-5xl font-black tracking-tight leading-tight mb-8 text-ink">
            Terms of
            <br />
            <span className="text-ink/65 font-light italic">
              Service
            </span>
          </h1>
          <div className="h-px w-16 bg-champagne/40 mb-10" />
          <p className="text-ink/65 font-light leading-relaxed italic text-sm">
            "A watch shouldn't perform for you. It should just work."
            <span className="not-italic block mt-1 text-ink/65 text-xs">
              — Mipador Accessories
            </span>
          </p>
        </header>

        <article className="space-y-16">
          {[
            {
              label: "The relationship",
              body: "By visiting Mipador Accessories, you enter a space built on mutual respect — for precision, for honest craft, and for the people who value both. These terms exist not as a wall between us, but as a shared understanding.",
            },
            {
              label: "Our work",
              body: "Every design, photograph, and piece of brand language on this site belongs to Mipador Accessories. It was made slowly and with care. Unauthorized reproduction or commercial imitation breaks that trust — and we take it seriously.",
            },
            {
              label: "Your orders",
              body: "When you place an order, you're entering a direct relationship with us. We'll always communicate honestly about lead times, availability, and any delays. Regulated movements take time to test — we'll never rush what shouldn't be rushed.",
            },
            {
              label: "Limitation",
              body: "We stand behind everything we make. But we cannot be held responsible for damage caused by misuse, extreme conditions, or events outside normal daily wear. Our watches are built for real life — wear them that way.",
            },
            {
              label: "Evolution",
              body: "Mipador Accessories is a living brand. These terms may evolve as we do. When they change, we'll say so clearly — no fine print, no surprises.",
            },
          ].map((s, i) => (
            <div key={i} className="space-y-3 border-t border-ink/8 pt-10">
              <h2 className="text-[10px] font-black tracking-widest uppercase text-ink/65">
                {String(i + 1).padStart(2, "0")} / {s.label}
              </h2>
              <p className="text-ink/65 font-light leading-relaxed text-sm">
                {s.body}
              </p>
            </div>
          ))}

          <div className="pt-8">
            <p className="text-[10px] text-ink/65 tracking-widest uppercase">
              Last updated · 2025 · Mipador Accessories
            </p>
          </div>
        </article>

      </main>
    </div>
  );
};

export default TermsOfService;