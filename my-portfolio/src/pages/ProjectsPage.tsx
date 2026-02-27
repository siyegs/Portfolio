import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import projectsData from "../data/projectsData";

interface WorkPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
}

const WorkPage: React.FC<WorkPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  document.title = "Projects | ISK";
  const navigate = useNavigate();

  const renderProjectCard = (proj: (typeof projectsData)[0]) => (
    <div
      key={proj.title}
      className={`flex flex-col items-center mx-auto transition-all duration-200`}
    >
      {/* Placeholder Thumbnail*/}
      <div
        className={`relative flex items-center justify-center mb-4 p-6 rounded-lg ${proj.color} sm:h-[200px] sm:w-[280px] md:h-[240px] md:w-[320px] lg:w-[290px] xl:w-[350px] 2xl:w-[430px] hover:scale-95 transition-all duration-200`}
      >
        {proj.image ? (
          <img
            src={proj.image}
            alt={proj.title + " " + "img"}
            className={`object-cover w-full h-full cursor-pointer ${proj.curveImg ? 'rounded-md' : ''}`}
            onClick={() => navigate(`/projects/${proj.slug}`)}
          />
        ) : (
          <span>{proj.title[0]}</span>
        )}

        <div className="absolute top-3 left-4">
          {proj.ongoing && (
            <span className="bg-[black]/70 text-white text-xs font-semibold px-2 py-1 rounded">
              <span className="inline-block rounded-full bg-green-600 w-2 h-2 mr-1 align-middle animate-pulse"></span>
              Ongoing
            </span>
          )}
        </div>

        <div className="absolute top-3 left-4">
          {proj.underMaintenance && (
            <span className="bg-[black]/70 text-white text-xs font-semibold px-2 py-1 rounded">
              <span className="inline-block rounded-full bg-red-600 w-2 h-2 mr-1 align-middle animate-pulse"></span>
              Under Maintenance
            </span>
          )}
        </div>
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

        {/* tag */}
        <div className="flex gap-2 mt-1 flex-wrap">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${theme === "dark"
                ? "bg-[#1a1a22] text-[#aab2d1] border-[#333]"
                : "bg-[#f3f2f9] text-[#18181b] border-[#ccc]"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <div
        className={`min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-20 transition-colors duration-30 overflow-x-hidden ${theme === "dark"
          ? "bg-[#18181b]/90  text-[#f3f2f9]"
          : "bg-[#f3f2f9]/90 text-[#18181b]"
          } `}
        style={{ fontFamily: "Space Grotesk" }}
      >
        {/* Header */}
        <div className="w-full flex flex-col items-start mb-4 mt-[30px] md:mt-[90px] md:mb-10 md:w-[90%] overflow-x-hidden">
          <h1
            className="font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(33px, 2vw, 35px)" }}
          >
            Work
          </h1>
          <p
            className={`text-base font-semibold mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
          >
            A collection of projects I've built and contributed to
          </p>
        </div>

        {/* Projects List */}
        <div className="w-full md:w-[90%] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9 overflow-x-hidden">
          {projectsData.map(renderProjectCard)}
        </div>

        {/* Call to Action */}
        <div
          className={`w-full grid md:w-screen md:py-12 mt-8 rounded-xl py-7 ${theme === "dark"
            ? "bg-[#232336]/30 text-[#f3f2f9]"
            : "bg-[#e9e6fa] text-[#18181b]"
            }`}
        >
          <div className="grid md:grid-cols-2 md:gap-4 w-[85%] mx-auto">
            <div className="flex justify-center items-center">
              <h2
                className="font-bold mb-3 md:font-black"
                style={{ fontSize: "clamp(20px, 3vw, 100px)" }}
              >
                Ready to go live with your dream?
              </h2>
            </div>

            <div>
              <p
                className="font-semibold mb-6"
                style={{ fontSize: "clamp(15px, 2vw, 20px)" }}
              >
                I'm excited to help bring your dream project to life! I'm ready
                to collaborate and help you make the most of your web presence.
              </p>
              <a
                href="mailto:iyegeresuccess@gmail.com"
                className="inline-block px-4 py-2 font-semibold text-sm transition-all duration-200 shadow-md bg-[#aab2d1] text-[#18181b] hover:bg-[whitesmoke] hover:text-[#18181b]"
              >
                Collab with ISK
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkPage;
