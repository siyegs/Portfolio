import { startTransition, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiMoon, FiSun } from "react-icons/fi";
import logoWhite from "../assets/logo-white.webp";
import logoBlack from "../assets/logo-black.webp";
import { MetaLabel } from "./work/primitives";
import { tone } from "../lib/work";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const NAV = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "WORK", path: "/projects" },
  { label: "CONTACT", path: "/contact" },
];

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/siyegs" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/success-iyegere-063457250" },
  { label: "X", url: "https://x.com/IyegereS" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const location = useLocation();
  const t = tone(theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* Retract on the way down, return on the way up, and always come back once
     scrolling stops so the nav is never more than a flick away. */
  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    let idle: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y < 10 || y < lastY) setHidden(false);
        else if (y > lastY) setHidden(true);
        lastY = y;

        if (idle) clearTimeout(idle);
        idle = setTimeout(() => setHidden(false), 1000);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idle) clearTimeout(idle);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  /**
   * Close the index in the same update as the navigation it triggered.
   *
   * React Router wraps navigations in startTransition, so a route change is a
   * non-urgent update. Closing the menu with a plain setState is an urgent one,
   * and React commits urgent work first - which painted one frame with the
   * overlay already gone and the page you were leaving still mounted behind
   * it. That frame was the flash of the previous screen. Scheduling the close
   * as a transition too puts both in the same lane, so they commit together
   * and the overlay only lifts once the new route is on screen.
   */
  const closeMenuWithNavigation = () =>
    startTransition(() => setMenuOpen(false));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] border-b transition-[transform,background-color,border-color] duration-500 ease-editorial ${
          hidden || menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !menuOpen
            ? `${t.rule} ${t.isDark ? "bg-ink/85" : "bg-paper/85"} backdrop-blur-md`
            : "border-transparent bg-transparent"
        } ${t.isDark ? "text-paper" : "text-ink"}`}
      >
        <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-6 px-5 md:h-[4.5rem] md:px-10 lg:px-16">
          <Link to="/" aria-label="Home" className="flex shrink-0 items-center gap-2.5">
            <img
              src={t.isDark ? logoWhite : logoBlack}
              alt=""
              className="h-6 w-auto object-contain md:h-7"
            />
            <span className="font-display text-lg tracking-tight md:text-xl">ISK</span>
          </Link>

          <div className="flex items-center gap-5 md:gap-7">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.isDark ? "Switch to light theme" : "Switch to dark theme"}
              className={`transition-colors duration-300 ${t.dim} ${
                t.isDark ? "hover:text-paper" : "hover:text-ink"
              }`}
            >
              {t.isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="group flex items-center gap-3"
            >
              <MetaLabel className="hidden sm:inline">
                {menuOpen ? "Close" : "Index"}
              </MetaLabel>
              <span className="relative flex h-4 w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ease-editorial ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ease-editorial ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Index overlay. Numbered rows, one per route, with the contact rail
          underneath so the menu doubles as the site's shortcut sheet.

          It sits above the chat launcher (z-100) so that is not left floating
          over the index, and below the bar (z-120) so Close stays reachable.
          It scrolls rather than clipping when the rows outgrow the viewport,
          and the nav padding clears the fixed bar. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* Leaves faster than it arrives. The route has already changed by
               the time this unmounts, so a slow fade just holds the new page
               behind an overlay nobody is reading any more. */
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28 }}
            className={`fixed inset-0 z-[110] overflow-y-auto ${
              t.isDark ? "bg-ink text-paper" : "bg-paper text-ink"
            }`}
          >
            {/* The bar retracts while this is open, so the overlay carries its
                own rail: the mark on the left, Close on the right. */}
            <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-6 px-5 md:h-[4.5rem] md:px-10 lg:px-16">
              <Link
                to="/"
                aria-label="Home"
                onClick={closeMenuWithNavigation}
                className="flex shrink-0 items-center gap-2.5"
              >
                <img
                  src={t.isDark ? logoWhite : logoBlack}
                  alt=""
                  className="h-6 w-auto object-contain md:h-7"
                />
                <span className="font-display text-lg tracking-tight md:text-xl">
                  ISK
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="group flex items-center gap-3"
              >
                <MetaLabel className="hidden sm:inline">Close</MetaLabel>
                <span className="relative flex h-4 w-6 items-center justify-center">
                  <span className="absolute block h-px w-full rotate-45 bg-current" />
                  <span className="absolute block h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav className="mx-auto flex min-h-[calc(100%-4rem)] w-full max-w-shell flex-col justify-center px-5 pb-14 pt-6 md:min-h-[calc(100%-4.5rem)] md:px-10 md:pb-16 lg:px-16">
              {NAV.map((item, i) => {
                const current = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      to={item.path}
                      onClick={closeMenuWithNavigation}
                      className={`group relative flex items-center gap-5 border-t py-5 md:gap-10 md:py-7 ${
                        t.rule
                      } ${i === NAV.length - 1 ? "border-b" : ""}`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100 ${t.inset}`}
                      />
                      <MetaLabel
                        className={`tnum relative shrink-0 ${
                          current ? t.accent : t.faint
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </MetaLabel>
                      <span className="relative font-display text-[clamp(30px,8vw,68px)] leading-[0.95] transition-transform duration-500 ease-editorial group-hover:translate-x-3">
                        {item.label}
                      </span>
                      {current && (
                        <span
                          aria-hidden
                          className={`relative ml-auto h-1.5 w-1.5 rounded-full ${t.accentFill}`}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
                className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <MetaLabel className={t.faint}>Get in touch</MetaLabel>
                  <a
                    href="mailto:iyegeresuccess@gmail.com"
                    className="mt-2 block text-[15px] md:text-lg"
                  >
                    iyegeresuccess@gmail.com
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-7 gap-y-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-1.5 transition-colors duration-300 ${t.dim} ${
                        t.isDark ? "hover:text-paper" : "hover:text-ink"
                      }`}
                    >
                      <MetaLabel>{social.label}</MetaLabel>
                      <FiArrowUpRight
                        aria-hidden
                        className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
