import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projectsData";
import { indexLabel, statusOf, type Tone } from "../../lib/work";
import { MetaLabel, Plate, StatusTag } from "./primitives";

/**
 * One entry in the work index.
 *
 * Desktop is deliberately sparse - number, title, state, discipline - because
 * the imagery arrives under the cursor instead. Below lg there is no hover, so
 * the row carries its own plate and the entry reads as a full tile.
 */
export default function IndexRow({
  project,
  position,
  tone: t,
  onPreview,
  onClearPreview,
}: {
  project: Project;
  position: number;
  tone: Tone;
  onPreview: () => void;
  onClearPreview: () => void;
}) {
  const status = statusOf(project);

  /* Titles run from "Packa" to "react-native-lossless-trim". A single clamp
     would either shrink the short ones or overflow the long ones, so the ramp
     steps down once a title is long enough to need it. */
  const titleSize =
    project.title.length > 22
      ? "text-[clamp(19px,3vw,38px)]"
      : project.title.length > 14
      ? "text-[clamp(24px,4vw,46px)]"
      : "text-[clamp(28px,5vw,60px)]";

  return (
    <li className={`border-t ${t.rule} last:border-b`}>
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`${project.title} - ${project.category}`}
        onMouseEnter={onPreview}
        onFocus={onPreview}
        onMouseLeave={onClearPreview}
        onBlur={onClearPreview}
        className="group relative block"
      >
        {/* Hover wipe. Grows from the baseline so the rule stays the anchor. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100 ${t.inset}`}
        />

        <div className="relative flex flex-col gap-5 px-1 py-6 md:px-3 lg:flex-row lg:items-center lg:gap-10 lg:py-7">
          <MetaLabel className={`tnum w-10 shrink-0 ${t.accent}`}>
            {indexLabel(position)}
          </MetaLabel>

          <h2
            className={`font-display leading-[0.95] transition-transform duration-500 ease-editorial lg:group-hover:translate-x-3 ${titleSize}`}
          >
            {project.title}
          </h2>

          {/* Plate: the whole point of the row on a touch screen. */}
          <div className="lg:hidden">
            <Plate
              src={project.image}
              alt={`${project.title} - ${project.category} project by Iyegere Success Karboloo`}
              tone={t}
              ratio="aspect-[16/10]"
            />
          </div>

          <div className="flex items-center gap-5 lg:ml-auto lg:gap-8">
            {status && <StatusTag status={status} tone={t} />}
            <MetaLabel className={`${t.dim} lg:min-w-[7.5rem] lg:text-right`}>
              {project.category}
            </MetaLabel>
            <FiArrowUpRight
              aria-hidden
              className={`ml-auto shrink-0 text-xl transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 lg:ml-0 ${t.dim}`}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
