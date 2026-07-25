import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "../App.css";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import {
  LineReveal,
  MetaLabel,
  Shell,
  useEntranceHoldSeconds,
} from "../components/work/primitives";
import { tone } from "../lib/work";

interface HomePageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
  setHoveredName: (name: string | null) => void;
}

const ROUTES = [
  { label: "Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const HomePage: React.FC<HomePageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
  setHoveredName,
}) => {
  const t = tone(theme);

  /* Zero on reloads; a short hold when the menu mounted this page early
     behind its panel, so the rails appear on the reveal, not before it. */
  const hold = useEntranceHoldSeconds();

  /* The name is the hero. Hovering it swells the custom cursor, which is the
     one interaction the whole site is built around. */
  const nameProps = (name: string) => ({
    onMouseEnter: () => setHoveredName(name),
    onMouseLeave: () => setHoveredName(null),
    className: `${t.accent} cursor-default`,
  });

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO isHome title="Iyegere Success Karboloo - Full-Stack Engineer" path="/" />

      {/* Visually hidden, crawler- and screen-reader-friendly summary. The
          visible hero is split into styled spans, so this gives search engines
          a clean sentence. */}
      <p className="sr-only">
        Iyegere Success Karboloo is a Full-Stack Engineer based in Nigeria,
        building web, mobile and backend products with React, React Native,
        Next.js, TypeScript and Node.js.
      </p>

      <main
        className={`relative z-[1] flex min-h-screen flex-col justify-between pb-10 pt-24 md:pb-12 md:pt-28 ${t.page}`}
      >
        {/* Top meta rail */}
        <Shell>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + hold }}
            className={`flex items-center justify-between gap-4 border-b pb-3 ${t.rule}`}
          >
            <MetaLabel className={t.dim}>Full-Stack Engineer</MetaLabel>
            <MetaLabel className={t.dim}>Nigeria · Remote</MetaLabel>
          </motion.div>
        </Shell>

        {/* The name */}
        <Shell className="flex flex-1 items-center py-10">
          <h1 className="w-full font-display leading-[0.88]">
            <LineReveal delay={0.05} className="text-[clamp(15px,2.6vw,30px)]">
              <span className="stroked-text text-transparent">HEY, I'M</span>
            </LineReveal>

            <LineReveal delay={0.12} className="text-[clamp(38px,11.5vw,10rem)]">
              <span {...nameProps("IYEGERE")}>IYEGERE</span>
            </LineReveal>

            <LineReveal delay={0.19} className="text-[clamp(38px,11.5vw,10rem)]">
              <span {...nameProps("SUCCESS")}>SUCCESS</span>
            </LineReveal>

            <LineReveal delay={0.28} className="mt-3 text-[clamp(15px,2.6vw,30px)]">
              <span className="stroked-text text-transparent">
                BUT YOU CAN CALL ME{" "}
              </span>
              <span {...nameProps("KARBOLOO")}>KARBOLOO</span>
            </LineReveal>
          </h1>
        </Shell>

        {/* Bottom rail: the statement on the left, the routes on the right. */}
        <Shell>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 + hold, ease: EASE }}
            className={`grid gap-8 border-t pt-6 md:grid-cols-12 ${t.rule}`}
          >
            <p
              className={`max-w-read text-[clamp(15px,1.8vw,19px)] leading-relaxed md:col-span-6 ${t.body}`}
            >
              I build applications and services that help businesses scale, end
              to end: interface, API, database and the payments in between.
            </p>

            <nav className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-5 md:col-start-8 md:justify-end">
              {ROUTES.map((route, i) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`group inline-flex items-baseline gap-2 transition-colors duration-300 ${
                    t.isDark ? "hover:text-accent" : "hover:text-accent-warm"
                  }`}
                >
                  <MetaLabel className={`tnum ${t.faint}`}>
                    {String(i + 1).padStart(2, "0")}
                  </MetaLabel>
                  <span className="text-[clamp(16px,2vw,20px)] font-medium">
                    {route.label}
                  </span>
                  <FiArrowUpRight
                    aria-hidden
                    className="translate-y-[2px] transition-transform duration-500 ease-editorial group-hover:-translate-y-0 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>
        </Shell>
      </main>
    </Layout>
  );
};

export default HomePage;
