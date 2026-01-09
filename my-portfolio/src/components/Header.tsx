import { useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiArrowUpRight } from "react-icons/fi";
import logoWhite from "../assets/logo-white.webp";
import logoBlack from "../assets/logo-black.webp";

import { useMediaQuery } from "react-responsive";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scroll direction state
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let ticking = false;
    let lastScrollYLocal = window.scrollY;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 10) {
            setShowHeader(true);
          } else if (currentScrollY < lastScrollYLocal) {
            setShowHeader(true); // scrolling up
          } else if (currentScrollY > lastScrollYLocal) {
            setShowHeader(false); // scrolling down
          }
          lastScrollYLocal = currentScrollY;

          // Always show header after user stops scrolling (idle)
          if (idleTimeout) clearTimeout(idleTimeout);
          idleTimeout = setTimeout(() => {
            setShowHeader(true);
          }, 1000);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const is768andBelow = useMediaQuery({ maxWidth: 768 });

  const headerItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  // const headerItemsNavigation = (path: string) => {
  //   if (path === location.pathname) return;
  //   navigate(path);
  //   if (is768andBelow) {
  //     setIsMenuOpen(false);
  //   }
  // };

  const handleMenuNavigation = (path: string) => {
    // if (path === location.pathname) return;
    navigate(path);
    setIsMenuOpen(false);
  };

  const hamburgerSpanStyle =
    "block h-[1.2px] w-5 rounded-full transition-all duration-300 ease-in-out";

  const pathsExceptHome = headerItems
    .filter((item) => item.path !== "/")
    .map((item) => item.path);

    const aTags = (path: string, socialApp: string)=> {
      return (
        <a href={path} className="flex items-center mx-4"><FiArrowUpRight className="mr-2"/>{socialApp}</a>
      )
    }

  return (
    <>
      <header
        className={`fixed left-0 top-[20px] lg:top-7 w-full z-[100] text-white transition-transform duration-300 ${
          showHeader
            ? "translate-y-0"
            : "-translate-y-full top-[-20px] md:bottom-0 "
        } ${
          location.pathname === "/about" && is768andBelow
            ? "top-[0px] bg-inherit rounded-b-sm"
            : ""
        } ${isMenuOpen ? " bg-inherit top-[20px]" : ""} ${
          pathsExceptHome ? "lg:top-6" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between px-8 py-4 w-[97%] md:w-[85%] mx-auto ${
            location.pathname !== "/"
              ? theme === "dark"
                ? "bg-[#18181b] rounded-full"
                : "bg-[whitesmoke] rounded-full"
              : ""
          }  ${
            location.pathname !== "/"
              ? isMenuOpen
                ? theme === "dark"
                  ? "bg-[#18181b]"
                  : "bg-[#9f9e9d]"
                : ""
              : ""
          }`}
        >
          {/* Logo and ISK */}
          <div
            className={`flex items-center gap-2 min-w-0 ${
              theme === "dark" ? "" : "text-[#18181b]"
            }`}
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            <img src={theme === "dark" ? logoWhite : logoBlack} alt="logo" className="object-contain h-6 md:h-7 w-auto" />

            <p
              className={`cursor-pointer font-bold tracking-wide max-md:hidden`}
              style={{
                fontFamily: "Special Gothic Expanded One",
                fontSize: "clamp(18px, 2vw, 27px)",
              }}
            >
              ISK
            </p>
          </div>

          {/* HEADER ITEMS (Desktop) */}
          {/* <ul className="hidden md:flex flex-1 justify-center items-center gap-x-10 list-none">
            {headerItems.map((item, index) => (
              <li
                key={index}
                onClick={() => headerItemsNavigation(item.path)}
                className={`cursor-pointer transition-colors font-semibold ${
                  location.pathname === item.path
                    ? theme === "dark"
                      ? "border-b-2 border-gray-300"
                      : "border-b-2 border-black"
                    : ""
                } ${theme === "dark" ? "" : "text-[#18181b]"}`}
              >
                <span
                  style={{
                    fontSize: "clamp(16px, 2vw, 17px)",
                  }}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul> */}

          <div className="flex flex-row-reverse items-center gap-6">
            {/* Theme Switch*/}
            <li
              className="theme-switch-btn list-none cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <FiSun />
              ) : (
                <FiMoon className="text-[#18181b]" />
              )}
            </li>

            {/* Hamburger - Mobile */}
            <button
              className="relative z-10 h-8 w-8 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Open menu"
              onClick={toggleMenu}
            >
              <span
                className={`${
                  theme === "light" ? "bg-black" : "bg-white"
                } ${hamburgerSpanStyle} ${
                  isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`${
                  theme === "light" ? "bg-black" : "bg-white"
                } ${hamburgerSpanStyle} ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`${
                  theme === "light" ? "bg-black" : "bg-white"
                } ${hamburgerSpanStyle} ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <div className={`menu-overlay fixed inset-0 bg-opacity-95 z-[99] flex flex-col items-center justify-center backdrop-blur-md ${theme === "light" ? "bg-[whitesmoke] text-[#18181b]" : "bg-[#18181b] text-[whitesmoke]"}`}>
          <nav
            className="flex flex-col leading-none font-bold text-left md:text-center"
            style={{ fontSize: "clamp(41px, 8vw, 54px)" }}
          >
            <p
              onClick={() => handleMenuNavigation("/")}
              className="my-4 group cursor-pointer"
            >
              <span className="text-[clamp(20px,2vw,23px)] mr-2">01</span>
              <span className="scale-x-150 px-1 inline-block transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:p-0">
                H
              </span>
              O
              <span className="pr-[5px] scale-x-150 px-1 inline-block transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:p-0">
                M
              </span>
              E
            </p>
            <p
              onClick={() => handleMenuNavigation("/about")}
              className="my-4 group cursor-pointer"
            >
              <span className="text-[clamp(20px,2vw,23px)] mr-2">02</span>A
              <span className="scale-x-150 px-1 inline-block transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:p-0">
                B
              </span>
              OUT
            </p>
            <p
              onClick={() => handleMenuNavigation("/projects")}
              className="my-4 group cursor-pointer"
            >
              <span className="text-[clamp(20px,2vw,23px)] mr-2">03</span>P
              <span className="scale-x-150 px-1 inline-block transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:p-0">
                R
              </span>
              OJECTS
            </p>
            <p
              onClick={() => handleMenuNavigation("/contact")}
              className="my-4 group cursor-pointer"
            >
              <span className="text-[clamp(20px,2vw,23px)] mr-2">04</span>
              CO
              <span className="scale-x-150 px-1 inline-block transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:p-0">
                N
              </span>
              TACT
            </p>
          </nav>
          <div className="social-media flex mt-8 text-lg">
            {aTags("https://www.linkedin.com/in/success-iyegere-063457250", "linkedin")}
            {aTags("https://github.com/siyegs", "github")}
            {aTags("https://x.com/IyegereS", "x")}
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default Header;
