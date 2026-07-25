import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import projectsData from "../data/projectsData";
import HoverPreview, { type Preview } from "../components/work/HoverPreview";
import IndexRow from "../components/work/IndexRow";
import { LineReveal, MetaLabel, Shell } from "../components/work/primitives";
import { indexLabel, tone } from "../lib/work";

interface WorkPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
}

/* Set edge to edge rather than at a fixed size, so the masthead fills the
   viewport at every width. The face is very wide, so four letters at 21vw
   still leave room for the gaps justify-between distributes. */
const MASTHEAD = ["W", "O", "R", "K"];

const ALL = "All";

/* The closing band. Two copies of this run in the track, which is what makes
   the -50% keyframe loop seamlessly. */
const MARQUEE = ["LET'S BUILD SOMETHING", "-", "AVAILABLE FOR WORK", "-"];

const WorkPage: React.FC<WorkPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  const t = tone(theme);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [active, setActive] = useState(ALL);

  const disciplines = Array.from(new Set(projectsData.map((p) => p.category)));
  const filters = [ALL, ...disciplines];

  /* Carry the original position through the filter so a project keeps its
     register number: 06 is Packa whether or not the list is filtered. */
  const shown = projectsData
    .map((project, i) => ({ project, i }))
    .filter(({ project }) => active === ALL || project.category === active);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO
        title="Projects"
        path="/projects"
        description="Selected projects by Iyegere Success Karboloo - influencer marketing apps, ERPs, e-commerce platforms and real-time products across web, mobile and backend."
      />
      <main
        className={`relative z-[1] min-h-screen w-full overflow-x-hidden pb-24 pt-28 md:pt-36 ${t.page}`}
      >
        {/* Masthead */}
        <Shell>
          <div className={`flex items-end justify-between gap-6 border-b pb-4 ${t.rule}`}>
            <MetaLabel className={t.dim}>Selected work</MetaLabel>
            <MetaLabel className={`tnum ${t.dim}`}>
              {String(projectsData.length).padStart(2, "0")} entries
            </MetaLabel>
          </div>

          <h1
            aria-label="Work"
            className="mt-6 flex w-full justify-between font-display text-[min(21vw,13rem)] leading-[0.8]"
          >
            {MASTHEAD.map((letter, i) => (
              <LineReveal key={letter} delay={0.08 + i * 0.07}>
                <span aria-hidden>{letter}</span>
              </LineReveal>
            ))}
          </h1>

          <div className={`mt-8 grid gap-8 border-t pt-6 md:grid-cols-12 ${t.rule}`}>
            <p
              className={`text-[clamp(16px,2vw,20px)] leading-relaxed md:col-span-6 lg:col-span-5 ${t.body}`}
            >
              Products I have built and contributed to, across web, mobile and
              backend. Most are live: in the app stores, on npm, or running a
              business today.
            </p>

            <dl className="md:col-span-4 md:col-start-9">
              <dt>
                <MetaLabel className={t.faint}>Disciplines</MetaLabel>
              </dt>
              <dd className={`mt-3 text-[15px] leading-relaxed ${t.body}`}>
                {disciplines.join(" · ")}
              </dd>
            </dl>
          </div>
        </Shell>

        {/* Filter register. Numbers stay tied to the full list, so an entry
            keeps its identity no matter which discipline is showing. */}
        <Shell className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={isActive}
                  className={`meta-label relative pb-2 transition-colors duration-300 ${
                    isActive
                      ? ""
                      : `${t.faint} ${
                          t.isDark ? "hover:text-paper/80" : "hover:text-ink/80"
                        }`
                  }`}
                >
                  {filter}
                  {isActive && (
                    <motion.span
                      layoutId="work-filter-rule"
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-px ${t.accentFill}`}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}

            <MetaLabel className={`tnum ml-auto ${t.faint}`}>
              {String(shown.length).padStart(2, "0")} shown
            </MetaLabel>
          </div>
        </Shell>

        {/* The index */}
        <Shell className="mt-6">
          <motion.ul
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {shown.map(({ project, i }) => (
              <IndexRow
                key={project.slug}
                project={project}
                position={i}
                tone={t}
                onPreview={() =>
                  setPreview({
                    src: project.image,
                    alt: project.title,
                    caption: `${indexLabel(i)} / ${project.category}`,
                  })
                }
                onClearPreview={() => setPreview(null)}
              />
            ))}
          </motion.ul>
        </Shell>

        <HoverPreview preview={preview} tone={t} />

        {/* Closing statement. Full bleed, so it breaks out of the shell. */}
        <Link
          to="/contact"
          aria-label="Start a project"
          className={`group mt-20 block border-y py-8 md:mt-28 md:py-12 ${t.rule}`}
        >
          <div className="marquee-mask">
            <div
              className="marquee-track"
              style={{ animationDuration: "34s" }}
              aria-hidden
            >
              {[0, 1].map((copy) => (
                <span key={copy} className="flex shrink-0 items-center">
                  {MARQUEE.map((phrase) => (
                    <span
                      key={phrase}
                      className={`stroked-text whitespace-nowrap px-6 font-display text-[13vw] leading-[0.9] text-transparent transition-colors duration-700 md:px-10 ${
                        t.isDark
                          ? "group-hover:text-accent"
                          : "group-hover:text-accent-warm"
                      }`}
                    >
                      {phrase}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </Link>

        <Shell className="mt-8">
          <div className="grid gap-6 md:grid-cols-12">
            <p
              className={`text-[clamp(16px,2vw,19px)] leading-relaxed md:col-span-5 ${t.body}`}
            >
              Have something you want built, or an existing product that needs
              someone to own it end to end? Tell me what you are working on.
            </p>

            <div className="md:col-span-4 md:col-start-9">
              <MetaLabel className={t.faint}>Start here</MetaLabel>
              <a
                href="mailto:iyegeresuccess@gmail.com"
                className={`group mt-3 flex items-center justify-between gap-4 border-b pb-2 transition-colors duration-300 ${t.rule}`}
              >
                <span className="text-[15px] md:text-base">
                  iyegeresuccess@gmail.com
                </span>
                <FiArrowUpRight
                  aria-hidden
                  className="shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </Shell>
      </main>
    </Layout>
  );
};

export default WorkPage;
