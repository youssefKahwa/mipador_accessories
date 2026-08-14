const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-cream font-sans text-espresso antialiased">
      <main className="max-w-5xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">

          {/* Left sticky */}
          <div className="md:col-span-4 md:sticky top-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-espresso/65 mb-6">
              Mipador · Returns
            </p>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-8 text-espresso">
              Refunds &
              <br />
              <span className="text-espresso/65 font-light italic">
                Exchanges
              </span>
            </h1>
            <p className="text-espresso/65 font-light text-sm leading-relaxed">
              Every Mipador piece is made with care and intention.
              If something isn't right, we'll make it right.
            </p>
          </div>

          {/* Right content */}
          <div className="md:col-span-8 space-y-4">

            {/* Main block */}
            <div className="bg-linen p-10 md:p-16 rounded-3xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-6">
                The return window
              </p>
              <p className="text-3xl font-black text-espresso tracking-tight leading-snug mb-6">
                14 days to decide.
                <br />
                <span className="text-espresso/65 font-light italic text-2xl">
                  No pressure.
                </span>
              </p>
              <p className="text-espresso/65 font-light leading-relaxed text-sm">
                If your piece doesn't feel right in your space, return it within
                14 days of delivery — unused, in its original packaging.
                Handcrafted objects deserve careful handling both ways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-espresso/8 rounded-xl p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-4">
                  Exchange
                </p>
                <p className="text-espresso/65 text-sm font-light leading-relaxed">
                  The simplest path is to return your piece and place a new order
                  for the one that truly belongs in your space.
                </p>
              </div>
              <div className="bg-white border border-espresso/8 rounded-xl p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-espresso/65 mb-4">
                  Refund
                </p>
                <p className="text-espresso/65 text-sm font-light leading-relaxed">
                  Once we receive and inspect the piece, your refund is processed
                  to the original payment method within 10 business days.
                </p>
              </div>
            </div>

            {/* Contact block */}
            <div className="bg-espresso text-white p-10 rounded-3xl text-center">
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