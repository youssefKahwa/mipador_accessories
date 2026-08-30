const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-frost font-sans text-ink antialiased">
      <main className="max-w-5xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">

          {/* Left sticky */}
          <div className="md:col-span-4 md:sticky top-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/65 mb-6">
              Mipador Accessories · Returns
            </p>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-8 text-ink">
              Refunds &
              <br />
              <span className="text-ink/65 font-light italic">
                Exchanges
              </span>
            </h1>
            <p className="text-ink/65 font-light text-sm leading-relaxed">
              Every Mipador Accessories watch is tested with care and intention.
              If something isn't right, we'll make it right.
            </p>
          </div>

          {/* Right content */}
          <div className="md:col-span-8 space-y-4">

            {/* Main block */}
            <div className="bg-cloud p-10 md:p-16 rounded-3xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-6">
                The return window
              </p>
              <p className="text-3xl font-black text-ink tracking-tight leading-snug mb-6">
                7 days to decide.
                <br />
                <span className="text-ink/65 font-light italic text-2xl">
                  No pressure.
                </span>
              </p>
              <p className="text-ink/65 font-light leading-relaxed text-sm">
                If your watch doesn't feel right on your wrist, return it within
                7 days of delivery — unworn, in its original packaging.
                Precision movements deserve careful handling both ways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-ink/8 rounded-xl p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-4">
                  Exchange
                </p>
                <p className="text-ink/65 text-sm font-light leading-relaxed">
                  The simplest path is to return your watch and place a new order
                  for the one that truly belongs on your wrist.
                </p>
              </div>
              <div className="bg-surface border border-ink/8 rounded-xl p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/65 mb-4">
                  Refund
                </p>
                <p className="text-ink/65 text-sm font-light leading-relaxed">
                  Once we receive and inspect the watch, your refund is processed
                  to the original payment method within 10 business days.
                </p>
              </div>
            </div>

            {/* Contact block */}
            <div className="bg-chrome text-white p-10 rounded-3xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-4">
                Need help?
              </p>
              <p className="text-white/60 text-sm font-light mb-6">
                Write to us and we'll respond within 24 hours.
              </p>
              <a
                href="mailto:mipadorofficial@gmail.com"
                className="text-white font-black text-sm uppercase tracking-widest border-b border-white/30 hover:border-white transition-colors pb-0.5"
              >
                mipadorofficial@gmail.com
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;