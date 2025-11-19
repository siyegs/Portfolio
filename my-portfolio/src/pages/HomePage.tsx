import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "../App.css";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName: string | null;
  setHoveredName: (name: string | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
  setHoveredName,
}) => {
  document.title = "Home | ISK";
  const is500andAbove = useMediaQuery({ minWidth: 500 });
  const navigate = useNavigate();

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <div
        className={`main-container relative z-[1] text-white flex flex-col justify-center items-center h-screen text-center px-2
           ${
             theme === "dark"
               ? "bg-[#18181b]/90  text-[#f3f2f9]"
               : "bg-[#f3f2f9]/85 text-[#18181b]"
           }`}
        style={{ fontFamily: "Special Gothic Expanded One" }}
      >
        <h1 className="leading-[1.3] font-medium mb-[1rem] text-[clamp(26px,4.5vw,93px)]">
          <span className="stroked-text text-transparent stroke-slate-100">
            HEY, I'M{" "}
          </span>{" "}
          <br className={is500andAbove ? "hidden" : ""} />
          <span
            className="text-[#aab2d1] italic font-black"
            onMouseEnter={() => setHoveredName("IYEGERE")}
            onMouseLeave={() => setHoveredName(null)}
          >
            IY
            <span className="w-fill inline-block scale-x-150 mx-[5px]">E</span>G
            <span className="w-fill inline-block scale-x-150 mx-[5px]">E</span>R
            <span className="w-fill inline-block scale-x-150 mx-[5px]">E</span>
          </span>{" "}
          <span
            className="text-[#aab2d1] italic font-black"
            onMouseEnter={() => setHoveredName("SUCCESS")}
            onMouseLeave={() => setHoveredName(null)}
          >
            SUCC
            <span className="w-fill inline-block scale-x-150 mx-[5px]">E</span>
            SS
          </span>
          <br />
          <span className="stroked-text text-transparent">
            BUT YOU CAN CALL <br className={is500andAbove ? "hidden" : ""} />
            ME{" "}
          </span>
          <span
            className="text-[#aab2d1] italic font-black"
            onMouseEnter={() => setHoveredName("KARBOLOO")}
            onMouseLeave={() => setHoveredName(null)}
          >
            KABORLOO
          </span>
        </h1>

        {/* what i do */}
        <p
          className="px-3 font-light doings"
          style={{
            fontSize: "clamp(15px, 2vw, 25px)",
            fontFamily: "Space Grotesk",
          }}
        >
          {/* I'm an App and Frontend Web Developer, web <br /> designer & design enthusiast */}
          I build applications and services that help <br /> businesses scale. Let's turn your visions to reality!
        </p>

        <div
          className={`pt-6 flex ${
            is500andAbove ? "flex-row gap-x-10" : "flex-col"
          } gap-y-3 w-full justify-center items-center`}
          style={{ fontFamily: "Space Grotesk" }}
        >
          <p
            className={`flex items-center dynamic-text`}
            style={{
              fontSize: "clamp(15px, 2vw, 24px)",
            }}
            onClick={() => navigate("/projects")}
          >
            <FiArrowRight
              className="mr-2"
              style={{ fontSize: "clamp(17.5px, 2vw, 22px)" }}
            />
            <span className={`underline-hover`}>
              see my{" "}
              <span className="pl-[4px] inline-block scale-x-150">p</span>
              rojects
            </span>
          </p>

          <p
            className="flex items-center dynamic-text"
            style={{
              fontSize: "clamp(15px, 2vw, 24px)",
            }}
            onClick={() => navigate("/about")}
          >
            <FiArrowRight
              className="mr-2"
              style={{ fontSize: "clamp(17.5px, 2vw, 22px)" }}
            />
            <span className="underline-hover">
              more
              <span className="pl-[4px] inline-block scale-x-150">a</span>
              <span className="scale-x-150">b</span>o
              <span className="scale-x-150">u</span>
              <span className="scale-x-150">t</span>
              <span className="ml-1">me</span>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
