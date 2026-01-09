import React from "react";
import Layout from "../components/Layout";
import resumePDF from "../assets/about/IyegereSuccessResume.pdf";

interface AboutPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
}

const AboutPage: React.FC<AboutPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  document.title = "About | ISK";

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <div
        className={`main-container relative z-[1] flex flex-col justify-center items-center min-h-screen px-5 py-20 ${
          theme === "dark"
            ? "bg-[#18181b]/90 text-[#f3f2f9]"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
      >
        <div className="max-w-4xl w-full mt-[60px] md:mt-[100px]">
          {/* Large decorative heading */}
          <div className="text-center mb-12">
            <h1
              className={`font-bold mb-4 ${
                theme === "light" ? "text-[#18181b]" : "text-[#f3f2f9]"
              }`}
              style={{ fontSize: "clamp(40px, 10vw, 80px)" }}
            >
              A
              <span className="mx-1 px-[3px] inline-block scale-x-[1.5]">
                B
              </span>
              OUT
            </h1>
            <div
              className={`w-24 h-1 mx-auto rounded-full ${
                theme === "dark" ? "bg-[#f3f2f9]/30" : "bg-[#18181b]/30"
              }`}
            />
          </div>

          {/* Main content card */}
          <div
            className={`relative p-8 md:p-12 rounded-2xl backdrop-blur-sm ${
              theme === "dark"
                ? "bg-white/5 border border-white/10"
                : "bg-black/5 border border-black/10"
            }`}
          >
            {/* Decorative quote mark */}
            <span
              className={`absolute -top-6 left-8 text-8xl font-serif opacity-20 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              "
            </span>

            <p
              className={`text-xl sm:text-2xl md:text-3xl leading-relaxed mb-8 ${
                theme === "light"
                  ? "text-[#18181b] font-medium"
                  : "text-[whitesmoke]/90"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              With a unique blend of design and development experience, ISK
              thrives on creating projects that highlight the talents and
              passions of others.
            </p>

            <p
              className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 ${
                theme === "light"
                  ? "text-[#18181b]/80"
                  : "text-[whitesmoke]/70"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              He is deeply committed to making the internet more accessible and
              enjoys bringing his love for the outdoors into his digital work.
            </p>

            <p
              className={`text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 italic ${
                theme === "light"
                  ? "text-[#18181b]/70"
                  : "text-[whitesmoke]/60"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              Enough of talking about myself in third person. When I am not
              befriending bugs, I listen to music and (maybe) read a book.
            </p>

            {/* Resume button */}
            <div className="flex justify-center md:justify-start">
              <a
                href={resumePDF}
                download="IyegereSuccessResume.pdf"
                className={`group inline-flex items-center gap-2 py-3 px-6 rounded-full font-bold text-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-[#18181b] text-white hover:bg-[#18181b]/80"
                    : "bg-white text-[#18181b] hover:bg-white/90"
                }`}
                style={{ fontFamily: "Space Grotesk" }}
              >
                <span className="group-hover:-translate-y-0.5 transition-transform duration-300">
                  ↓
                </span>
                Resumé
              </a>
            </div>
          </div>

          {/* Skills/Interests tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["Design", "Development", "Accessibility", "Music", "Books"].map(
              (tag) => (
                <span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-white/10 text-white/80 hover:bg-white/20"
                      : "bg-black/10 text-black/80 hover:bg-black/20"
                  }`}
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
