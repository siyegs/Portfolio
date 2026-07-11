import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
// import { FiGithub, FiLinkedin, FiX, FiInstagram } from "react-icons/fi";
// import logoWhite from "../assets/logo-white.webp";
// import logoBlack from "../assets/logo-black.webp";

interface ContactPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName?: string | null;
}

const SOCIALS = [
  {
    label: "TWITTER",
    url: "https://x.com/IyegereS",
    // icon: <FiX className="inline-block mr-2" />,
  },
  {
    label: "GITHUB",
    url: "https://github.com/siyegs",
    // icon: <FiGithub className="inline-block mr-2" />,
  },
  {
    label: "LINKEDIN",
    url: "https://linkedin.com/in/success-iyegere-063457250",
    // icon: <FiLinkedin className="inline-block mr-2" />,
  },
];

const ContactPage: React.FC<ContactPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  const sayHello = (
    <h1 className={`marquee-text text-[clamp(3rem,8vw,6rem)] font-extrabold uppercase text-center whitespace-nowrap inline-block pr-[40px] md:pr-[54px] tracking-[-0.04em] leading-[1.1] ${theme === "light" ? "text-[#18181b]/80 hover:text-[#90754c]" : "text-[#aab2d1] hover:text-[whitesmoke]"}`}>
      SAY HELLO – WANNA BE STARTING SOMETHING? {" "}
      SAY HELLO – WANNA BE STARTING SOMETHING?
    </h1>
  );

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO
        title="Contact"
        path="/contact"
        description="Get in touch with Iyegere Success Karboloo - Full-Stack Engineer for web, mobile and backend projects, remote work and collaborations."
      />
      <div
        className={`relative min-h-screen flex flex-col justify-between items-center px-4 pt-24 pb-10 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#18181b] text-[#f3f2f9]/90"
            : "bg-[#f3f2f9]/90 text-[#18181b]"
        }`}
        style={{ fontFamily: "Space Grotesk" }}
      >
        {/* Top Intro */}
        <div className="w-full justify-center items-center max-w-3xl mx-auto text-center mt-8 lg:mt-16 mb-8">
          <p className="text-base md:text-lg lg:text-2xl font-normal opacity-90">
            Got a question, proposal or project or want to work together on
            something? Feel free to reach out.
          </p>
        </div>

        {/* Main Message */}
        <div className="w-full flex-1 flex flex-col justify-center items-center h-fit">
          <hr className="w-[94%] border-t border-gray-600 mb-6 md:mb-8 opacity-40" />
          <div className="marquee-container overflow-hidden w-full relative">
            <div className="marquee-track">
              {sayHello}
            </div>
          </div>
          <hr className="w-[94%] border-t border-gray-600 mt-6 md:mt-8 opacity-40" />

          {/* Email */}
          <div className="mt-10 group mb-14 lg:mb-24 flex flex-col w-fit h-[40px]">
            <a
              href="mailto:iyegeresuccess@gmail.com"
              className={`md:text-3xl text-[clamp(1rem,4vw,12rem)] font-semibold tracking-[0.01em] hover:text-[#aab2d1] transition-colors duration-200 select-all mb-1 ${theme === "light" ? "text-[#18181b]/90 hover:text-[#20225cba]" : "text-[#f3f2f9]/90"}`}
            >
              iyegeresuccess@gmail.com
            </a>

            <button className={`text-[clamp(0.76rem,3vw,0.85rem)] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto border w-fit mx-auto px-2 py-2 rounded-full transition-all duration-700 ease-in-out transform group-hover:translate-y-0 translate-y-2 ${theme === "dark" ? "border-[#aab2d1]" : "border-black"}`}>

              <a
              href="mailto:iyegeresuccess@gmail.com">
                Click to send mail
              {/* iyegeresuccess@gmail.com */}
            </a>
            </button>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-5 py-2 rounded-full border border-gray-600 bg-transparent transition-all duration-200 text-sm font-semibold tracking-wide shadow-sm ${theme === "light" ? "" : "text-[#f3f2f9]/90 hover:bg-[whitesmoke]/20 hover:text-[#18181b]"}`}
              >
                {/* {social.icon} */}
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Footer: Location/Time and Credit */}
        <div className="w-full flex justify-center items-center text-xs md:text-sm font-medium mt-12">
          <div className="pr-1">
            © {new Date().getFullYear()} ISK. All rights reserved.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
