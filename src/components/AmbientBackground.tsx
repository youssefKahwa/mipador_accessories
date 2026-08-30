const AmbientBackground = () => {
  return (
    <>
      <style>{`
        @keyframes breathe1 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.08); }
        }
        .amb-orb1 { animation: breathe1 16s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Faint drafting grid — instrument-panel texture instead of a
            lifestyle-boutique color glow */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.4]" />

        {/* One restrained sapphire glow, top-right — a hint of light, not a mood */}
        <div
          className="amb-orb1"
          style={{
            position: "absolute",
            top: "-15%",
            right: "-12%",
            width: "46vw",
            height: "46vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(30,63,160,0.08) 0%, rgba(30,63,160,0) 70%)",
          }}
        />

        {/* Subtle grain — keeps flat color sections from feeling sterile */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/noise.svg')",
            opacity: 0.03,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </>
  );
};

export default AmbientBackground;
