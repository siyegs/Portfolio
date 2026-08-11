import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { LineReveal, MetaLabel, Shell } from "../components/work/primitives";
import { tone } from "../lib/work";

interface NotFoundPageProps {
  theme: string;
  toggleTheme: () => void;
  heading?: string;
  message?: string;
}

const DESTINATIONS = [
  { label: "Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Home", path: "/" },
];

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  theme,
  toggleTheme,
  heading = "Page not found",
  message = "The page you are looking for does not exist or may have been moved. Let us get you back on track.",
}) => {
  const t = tone(theme);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <SEO title={heading} noindex description={message} />

      <main
        className={`relative z-[1] min-h-screen w-full overflow-x-hidden pb-24 pt-28 md:pt-36 ${t.page}`}
      >
        <Shell>
          <div className={`flex items-center justify-between gap-4 border-b pb-4 ${t.rule}`}>
            <MetaLabel className={t.dim}>Error</MetaLabel>
            <MetaLabel className={`tnum ${t.dim}`}>404</MetaLabel>
          </div>

          <h1
            aria-label={heading}
            className="mt-6 flex w-full justify-between font-display text-[min(29vw,17rem)] leading-[0.8]"
          >
            {["4", "0", "4"].map((digit, i) => (
              <LineReveal key={i} delay={0.08 + i * 0.08}>
                <span aria-hidden>{digit}</span>
              </LineReveal>
            ))}
          </h1>

          <div className={`mt-8 grid gap-8 border-t pt-6 md:grid-cols-12 ${t.rule}`}>
            <div className="md:col-span-6">
              <p className="text-[clamp(19px,2.6vw,28px)] leading-snug">{heading}</p>
              <p
                className={`mt-4 max-w-read text-[15px] leading-relaxed md:text-base ${t.body}`}
              >
                {message}
              </p>
            </div>

            <nav className="md:col-span-4 md:col-start-9">
              <MetaLabel className={t.faint}>Try one of these</MetaLabel>
              <ul className="mt-3">
                {DESTINATIONS.map((destination) => (
                  <li key={destination.path} className={`border-t ${t.rule} last:border-b`}>
                    <Link
                      to={destination.path}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="text-[15px] md:text-base">
                        {destination.label}
                      </span>
                      <FiArrowUpRight
                        aria-hidden
                        className={`transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 ${t.faint}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Shell>
      </main>
    </Layout>
  );
};

export default NotFoundPage;
