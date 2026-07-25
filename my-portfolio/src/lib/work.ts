/**
 * Shared vocabulary for the work index and the project pages.
 *
 * Both pages draw structure with hairlines instead of cards, and both need the
 * same per-theme class set. Keeping it here means the two canvases (ink and
 * paper) and the accent cannot drift apart between the two routes.
 */
import type { Project } from "../data/projectsData";

export interface Tone {
  isDark: boolean;
  /** Page canvas. Kept translucent so the 3D scene behind still reads. */
  page: string;
  /** The hairline. This is the only structural device on these pages. */
  rule: string;
  ruleStrong: string;
  /** Body copy, then the quieter meta layer. */
  body: string;
  dim: string;
  faint: string;
  /** Accent text and fill. Periwinkle on ink, warm brown on paper. */
  accent: string;
  accentFill: string;
  /** Barely-there fill for image plates and hover wipes. */
  inset: string;
  insetStrong: string;
  /** Full inversion, used for the one solid button per page. */
  invert: string;
  invertHover: string;
}

export function tone(theme: string): Tone {
  const isDark = theme === "dark";

  return {
    isDark,
    page: isDark ? "bg-ink/90 text-paper" : "bg-paper/90 text-ink",
    rule: isDark ? "border-paper/[0.13]" : "border-ink/[0.14]",
    ruleStrong: isDark ? "border-paper/30" : "border-ink/30",
    body: isDark ? "text-paper/80" : "text-ink/[0.78]",
    dim: isDark ? "text-paper/55" : "text-ink/60",
    faint: isDark ? "text-paper/35" : "text-ink/40",
    accent: isDark ? "text-accent" : "text-accent-warm",
    accentFill: isDark ? "bg-accent" : "bg-accent-warm",
    inset: isDark ? "bg-paper/[0.04]" : "bg-ink/[0.04]",
    insetStrong: isDark ? "bg-paper/[0.07]" : "bg-ink/[0.06]",
    invert: isDark ? "bg-paper text-ink" : "bg-ink text-paper",
    invertHover: isDark ? "hover:bg-accent" : "hover:bg-accent-warm",
  };
}

export interface Status {
  label: string;
  /** Tailwind background class for the state dot. */
  dot: string;
  pulse: boolean;
}

/** A project counts as live if there is somewhere the visitor can actually go. */
export function isLive(project: Project): boolean {
  return Boolean(
    project.iosAppStoreUrl ||
      project.androidDownloadUrl ||
      (project.url && project.url.length > 0),
  );
}

export function statusOf(project: Project): Status | null {
  if (project.ongoing) {
    return { label: "In progress", dot: "bg-green-500", pulse: true };
  }
  if (project.underMaintenance) {
    return { label: "Under maintenance", dot: "bg-red-500", pulse: true };
  }
  if (isLive(project)) {
    return { label: "Live", dot: "bg-emerald-500", pulse: false };
  }
  return null;
}

/**
 * Where the primary call to action points, labelled by destination: an
 * open-source repo or an npm package is not a "live site".
 */
export function primaryLink(
  project: Project,
): { href: string; label: string } | null {
  if (!project.url) return null;
  if (project.url.includes("npmjs.com")) {
    return { href: project.url, label: "View on npm" };
  }
  if (project.url.includes("github.com")) {
    return { href: project.url, label: "View on GitHub" };
  }
  return { href: project.url, label: "Visit live site" };
}

/** Two-digit register number, e.g. 1 -> "01". */
export function indexLabel(i: number): string {
  return String(i + 1).padStart(2, "0");
}
