import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projectsData";
import { indexLabel, type Tone } from "../../lib/work";
import { MetaLabel, Plate } from "./primitives";

/**
 * The end of a project page hands straight to the next entry.
 *
 * The page previously closed on a three-tile "More projects" grid, which asked
 * the reader to choose. One large, unambiguous next step reads better and
 * keeps the register order intact.
 */
export default function NextProject({
  project,
  position,
  tone: t,
}: {
  project: Project;
  position: number;
  tone: Tone;
}) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`Next project: ${project.title}`}
      className={`group relative block border-t ${t.rule}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100 ${t.inset}`}
      />

      <div className="relative flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-10 md:py-10">
        <div className="min-w-0 flex-1">
          <MetaLabel className={t.faint}>Next project</MetaLabel>
          <div className="mt-3 flex items-baseline gap-4 md:gap-6">
            <MetaLabel className={`tnum shrink-0 ${t.accent}`}>
              {indexLabel(position)}
            </MetaLabel>
            <h2 className="font-display text-[clamp(24px,4.6vw,52px)] leading-[0.95] transition-transform duration-500 ease-editorial md:group-hover:translate-x-3">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="w-full shrink-0 md:w-64">
          <Plate
            src={project.image}
            alt={project.title}
            tone={t}
            ratio="aspect-[16/10]"
          />
        </div>

        <FiArrowUpRight
          aria-hidden
          className={`hidden shrink-0 text-2xl transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 md:block ${t.dim}`}
        />
      </div>
    </Link>
  );
}
