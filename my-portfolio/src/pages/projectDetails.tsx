import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../data/projectsData";
import Layout from "../components/Layout";
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

  console.log(project);

  document.title = project
    ? `${project.title} | ISK`
    : "Project Not Found | ISK";

  if (!project) {
    return (
      <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-[#aab2d1] text-[#18181b] font-semibold"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center  px-5 lg:px-20 py-16 pt-32 ${theme === "dark"
          ? "bg-[#18181b]/90 text-[#f3f2f9]"
          : "bg-[#f3f2f9]/90 text-[#18181b]"
          }`}
        style={{ fontFamily: "Space Grotesk" }}
      >
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 mb-8 text-base font-semibold hover:underline"
        >
          <FiArrowLeft /> Back to Projects
        </button>
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-left">
              {project.title}
            </h1>

            {/* project description */}
            <p className="text-[clamp(18px,4vw,20px)] mb-6">
              {project.description}
            </p>

            {/* tech stack */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${theme === "dark"
                    ? "bg-[#1a1a22] text-[#aab2d1] border-[#333]"
                    : "bg-[#f3f2f9] text-[#18181b] border-[#ccc]"
                    }`}
                >
                  {tool}
                </span>
              ))}
            </div>
            {project.url ? (
              <a
                href={
                  project.hasRBAC
                    ? "mailto:iyegeresuccess@gmail.com"
                    : project.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex w-fit items-center gap-2 px-3 pl-4 py-2 rounded-full bg-[#aab2d1] text-[#18181b] font-semibold hover:bg-[#e5e7eb] transition text-[12.5px] ${project.hasRBAC
                  ? "bg-inherit text-[whitesmoke] pl-0 hover:bg-inherit"
                  : ""
                  }`}
              >
                {project.hasRBAC ? (
                  <span
                    className={`inline-block ${theme === "dark" ? "text-[#f3f2f9]" : "text-[#18181b]"
                      }`}
                  >
                    See Demo Roles For
                  </span>
                ) : (
                  <span className="flex gap-3 items-center">
                    Visit Live Site <FiExternalLink />
                  </span>
                )}
              </a>
            ) : (
              <div className="inline-flex w-fit items-center gap-3 px-4 py-2 rounded-full bg-[#aab2d1] text-[#18181b] font-semibold text-[12.5px]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <span>Coming Soon</span>
              </div>
            )}
            {project.hasRBAC && (
              <div className="mt-3">
                <div className="flex gap-2 flex-wrap">
                  {project.demoRolesURL.map((role) => (
                    <a
                      key={role.role}
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1 flex items-center gap-x-2 rounded-full text-xs font-medium border transition ${theme === "dark"
                        ? "bg-[#1a1a22] text-[#aab2d1] border-[#333]"
                        : "bg-[#f3f2f9] text-[#18181b] border-[#ccc]"
                        }`}
                    >
                      {role.role} <FiExternalLink />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={`rounded-lg w-full max-md:max-w-[560px] max-w-[800px] flex items-center justify-center mt-9 hover:scale-95 transition-all duration-200`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        {/* <div className="slideshow grid w-[710px] md:w-[2200px] grid-cols-3  items-center gap-x-6 mt-14">
          {project.slideshowImages?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full rounded-lg h-[160px] object-cover"
            />
          ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default ProjectDetailsPage;
