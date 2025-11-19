import React from "react";
import Layout from "../components/Layout";
import myImageMobile from "../assets/about/aboutImgMobile.jpg";
import myImageDesktop from "../assets/about/aboutImgDesktop.jpg";
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
        className={`main-container relative z-[1] text-white flex flex-col justify-center items-center min-h-screen px-5 ${
          theme === "dark"
            ? "bg-[#18181b]/90  text-[#f3f2f9]"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 max-w-5xl w-full mt-[30px] lg:mt-[150px]">
          {/* Image Column */}
          <div className="w-full sm:w-1/2 md:w-1/3 md:order-last mt-[90px] mb-8 md:mt-0 flex items-center">
            <img
              src={myImageMobile}
              alt="Iyegere Success"
              className="md:hidden rounded-lg w-full shadow-lg h-auto object-cover"
            />
            <img
              src={myImageDesktop}
              alt="Iyegere Success"
              className="max-md:hidden rounded-lg w-full shadow-lg h-auto object-cover"
            />
          </div>

          {/* Text Column */}
          <div className="w-full md:w-2/3 md:text-left">
            <h1
              className={`font-bold mb-2 ${
                theme === "light" ? "text-[#18181b]" : ""
              } `}
              style={{ fontSize: "clamp(12px, 12em, 55px)" }}
            >
              A
              <span className="mx-1 px-[3px] inline-block scale-x-[1.5]">
                B
              </span>
              OUT
            </h1>
            <hr className={`border`} />
            <p
              className={`text-lg sm:text-xl md:text-3xl mt-5 mb-8 py-4 rounded-lg ${
                theme === "light"
                  ? "text-[#18181b] font-medium"
                  : " text-[whitesmoke]/80"
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              With a unique blend of design and development experience, ISK
              thrives on creating projects that highlight the talents and
              passions of others. He is deeply committed to making the internet
              more accessible and enjoys bringing his love for the outdoors into
              his digital work. Enough of talking about myself in third person.
              When I am not befriending bugs, I listen to music and (maybe) read
              a book.
            </p>
            <a
              href={resumePDF}
              download="IyegereSuccessResume.pdf"
              className={`inline-block py-2 px-4 rounded-full font-bold text-lg transition-colors duration-300 border mb-12 ${
                theme === "light"
                  ? " text-[#18181b] border-2 border-[#18181b]/60"
                  : ""
              }`}
              style={{ fontFamily: "Space Grotesk" }}
            >
              ↓ Resumé
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
