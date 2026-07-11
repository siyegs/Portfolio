import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

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
  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO
        title="About"
        path="/about"
        description="About Iyegere Success Karboloo - a Full-Stack Engineer in Nigeria, Lead Developer at MystraHQ and Staff Software Engineer at Fluxdevs, working across web, mobile and backend."
      />
      <div
        className={`main-container relative z-[1] flex min-h-screen flex-col items-center justify-center px-5 py-20 ${
          theme === "dark"
            ? "bg-[#18181b]/90 text-[#f3f2f9]"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
      >
        <div className="mt-[60px] w-full max-w-4xl md:mt-[100px]">
          <div className="mb-12 text-center">
            <h1
              className={`mb-4 font-bold ${
                theme === "light" ? "text-[#18181b]" : "text-[#f3f2f9]"
              }`}
              style={{ fontSize: "clamp(40px, 10vw, 80px)" }}
            >
              A
              <span className="mx-1 inline-block scale-x-[1.5] px-[3px]">
                B
              </span>
              OUT
            </h1>
            <div
              className={`mx-auto h-1 w-24 rounded-full ${
                theme === "dark" ? "bg-[#f3f2f9]/30" : "bg-[#18181b]/30"
              }`}
            />
          </div>

          <div
            className={`relative rounded-2xl p-8 backdrop-blur-sm md:p-12 ${
              theme === "dark"
                ? "border border-white/10 bg-white/5"
                : "border border-black/10 bg-black/5"
            }`}
          >
            <span
              className={`absolute -top-6 left-8 font-serif text-8xl opacity-20 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              "
            </span>

            <p
              className={`mb-8 text-xl leading-relaxed sm:text-2xl md:text-3xl ${
                theme === "light"
                  ? "font-medium text-[#18181b]"
                  : "text-[whitesmoke]/90"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              I'm Iyegere Success Karboloo, a Full-Stack Engineer based in
              Nigeria. I build fast, reliable products end to end and move
              comfortably from interface to API to database, reaching for the
              right tool for the job instead of forcing a favorite.
            </p>

            <p
              className={`mb-8 text-lg leading-relaxed sm:text-xl md:text-2xl ${
                theme === "light"
                  ? "text-[#18181b]/80"
                  : "text-[whitesmoke]/70"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              Currently Lead Developer at MystraHQ and Staff Software Engineer
              at Fluxdevs, I've shipped e-commerce platforms, ERPs, real-time
              apps and a cross-platform influencer marketing app - across web,
              mobile and backend, including payment integrations - and handled
              remote work for teams beyond Nigeria. I care about accessibility
              and clean, maintainable code.
            </p>

            <p
              className={`mb-10 text-lg italic leading-relaxed sm:text-xl md:text-2xl ${
                theme === "light"
                  ? "text-[#18181b]/70"
                  : "text-[whitesmoke]/60"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              When I'm not befriending bugs, I'm listening to music and (maybe)
              reading a book.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="mailto:iyegeresuccess@gmail.com?subject=Resume%20request"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-bold transition-all duration-300 ${
                  theme === "light"
                    ? "bg-[#18181b] text-white hover:bg-[#18181b]/80"
                    : "bg-white text-[#18181b] hover:bg-white/90"
                }`}
                style={{ fontFamily: "Space Grotesk" }}
              >
                Request Resume
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Design", "Development", "Accessibility", "Music", "Books"].map(
              (tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-white/10 text-white/80 hover:bg-white/20"
                      : "bg-black/10 text-black/80 hover:bg-black/20"
                  }`}
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
