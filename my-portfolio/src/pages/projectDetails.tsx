import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import projectsData from "../data/projectsData";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NotFoundPage from "./NotFound";
import Gallery from "../components/work/Gallery";
import NextProject from "../components/work/NextProject";
import ProjectActions from "../components/work/ProjectActions";
import SpecRegister, { type Spec } from "../components/work/SpecRegister";
import {
  LineReveal,
  MetaLabel,
  Reveal,
  Shell,
  StatusTag,
} from "../components/work/primitives";
import { indexLabel, statusOf, tone } from "../lib/work";

const SITE_URL = "https://iyegeresk.web.app";

interface ProjectDetailsPageProps {
  theme: string;
  toggleTheme: () => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  theme,
  toggleTheme,
}) => {
  const { slugTextId } = useParams();
  const position = projectsData.findIndex((p) => p.slug === slugTextId);
  const project = position === -1 ? undefined : projectsData[position];
  const t = tone(theme);

  if (!project) {
    return (
      <NotFoundPage
        theme={theme}
        toggleTheme={toggleTheme}
        heading="Project not found"
        message="The project you are looking for does not exist or may have been moved. Let us get you back to the work."
      />
    );
  }

  const status = statusOf(project);

  /* Where a visitor can actually reach this project, stated plainly. */
  const availability = project.iosAppStoreUrl || project.androidDownloadUrl
    ? [project.iosAppStoreUrl && "App Store", project.androidDownloadUrl && "Google Play"]
        .filter(Boolean)
        .join(" · ")
    : project.hasRBAC
    ? "Role-scoped live demo"
    : project.url?.includes("npmjs.com")
    ? "Published on npm"
    : project.url?.includes("github.com")
    ? "Open source on GitHub"
    : project.url
    ? "Live on the web"
    : project.requestDemoEmail
    ? "Demo on request"
    : "Not yet public";

  const specs: Spec[] = [
    { label: "Discipline", value: project.category },
    ...(status ? [{ label: "State", value: status.label }] : []),
    { label: "Availability", value: availability },
    ...(project.tags.length ? [{ label: "Focus", value: project.tags.join(" · ") }] : []),
  ];

  /* Wrap around at the end of the register so the tour never dead-ends. */
  const next = projectsData[(position + 1) % projectsData.length];

  const metaDescription =
    project.description.length > 155
      ? `${project.description.slice(0, 152).trimEnd()}...`
      : project.description;

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <SEO
        title={project.title}
        path={`/projects/${project.slug}`}
        description={metaDescription}
        image={
          project.image?.startsWith("/") ? `${SITE_URL}${project.image}` : undefined
        }
      />
      <main
        className={`relative z-[1] min-h-screen w-full overflow-x-hidden pb-24 pt-28 md:pt-36 ${t.page}`}
      >
        {/* Masthead */}
        <Shell>
          <div className={`flex items-center justify-between gap-6 border-b pb-4 ${t.rule}`}>
            <Link
              to="/projects"
              className={`group inline-flex items-center gap-2 transition-colors duration-300 ${t.dim} ${
                t.isDark ? "hover:text-paper" : "hover:text-ink"
              }`}
            >
              <FiArrowLeft
                aria-hidden
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <MetaLabel>Index</MetaLabel>
            </Link>

            <MetaLabel className={`tnum ${t.faint}`}>
              {indexLabel(position)} / {project.category}
            </MetaLabel>
          </div>

          <h1 className="mt-7 font-display text-[clamp(30px,7.4vw,104px)] leading-[0.9]">
            <LineReveal>
              <span className="block break-words">{project.title}</span>
            </LineReveal>
          </h1>

          {/* State and the primary action, on one hairline strip. */}
          <div
            className={`mt-8 flex flex-col gap-5 border-t pt-6 md:flex-row md:items-center md:justify-between ${t.rule}`}
          >
            <ProjectActions project={project} tone={t} />
            {status && <StatusTag status={status} tone={t} />}
          </div>
        </Shell>

        {/* Hero plate. Full bleed: the work should be the widest thing here. */}
        <Reveal className="mt-12 md:mt-16">
          <div className={`border-y ${t.rule} ${t.inset}`}>
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} by Iyegere Success Karboloo`}
              className="mx-auto max-h-[70vh] w-full max-w-shell object-contain p-5 md:p-10"
            />
          </div>
        </Reveal>

        {/* Statement and spec sheet */}
        <Shell className="mt-14 md:mt-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <MetaLabel className={t.faint}>The problem, and the build</MetaLabel>
              <p
                className={`mt-5 max-w-read text-[clamp(17px,2.2vw,21px)] leading-relaxed ${t.body}`}
              >
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <MetaLabel className={t.faint}>Spec</MetaLabel>
              <SpecRegister specs={specs} tone={t} className="mt-4" />
            </div>
          </div>
        </Shell>

        {/* Highlights, as a numbered register rather than a bullet list. */}
        {project.highlights && project.highlights.length > 0 && (
          <Shell className="mt-16 md:mt-24">
            <div className={`border-b pb-3 ${t.rule}`}>
              <MetaLabel className={t.faint}>What it does</MetaLabel>
            </div>
            <ul>
              {project.highlights.map((highlight, i) => (
                <li key={highlight} className={`border-b ${t.rule}`}>
                  <Reveal delay={i * 0.06}>
                    <div className="flex items-baseline gap-5 py-5 md:gap-10">
                      <MetaLabel className={`tnum shrink-0 ${t.accent}`}>
                        {indexLabel(i)}
                      </MetaLabel>
                      <p className="max-w-read text-[clamp(16px,2vw,19px)] leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Shell>
        )}

        {project.slideshowImages && project.slideshowImages.length > 0 && (
          <Shell className="mt-16 md:mt-24">
            <Gallery
              images={project.slideshowImages}
              title={project.title}
              tone={t}
            />
          </Shell>
        )}

        <Shell className="mt-20 md:mt-28">
          <NextProject
            project={next}
            position={(position + 1) % projectsData.length}
            tone={t}
          />
        </Shell>
      </main>
    </Layout>
  );
};

export default ProjectDetailsPage;
