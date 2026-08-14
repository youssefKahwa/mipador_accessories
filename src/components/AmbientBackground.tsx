const AmbientBackground = () => {
  return (
    <>
      <style>{`
        @keyframes breathe1 {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes breathe2 {
          0%, 100% { opacity: 0.5; transform: scale(1.1); }
          50% { opacity: 0.8; transform: scale(1); }
        }
        @keyframes breathe3 {
          0%, 100% { opacity: 0.4; transform: scale(1) translateY(0px); }
          50% { opacity: 0.7; transform: scale(1.08) translateY(-20px); }
        }
        .amb-orb1 { animation: breathe1 12s ease-in-out infinite; }
        .amb-orb2 { animation: breathe2 16s ease-in-out infinite; }
        .amb-orb3 { animation: breathe3 20s ease-in-out infinite; }
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
        {/* Top-left gold orb */}
        <div
          className="amb-orb1"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,146,42,0.1) 0%, rgba(201,146,42,0) 70%)",
          }}
        />

        {/* Bottom-right walnut orb */}
        <div
          className="amb-orb2"
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(61,26,18,0.07) 0%, rgba(61,26,18,0) 70%)",
          }}
        />

        {/* Center warm glow */}
        <div
          className="amb-orb3"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,146,42,0.05) 0%, rgba(201,146,42,0) 70%)",
          }}
        />

        {/* Subtle grain — keeps flat color sections from feeling sterile */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/noise.svg')",
            opacity: 0.035,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </>
  );
};

export default AmbientBackground;
