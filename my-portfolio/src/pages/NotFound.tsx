import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { FiArrowLeft } from "react-icons/fi";

interface NotFoundPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
  heading?: string;
  message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
  heading = "Page not found",
  message = "The page you are looking for does not exist or may have been moved. Let us get you back on track.",
}) => {
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO title={heading} noindex description={message} />
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-5 text-center ${
          isDark
            ? "bg-[#18181b]/90 text-[#f3f2f9]"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
        style={{ fontFamily: "Space Grotesk" }}
      >
        <div className="relative flex flex-col items-center">
          <p className="select-none text-[clamp(96px,22vw,190px)] font-black leading-none tracking-tighter opacity-[0.07]">
            404
          </p>
          <h1 className="-mt-7 text-2xl font-bold md:-mt-10 md:text-4xl">
            {heading}
          </h1>
        </div>

        <p
          className={`mt-4 max-w-md text-[15px] leading-relaxed ${
            isDark ? "text-[#f3f2f9]/65" : "text-[#18181b]/65"
          }`}
        >
          {message}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full bg-[#aab2d1] px-6 py-2.5 text-sm font-semibold text-[#18181b] transition hover:bg-[#e5e7eb]"
          >
            <FiArrowLeft /> Back Home
          </button>
          <button
            onClick={() => navigate("/projects")}
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/15 hover:bg-white/5"
                : "border-black/15 hover:bg-black/5"
            }`}
          >
            Browse Projects
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
