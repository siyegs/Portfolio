import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import projectsData from "../data/projectsData";
import { LineReveal, MetaLabel, Shell } from "../components/work/primitives";
import { tone } from "../lib/work";

interface WorkPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
}

/* Set edge to edge rather than at a fixed size, so the masthead fills the
   viewport at every width. The face is very wide, so four letters at 21vw
   still leave room for the gaps justify-between distributes. */
const MASTHEAD = ["W", "O", "R", "K"];

const WorkPage: React.FC<WorkPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  const navigate = useNavigate();
  const t = tone(theme);

  const disciplines = Array.from(new Set(projectsData.map((p) => p.category)));

  const renderProjectCard = (proj: (typeof projectsData)[0]) => (
    <div
      key={proj.title}
      className={`flex flex-col items-center mx-auto transition-all duration-200`}
    >
      {/* Placeholder Thumbnail*/}
      <div
        className={`relative flex items-center justify-center mb-4 p-6 rounded-lg ${
          t.inset
        } sm:h-[200px] sm:w-[280px] md:h-[240px] md:w-[320px] lg:w-[290px] xl:w-[350px] 2xl:w-[430px] hover:scale-95 transition-all duration-200`}
      >
        {proj.image ? (
          <img
            src={proj.image}
            alt={`${proj.title} - ${proj.category} project by Iyegere Success Karboloo`}
            className={`object-cover w-full h-full cursor-pointer ${proj.curveImg ? 'rounded-md' : ''}`}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          />
        ) : (
          <span>{proj.title[0]}</span>
        )}

        {(proj.ongoing || proj.underMaintenance) && (
          <span className="absolute left-4 top-3 rounded bg-[black]/70 px-2 py-1 text-xs font-semibold text-white">
            <span
              className={`mr-1 inline-block h-2 w-2 animate-pulse rounded-full align-middle ${
                proj.ongoing ? "bg-green-600" : "bg-red-600"
              }`}
            />
            {proj.ongoing ? "Ongoing" : "Under Maintenance"}
          </span>
        )}
      </div>

      {/* Project Info - centered below image */}
      <div className="px-[3px] md:px-0 w-full flex flex-col mb-10">
        <p
          className={`font-semibold flex items-center gap-1 cursor-pointer mb-1 text-center hover:transition-all hover:duration-500 hover:ease-in-out w-fit`}
          style={{ fontSize: "clamp(19px, 2vw, 34px" }}
          onClick={() => navigate(`/projects/${proj.slug}`)}
        >
          {proj.title}
        </p>
      </div>
    </div>
  );

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

        {/* Projects List */}
        <Shell className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 md:gap-9 lg:grid-cols-3">
            {projectsData.map(renderProjectCard)}
          </div>
        </Shell>

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
