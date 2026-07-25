import React, { useState } from "react";
import { motion } from "framer-motion";
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

        {/* Call to Action */}
        <Shell className="mt-8">
          <div
            className={`grid w-full rounded-xl py-7 md:py-12 ${
              theme === "dark"
                ? "bg-[#232336]/30 text-[#f3f2f9]"
                : "bg-[#e9e6fa] text-[#18181b]"
            }`}
          >
            <div className="mx-auto grid w-[85%] md:grid-cols-2 md:gap-4">
              <div className="flex items-center justify-center">
                <h2
                  className="mb-3 font-bold md:font-black"
                  style={{ fontSize: "clamp(20px, 3vw, 100px)" }}
                >
                  Ready to go live with your dream?
                </h2>
              </div>

              <div>
                <p
                  className="mb-6 font-semibold"
                  style={{ fontSize: "clamp(15px, 2vw, 20px)" }}
                >
                  I'm excited to help bring your dream project to life! I'm ready
                  to collaborate and help you make the most of your web presence.
                </p>
                <a
                  href="mailto:iyegeresuccess@gmail.com"
                  className="inline-block bg-[#aab2d1] px-4 py-2 text-sm font-semibold text-[#18181b] shadow-md transition-all duration-200 hover:bg-[whitesmoke] hover:text-[#18181b]"
                >
                  Collab with ISK
                </a>
              </div>
            </div>
          </div>
        </Shell>
      </main>
    </Layout>
  );
};

export default WorkPage;
