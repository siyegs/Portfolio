import { motion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Status, Tone } from "../../lib/work";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * When the current route's entrance choreography may begin, as a
 * performance.now() timestamp. Provided per navigation by RouteTransition in
 * App. Zero (the default, and every ordinary navigation or reload) means
 * "immediately". The menu sets a future moment so a page it mounted early,
 * behind its panel, plays its full entrance on reveal instead of being caught
 * halfway through it (see src/lib/entrance.ts).
 */
export const EntranceAtContext = createContext(0);

/** Ms still to wait, measured once at mount, before entrances may start. */
function useEntranceHoldMs(): number {
  const entranceAt = useContext(EntranceAtContext);
  const [holdMs] = useState(() => Math.max(0, entranceAt - performance.now()));
  return holdMs;
}

/** The same hold in seconds, for pages that animate with raw motion props. */
export function useEntranceHoldSeconds(): number {
  return useEntranceHoldMs() / 1000;
}

/**
 * False until this element's entrance may play, true from then on. Elements
 * mounted after the hold has passed (anything below the fold, later pages)
 * arm immediately, so the hold only ever touches the arrival it was set for.
 */
function useArmed(): boolean {
  const holdMs = useEntranceHoldMs();
  const [armed, setArmed] = useState(holdMs <= 0);

  useEffect(() => {
    if (armed) return;
    const id = window.setTimeout(() => setArmed(true), holdMs);
    return () => window.clearTimeout(id);
  }, [armed, holdMs]);

  return armed;
}

/** Page gutters. One value for every section so nothing drifts. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-5 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}

/** Tracked uppercase key: register numbers, spec labels, section titles. */
export function MetaLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`meta-label ${className}`}>{children}</span>;
}

/** Rise-and-fade on entry. The default motion for anything below the fold. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const armed = useArmed();

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={armed ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * One line of display type revealed by sliding up behind a mask.
 *
 * `overflow-hidden` clips on both axes, and a wide display face overhangs its
 * line box on both: descenders drop below it, and italic or round glyphs can
 * swing left of the text origin. Padding opens the clip box out and the
 * matching negative margin takes the space straight back, so the glyph origin
 * never moves and the line stays aligned with the rules around it. The start
 * offset then has to clear the taller mask, hence 140% rather than 105%.
 */
export function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const armed = useArmed();

  return (
    <span
      className={`block overflow-hidden pb-[0.16em] pl-[0.06em] -mb-[0.16em] -ml-[0.06em] ${className}`}
    >
      <motion.span
        className="block"
        initial={{ y: "140%" }}
        animate={{ y: armed ? "0%" : "140%" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Live / in progress / under maintenance, drawn as a dot and a key. */
export function StatusTag({
  status,
  tone,
  className = "",
}: {
  status: Status;
  tone: Tone;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${status.dot} ${
          status.pulse ? "animate-pulse" : ""
        }`}
      />
      <MetaLabel className={tone.dim}>{status.label}</MetaLabel>
    </span>
  );
}

/**
 * A fixed-ratio plate for project imagery.
 *
 * The screenshots range from 4:3 mockups to 16:9 captures, so they are
 * contained rather than cropped: every tile then has an identical height and
 * nothing gets cut off at the edges.
 */
export function Plate({
  src,
  alt,
  tone,
  ratio = "aspect-[4/3]",
  className = "",
  imgClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  tone: Tone;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${ratio} ${tone.inset} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-contain p-4 md:p-6 ${imgClassName}`}
      />
    </div>
  );
}
