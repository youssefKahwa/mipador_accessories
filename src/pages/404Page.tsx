import { Link, useParams } from "react-router-dom";
import { MeridianMark } from "../components/MeridianMark";

const NotFound: React.FC = () => {
  const { lang } = useParams();

  const base = `/${lang || "fr"}`;

  return (
    <div className="relative min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-6 font-sans overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full max-w-2xl text-ink opacity-[0.04]">
          <MeridianMark />
        </div>
      </div>

      <main className="relative z-10 text-center">
        <h2 className="text-[120px] font-light leading-none text-ink/10 mb-4">
          404
        </h2>

        <h3 className="text-2xl md:text-3xl font-normal text-ink mb-4">
          This path wasn't chosen with intention.
        </h3>

        <p className="text-ink/70 max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to={base}
          className="inline-block bg-chrome text-[#F7F7F7] px-10 py-3 text-sm rounded-sm"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
