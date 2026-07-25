import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "../../data/projectsData";
import { primaryLink, type Tone } from "../../lib/work";
import { MetaLabel } from "./primitives";

/**
 * Where a visitor can go next for this project.
 *
 * The precedence is unchanged from the original page: role-scoped demos win
 * for RBAC products, then the app stores, then a single live link, then a
 * demo request, and finally the coming-soon state. Only the treatment changed
 * - hard-edged blocks and hairlines instead of pills and rounded cards.
 */
export default function ProjectActions({
  project,
  tone: t,
}: {
  project: Project;
  tone: Tone;
}) {
  const solid = `inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold transition-colors duration-300 ${t.invert} ${t.invertHover}`;
  const outline = `inline-flex items-center gap-2.5 border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${t.rule} ${
    t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"
  }`;

  if (project.hasRBAC) {
    return (
      <div>
        <MetaLabel className={t.faint}>View the live demo as</MetaLabel>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.demoRolesURL?.map((role) => (
            <a
              key={role.role}
              href={role.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 border px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                t.rule
              } ${t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"}`}
            >
              {role.role}
              <FiArrowUpRight
                aria-hidden
                className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (project.androidDownloadUrl || project.iosAppStoreUrl) {
    return (
      <div className="flex flex-wrap gap-3">
        {project.iosAppStoreUrl && (
          <a
            href={project.iosAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${project.title} on the App Store`}
            className={outline}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
        )}

        {project.androidDownloadUrl && (
          <a
            href={project.androidDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get ${project.title} on Google Play`}
            className={outline}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M3.18 2.04C3.06 2.17 3 2.37 3 2.63v18.74c0 .26.06.46.18.59l.03.03L13.4 12.3v-.07-.07L3.21 2.01l-.03.03z" fill="#4285F4" />
              <path d="M16.81 15.72l-3.41-3.42v-.07-.07l3.41-3.42.08.04 4.03 2.29c1.15.65 1.15 1.72 0 2.38l-4.03 2.29-.08.04z" fill="#FBBC04" />
              <path d="M16.89 15.68L13.4 12.16 3.18 22.37c.38.4 1 .45 1.71.05l11.99-6.73z" fill="#EA4335" />
              <path d="M16.89 8.58L4.89 1.85c-.7-.4-1.33-.35-1.71.05L13.4 12.16l3.49-3.58z" fill="#34A853" />
            </svg>
            Google Play
          </a>
        )}
      </div>
    );
  }

  const link = primaryLink(project);
  if (link) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${solid}`}
      >
        {link.label}
        <FiArrowUpRight
          aria-hidden
          className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    );
  }

  if (project.requestDemoEmail) {
    return (
      <a href={`mailto:${project.requestDemoEmail}`} className={`group ${solid}`}>
        Request a live demo
        <FiArrowUpRight
          aria-hidden
          className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    );
  }

  return (
    <span className={`inline-flex items-center border px-5 py-3 ${t.rule}`}>
      <MetaLabel className={t.dim}>Coming soon</MetaLabel>
    </span>
  );
}
