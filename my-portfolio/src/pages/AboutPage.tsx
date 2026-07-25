import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import portrait from "../assets/about/aboutImgDesktop.jpg";
import { CAPABILITIES, ROLES } from "../data/profile";
import { LineReveal, MetaLabel, Reveal, Shell } from "../components/work/primitives";
import { tone } from "../lib/work";

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
  const t = tone(theme);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO
        title="About"
        path="/about"
        description="About Iyegere Success Karboloo - a Full-Stack Engineer in Nigeria, Lead Developer at MystraHQ and Staff Software Engineer at Fluxdevs, working across web, mobile and backend."
      />

      <main
        className={`relative z-[1] min-h-screen w-full overflow-x-hidden pb-24 pt-28 md:pt-36 ${t.page}`}
      >
        <Shell>
          <div className={`flex items-center justify-between gap-4 border-b pb-4 ${t.rule}`}>
            <MetaLabel className={t.dim}>Profile</MetaLabel>
            <MetaLabel className={t.dim}>Nigeria · Remote</MetaLabel>
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-8">
            {/* Statement */}
            <div className="md:col-span-7">
              <h1 className="font-display text-[clamp(46px,11vw,9rem)] leading-[0.85]">
                <LineReveal>ABOUT</LineReveal>
              </h1>

              <p
                className={`mt-8 max-w-read text-[clamp(18px,2.4vw,26px)] leading-snug`}
              >
                I'm Iyegere Success Karboloo, a Full-Stack Engineer based in
                Nigeria. I build fast, reliable products end to end and move
                comfortably from interface to API to database, reaching for the
                right tool for the job instead of forcing a favorite.
              </p>

              <p
                className={`mt-6 max-w-read text-[clamp(15px,1.9vw,18px)] leading-relaxed ${t.body}`}
              >
                I've shipped e-commerce platforms, ERPs, real-time apps and a
                cross-platform influencer marketing app, across web, mobile and
                backend, including payment integrations, and handled remote work
                for teams beyond Nigeria. I care about accessibility and clean,
                maintainable code.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:iyegeresuccess@gmail.com?subject=Resume%20request"
                  className={`group inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold transition-colors duration-300 ${t.invert} ${t.invertHover}`}
                >
                  Request my resume
                  <FiArrowUpRight
                    aria-hidden
                    className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <Link
                  to="/projects"
                  className={`group inline-flex items-center gap-2 border px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                    t.rule
                  } ${t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"}`}
                >
                  See the work
                  <FiArrowUpRight
                    aria-hidden
                    className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Portrait. Shot in the frame it was taken in, no card around it. */}
            <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
              <figure>
                <div className={`aspect-[3/4] overflow-hidden ${t.inset}`}>
                  <img
                    src={portrait}
                    alt="Iyegere Success Karboloo"
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                </div>
                <figcaption className={`mt-3 flex items-center justify-between ${t.faint}`}>
                  <MetaLabel>Iyegere Success Karboloo</MetaLabel>
                  <MetaLabel>ISK</MetaLabel>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Shell>

        {/* Currently */}
        <Shell className="mt-20 md:mt-28">
          <div className={`border-b pb-3 ${t.rule}`}>
            <MetaLabel className={t.faint}>Currently</MetaLabel>
          </div>
          <ul>
            {ROLES.map((role, i) => (
              <li key={role.company} className={`border-b ${t.rule}`}>
                <Reveal delay={i * 0.07}>
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5"
                  >
                    <span className="font-display text-[clamp(22px,3.6vw,40px)] leading-none transition-transform duration-500 ease-editorial md:group-hover:translate-x-3">
                      {role.company}
                    </span>
                    <MetaLabel className={`${t.dim} md:ml-auto`}>
                      {role.title}
                    </MetaLabel>
                    <FiArrowUpRight
                      aria-hidden
                      className={`transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 ${t.faint}`}
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Shell>

        {/* Capabilities */}
        <Shell className="mt-20 md:mt-28">
          <div className={`flex items-baseline justify-between border-b pb-3 ${t.rule}`}>
            <MetaLabel className={t.faint}>What I work with</MetaLabel>
            <MetaLabel className={`tnum ${t.faint}`}>
              {String(CAPABILITIES.length).padStart(2, "0")}
            </MetaLabel>
          </div>

          <dl>
            {CAPABILITIES.map((group, i) => (
              <Reveal key={group.label} delay={Math.min(i, 5) * 0.05}>
                <div
                  className={`grid grid-cols-1 gap-1 border-b py-4 sm:grid-cols-[8rem_1fr] sm:gap-6 md:grid-cols-[11rem_1fr] ${t.rule}`}
                >
                  <dt className="pt-1">
                    <MetaLabel className={t.accent}>{group.label}</MetaLabel>
                  </dt>
                  <dd className={`text-[15px] leading-relaxed md:text-base ${t.body}`}>
                    {group.items.join(" · ")}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Shell>

        {/* Off the clock */}
        <Shell className="mt-20 md:mt-28">
          <Reveal>
            <p
              className={`max-w-3xl font-display text-[clamp(22px,4.2vw,46px)] leading-[1.05] ${t.dim}`}
            >
              When I'm not befriending bugs, I'm listening to music and (maybe)
              reading a book.
            </p>
          </Reveal>
        </Shell>
      </main>
    </Layout>
  );
};

export default AboutPage;
