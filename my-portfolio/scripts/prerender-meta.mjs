/**
 * Post-build meta prerender (no headless browser, no hydration changes).
 *
 * Vite outputs a single dist/index.html whose <head> carries the home-page
 * meta. Social crawlers (LinkedIn, WhatsApp, X, Slack, Facebook) do NOT run
 * JavaScript, so a shared deep link like /projects/mystra-app would otherwise
 * show the generic home-page card. This script clones index.html into a
 * per-route dist/<route>/index.html with that route's title / description /
 * Open Graph tags rewritten in the static HTML. The React bundle still boots
 * and hydrates normally - only the <head> is customized per file.
 *
 * Firebase Hosting serves these concrete files before applying the SPA
 * rewrite, so real routes get real meta while unknown paths still fall
 * through to the client-rendered app.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const SITE = "https://iyegeresk.web.app";
const NAME = "Iyegere Success Karboloo";

const template = readFileSync(join(DIST, "index.html"), "utf8");

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Static (non-project) routes.
const routes = [
  {
    path: "/about",
    title: `About | ${NAME}`,
    description:
      "About Iyegere Success Karboloo - a Full-Stack Engineer in Nigeria, Lead Developer at MystraHQ and Staff Software Engineer at Fluxdevs, working across web, mobile and backend.",
  },
  {
    path: "/projects",
    title: `Projects | ${NAME}`,
    description:
      "Selected projects by Iyegere Success Karboloo - influencer marketing apps, ERPs, e-commerce platforms and real-time products across web, mobile and backend.",
  },
  {
    path: "/contact",
    title: `Contact | ${NAME}`,
    description:
      "Get in touch with Iyegere Success Karboloo - Full-Stack Engineer for web, mobile and backend projects, remote work and collaborations.",
  },
];

// Project routes. Kept as a compact map here (build-time only) so this script
// stays dependency-free; update alongside src/data/projectsData.ts.
const projects = [
  ["mystra-app", "Mystra App", "Influencer marketing app that fixes brand-creator trust: verified matching, escrow and identity-verified payouts, and pay-for-performance campaigns across web and mobile."],
  ["pay-kit", "pay-kit", "Open-source TypeScript SDK unifying Paystack and Flutterwave: one typed API to collect (initialize, verify, refunds) and pay out (bank transfers), with signature-verified webhooks and automatic provider fallback. Published on npm."],
  ["react-native-lossless-trim", "react-native-lossless-trim", "Open-source React Native / Expo module for lossless, ffmpeg-free video trimming. Stream-copy passthrough on native APIs (AVAssetExportSession / MediaMuxer): no re-encode, near-instant, and it fixes the Android audio/video desync."],
  ["kids-design-company-erp", "Business ERP", "A factory ran inventory, staff and finances on disconnected spreadsheets. This ERP unifies them with RBAC dashboards, inventory tracking and P&L insights."],
  ["proverse", "ProVerse", "Live services stall when operators hunt for verses mid-sermon. ProVerse auto-detects Bible references from speech with fast local KJV lookup and caching."],
  ["packa", "Packa", "Residents cannot get waste collected reliably and pickers lack nearby jobs. Packa connects both with pickup requests and status tracking to completion."],
  ["kids-design-company", "Kids Design Company", "A children's brand needed to sell online without clunky sign-in or shaky checkout: secure JWT and Google OAuth, cart, wishlist and Flutterwave/Paystack payments."],
  ["mystra-ai-automation", "Mystra - AI and automation", "Small businesses lose sales to slow replies and manual booking. MystraHQ deploys AI WhatsApp sales, voice booking and order pipelines, plus a creator marketplace."],
  ["asl-originals", "ASL Originals", "Shoppers abandon slow, insecure mobile stores. ASL Originals answers with a fast, responsive storefront: JWT auth, protected routes and REST API integration."],
  ["shop-co", "Shop Co", "Browsers become buyers only with frictionless sign-in and trusted checkout. Shop Co delivers JWT and Google OAuth, dynamic listings and Flutterwave/Paystack payments."],
].map(([slug, title, description]) => ({
  path: `/projects/${slug}`,
  title: `${title} | ${NAME}`,
  description,
}));

const all = [...routes, ...projects];

// Replace the content of a specific meta/link tag, tolerant of the multi-line
// attribute formatting Vite emits. Captures everything up to the closing quote
// of the target attribute and swaps in the new value.
function setAttr(html, opening, value) {
  const re = new RegExp(`(${opening})[^"]*(")`);
  if (!re.test(html)) {
    throw new Error(`prerender-meta: pattern not found -> ${opening}`);
  }
  return html.replace(re, `$1${value}$2`);
}

function render(html, { path, title, description }) {
  const url = `${SITE}${path}`;
  const t = esc(title);
  const d = esc(description);
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  out = setAttr(out, '<meta\\s+name="description"\\s+content="', d);
  out = setAttr(out, '<link\\s+rel="canonical"\\s+href="', url);
  out = setAttr(out, '<meta\\s+property="og:url"\\s+content="', url);
  out = setAttr(out, '<meta\\s+property="og:title"\\s+content="', t);
  out = setAttr(out, '<meta\\s+property="og:description"\\s+content="', d);
  out = setAttr(out, '<meta\\s+name="twitter:title"\\s+content="', t);
  out = setAttr(out, '<meta\\s+name="twitter:description"\\s+content="', d);
  return out;
}

let count = 0;
for (const route of all) {
  const outDir = join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), render(template, route), "utf8");
  count++;
}

console.log(`prerender-meta: wrote ${count} per-route index.html files`);
