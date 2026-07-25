import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy } from "react-icons/fi";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { LineReveal, MetaLabel, Reveal, Shell } from "../components/work/primitives";
import { tone } from "../lib/work";

interface ContactPageProps {
  theme: string;
  toggleTheme: () => void;
  hoveredName?: string | null;
}

const EMAIL = "iyegeresuccess@gmail.com";

const SOCIALS = [
  { label: "GitHub", handle: "@siyegs", url: "https://github.com/siyegs" },
  {
    label: "LinkedIn",
    handle: "Success Iyegere",
    url: "https://linkedin.com/in/success-iyegere-063457250",
  },
  { label: "X", handle: "@IyegereS", url: "https://x.com/IyegereS" },
];

const MARQUEE = ["SAY HELLO", "-", "WANNA BE STARTING SOMETHING?", "-"];

const ContactPage: React.FC<ContactPageProps> = ({
  theme,
  toggleTheme,
  hoveredName,
}) => {
  const t = tone(theme);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      /* Clipboard blocked (insecure context or denied): the mailto link and
         the selectable address next to it still work. */
    }
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} hoveredName={hoveredName}>
      <SEO
        title="Contact"
        path="/contact"
        description="Get in touch with Iyegere Success Karboloo - Full-Stack Engineer for web, mobile and backend projects, remote work and collaborations."
      />

      <main
        className={`relative z-[1] flex min-h-screen w-full flex-col overflow-x-hidden pb-10 pt-28 md:pt-36 ${t.page}`}
      >
        <Shell>
          <div className={`flex items-center justify-between gap-4 border-b pb-4 ${t.rule}`}>
            <MetaLabel className={t.dim}>Contact</MetaLabel>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
              />
              <MetaLabel className={t.dim}>Available for work</MetaLabel>
            </span>
          </div>

          <p
            className={`mt-8 max-w-read text-[clamp(17px,2.2vw,22px)] leading-relaxed ${t.body}`}
          >
            Got a question, a proposal, or something you want built? Tell me
            what you are working on and I'll come back to you.
          </p>
        </Shell>

        {/* Full-bleed statement band */}
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          className={`group mt-10 block border-y py-8 md:mt-14 md:py-12 ${t.rule}`}
        >
          <div className="marquee-mask">
            <div
              className="marquee-track"
              style={{ animationDuration: "36s" }}
              aria-hidden
            >
              {[0, 1].map((copyIndex) => (
                <span key={copyIndex} className="flex shrink-0 items-center">
                  {MARQUEE.map((phrase, i) => (
                    <span
                      key={`${phrase}-${i}`}
                      className={`stroked-text whitespace-nowrap px-6 font-display text-[12vw] leading-[0.9] text-transparent transition-colors duration-700 md:px-10 ${
                        t.isDark
                          ? "group-hover:text-accent"
                          : "group-hover:text-accent-warm"
                      }`}
                    >
                      {phrase}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* The address itself, at the largest size on the page. */}
        <Shell className="mt-12 md:mt-16">
          <MetaLabel className={t.faint}>Write to me</MetaLabel>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
            <h1 className="font-display text-[clamp(24px,5.6vw,68px)] leading-[0.95]">
              <LineReveal>
                <a
                  href={`mailto:${EMAIL}`}
                  className={`break-all transition-colors duration-300 ${
                    t.isDark ? "hover:text-accent" : "hover:text-accent-warm"
                  }`}
                >
                  {EMAIL}
                </a>
              </LineReveal>
            </h1>

            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className={`inline-flex shrink-0 items-center gap-2 border px-4 py-2.5 transition-colors duration-300 ${
                t.rule
              } ${t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"}`}
            >
              {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              <MetaLabel>{copied ? "Copied" : "Copy"}</MetaLabel>
            </button>
          </div>
        </Shell>

        {/* Elsewhere */}
        <Shell className="mt-16 md:mt-24">
          <div className={`border-b pb-3 ${t.rule}`}>
            <MetaLabel className={t.faint}>Elsewhere</MetaLabel>
          </div>

          <ul>
            {SOCIALS.map((social, i) => (
              <li key={social.label} className={`border-b ${t.rule}`}>
                <Reveal delay={i * 0.06}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="font-display text-[clamp(20px,3.2vw,36px)] leading-none transition-transform duration-500 ease-editorial md:group-hover:translate-x-3">
                      {social.label}
                    </span>
                    <MetaLabel className={`ml-auto ${t.dim}`}>
                      {social.handle}
                    </MetaLabel>
                    <FiArrowUpRight
                      aria-hidden
                      className={`shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 ${t.faint}`}
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Shell>

        <Shell className="mt-auto pt-16">
          <div className={`flex items-center justify-between gap-4 border-t pt-5 ${t.rule}`}>
            <MetaLabel className={t.faint}>
              © {new Date().getFullYear()} ISK
            </MetaLabel>
            <MetaLabel className={t.faint}>All rights reserved</MetaLabel>
          </div>
        </Shell>
      </main>
    </Layout>
  );
};

export default ContactPage;
