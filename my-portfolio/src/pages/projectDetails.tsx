import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../data/projectsData";
import Layout from "../components/Layout";
import NotFoundPage from "./NotFound";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";

interface ProjectDetailsPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  const { slugTextId } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slugTextId);
  const isDark = theme === "dark";

  document.title = project
    ? `${project.title} | ISK`
    : "Project Not Found | ISK";

  if (!project) {
    return (
      <NotFoundPage
        theme={theme}
        toggleTheme={toggleTheme}
        hoveredName={hoveredName}
        heading="Project not found"
        message="The project you are looking for does not exist or may have been moved. Let us get you back to the work."
      />
    );
  }

  const isLive =
    !!project.iosAppStoreUrl ||
    !!project.androidDownloadUrl ||
    (!!project.url && project.url.length > 0);

  const status = project.ongoing
    ? { label: "Ongoing", dot: "bg-green-500", pulse: true }
    : project.underMaintenance
    ? { label: "Under Maintenance", dot: "bg-red-500", pulse: true }
    : isLive
    ? { label: "Live", dot: "bg-emerald-500", pulse: false }
    : null;

  const moreProjects = projectsData
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const subtleBorder = isDark ? "border-white/10" : "border-black/10";
  const cardBg = isDark ? "bg-[#222530]" : "bg-[#e5e6ef]";
  const bodyText = isDark ? "text-[#f3f2f9]/85" : "text-[#18181b]/85";
  const storePill = isDark
    ? "border-white/[0.12] bg-white/[0.05] text-white hover:border-white/25"
    : "border-[#18181b]/15 bg-[#18181b] text-white hover:bg-black";

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <div
        className={`min-h-screen flex flex-col items-center px-5 lg:px-20 py-16 pt-32 ${
          isDark
            ? "bg-[#18181b]/90 text-[#f3f2f9]"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
        style={{ fontFamily: "Space Grotesk" }}
      >
        {/* Back */}
        <div className="w-full max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-base font-semibold hover:underline"
          >
            <FiArrowLeft /> Back to Projects
          </button>
        </div>

        {/* Header */}
        <header className="mt-10 w-full max-w-3xl mx-auto text-center">
          {status && (
            <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dot} ${
                  status.pulse ? "animate-pulse" : ""
                }`}
              />
              {status.label}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h1>

          {project.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-[#f3f2f9]/80"
                      : "border-black/10 bg-black/[0.03] text-[#18181b]/80"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Primary actions (RBAC projects use the demo-role chips below instead) */}
          {!project.hasRBAC && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {project.androidDownloadUrl || project.iosAppStoreUrl ? (
              <div className="flex flex-wrap justify-center gap-3">
                {project.androidDownloadUrl && (
                  <a
                    href={project.androidDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${project.title} on Google Play`}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 transition-colors ${storePill}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                      <path d="M3.18 2.04C3.06 2.17 3 2.37 3 2.63v18.74c0 .26.06.46.18.59l.03.03L13.4 12.3v-.07-.07L3.21 2.01l-.03.03z" fill="#4285F4" />
                      <path d="M16.81 15.72l-3.41-3.42v-.07-.07l3.41-3.42.08.04 4.03 2.29c1.15.65 1.15 1.72 0 2.38l-4.03 2.29-.08.04z" fill="#FBBC04" />
                      <path d="M16.89 15.68L13.4 12.16 3.18 22.37c.38.4 1 .45 1.71.05l11.99-6.73z" fill="#EA4335" />
                      <path d="M16.89 8.58L4.89 1.85c-.7-.4-1.33-.35-1.71.05L13.4 12.16l3.49-3.58z" fill="#34A853" />
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[9px] font-medium uppercase tracking-wide text-white/50">
                        Get it on
                      </div>
                      <div className="-mt-0.5 text-sm font-bold">Google Play</div>
                    </div>
                  </a>
                )}

                {project.iosAppStoreUrl && (
                  <a
                    href={project.iosAppStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${project.title} on the App Store`}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 transition-colors ${storePill}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[9px] font-medium uppercase tracking-wide text-white/50">
                        Download on the
                      </div>
                      <div className="-mt-0.5 text-sm font-bold">App Store</div>
                    </div>
                  </a>
                )}
              </div>
            ) : project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#aab2d1] px-5 py-2.5 text-sm font-semibold text-[#18181b] transition hover:bg-[#e5e7eb]"
              >
                Visit Live Site <FiExternalLink />
              </a>
            ) : project.requestDemoEmail ? (
              <a
                href={`mailto:${project.requestDemoEmail}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#aab2d1] px-5 py-2.5 text-sm font-semibold text-[#18181b] transition hover:bg-[#e5e7eb]"
              >
                Request Live Demo
              </a>
            ) : (
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#aab2d1] px-5 py-2.5 text-sm font-semibold text-[#18181b]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span>Coming Soon</span>
              </div>
              )}
            </div>
          )}

          {project.hasRBAC && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
                View the live demo as
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {project.demoRolesURL?.map((role) => (
                  <a
                    key={role.role}
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-x-2 rounded-full border px-3 py-1 text-xs font-medium transition ${
                      isDark
                        ? "bg-[#1a1a22] text-[#aab2d1] border-[#333] hover:border-[#555]"
                        : "bg-[#f3f2f9] text-[#18181b] border-[#ccc] hover:border-[#999]"
                    }`}
                  >
                    {role.role} <FiExternalLink />
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero image */}
        <div className="relative mt-12 w-full max-w-5xl mx-auto">
          <div
            aria-hidden
            className={`pointer-events-none absolute -inset-2 rounded-[2rem] opacity-25 blur-3xl ${project.color}`}
          />
          <div
            className={`relative overflow-hidden rounded-2xl border transition-transform duration-300 hover:scale-[1.01] ${
              isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white/50"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="mx-auto max-h-[460px] w-full object-contain p-3 sm:p-5"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 w-full max-w-3xl mx-auto">
          <p className={`text-[clamp(16px,2.4vw,19px)] leading-relaxed ${bodyText}`}>
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-9">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
                Highlights
              </p>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${project.color}`}
                    />
                    <span className={`text-[15px] leading-relaxed ${bodyText}`}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* More projects */}
        {moreProjects.length > 0 && (
          <div className="mt-16 w-full max-w-5xl mx-auto">
            <div className={`border-t pt-8 ${subtleBorder}`}>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
                More projects
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {moreProjects.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => navigate(`/projects/${p.slug}`)}
                    className="group text-left"
                  >
                    <div
                      className={`mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl p-4 ${cardBg}`}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`h-full w-full object-cover transition-transform duration-200 group-hover:scale-95 ${
                          p.curveImg ? "rounded-md" : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm font-semibold group-hover:underline">
                      {p.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetailsPage;
