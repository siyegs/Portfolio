import shopCo from "../assets/shopCo.webp";
import asl from "../assets/asl.webp";
import kdc from "../assets/kdc.webp";
// ISK Chat removed; its image was deleted with the other unused assets.
import mystra from "../assets/iuy.webp";
import payKit from "../assets/pay-kit.png";
import losslessTrim from "../assets/react-native-lossless-trim.svg";
import otaGuard from "../assets/expo-ota-guard.svg";
import packaMark from "../assets/packa-mark.jpg";
import mystraLandingPage from "../assets/mystra-landing-page/ipad-pro-mockup.webp";
import proverseDisplay from "../assets/proverse-display.png";

//kdcERP
import kdcERP from "../assets/kdcERP/kdcERP.png";
import kdcERP1 from "../assets/kdcERP/Screenshot_3-8-2025_14529_factory.kidsdesigncompany.com.jpeg";
import kdcERP2 from "../assets/kdcERP/kdcERPLaptopWOFrame.jpeg";
import kdcERP3 from "../assets/kdcERP/kdc3.jpeg";

export interface Project {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  color: string;
  image: string;
  description: string;
  highlights?: string[];
  curveImg?: boolean;
  ongoing?: boolean;
  url?: string;
  androidDownloadUrl?: string;
  iosAppStoreUrl?: string;
  slideshowImages?: string[];
  hasRBAC?: boolean;
  demoRolesURL?: { role: string; url: string }[];
  requestDemoEmail?: string;
  underMaintenance?: boolean;
  isDemo?: boolean;
}

const projectsData: Project[] = [
  {
    title: "Mystra App",
    slug: "mystra-app",
    category: "Mobile App",
    tags: ["Verified Brand-Creator Matching", "Escrow & Identity-Verified Payouts", "Pay-for-Performance Campaigns", "Social Discovery & Collaboration"],
    color: "bg-purple-500",
    image: mystra,
    curveImg: true,
    ongoing: false,
    iosAppStoreUrl: "https://apps.apple.com/ng/app/mystra/id6761019285",
    androidDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.iyegeres.mystraappfinal",
    description: `Brands waste budget on influencers they cannot vet, and creators get burned doing unpaid work. Mystra closes that trust gap. Businesses post campaigns with budgets, niches, and deliverables, then review and approve verified applicants from one place, while creators discover paid opportunities, track milestones, and get paid through an in-app wallet with identity-verified, escrow-backed payouts. Real-time messaging, follower graphs, and a social video feed keep discovery and collaboration in one place people can trust.`,
    highlights: [
      "Brand campaign creation with budgets, niches, and deliverables",
      "Creator wallet with identity-verified milestone payouts",
      "Real-time chat, push notifications, and a full-screen video feed",
    ],
  },
  {
    title: "pay-kit",
    slug: "pay-kit",
    category: "Open Source",
    tags: ["Unified Payments API", "Bank Payouts & Transfers", "Automatic Provider Fallback", "Signature-Verified Webhooks"],
    color: "bg-[#cb3837]",
    image: payKit,
    curveImg: true,
    ongoing: false,
    url: "https://sdk-paykit.web.app",
    description: `Every serious African product ends up wiring both Paystack and Flutterwave for coverage and better rates, then rewriting the same fragile glue each time - different APIs, webhook signatures, and currency units. pay-kit removes that: one typed SDK over both providers to collect money (initialize, verify, refunds) and send it out (bank payouts and transfers), with signature-verified webhooks and automatic provider fallback so a Paystack outage does not stop you taking money. Amounts stay subunit-safe to kill rounding bugs, everything is fully typed, and it ships to npm with a green test suite.`,
    highlights: [
      "One typed API across Paystack and Flutterwave",
      "Collect and pay out: charges, refunds, and bank transfers",
      "Automatic provider fallback on outages (network / 5xx / 429)",
      "Signature-verified webhooks normalized to one event shape",
    ],
  },
  {
    title: "react-native-lossless-trim",
    slug: "react-native-lossless-trim",
    category: "Open Source",
    tags: ["Lossless Video Trim", "Zero ffmpeg, Native APIs", "Near-Instant Stream-Copy", "iOS + Android, New Arch"],
    color: "bg-[#0b1120]",
    image: losslessTrim,
    curveImg: true,
    ongoing: false,
    url: "https://github.com/siyegs/react-native-lossless-trim",
    description: `Every popular React Native video-trimming library bundles ffmpeg: tens of megabytes of binary, a re-encode on every clip that quietly degrades quality, and a dependency on ffmpeg-kit, which was retired in 2025. react-native-lossless-trim takes the opposite path. It trims by stream-copying the encoded frames on the platform's own native APIs - AVAssetExportSession passthrough on iOS, MediaExtractor and MediaMuxer on Android - so the cut is lossless, near-instant, and adds essentially no binary weight. It also fixes the subtle Android audio/video desync that most passthrough trimmers ship with, by rebasing both tracks to a single shared keyframe origin, and documents the iOS-versus-Android precision tradeoff openly instead of hiding it. Shipped as an Expo module with a typed TypeScript API, New Architecture support, an example app, unit-tested timing logic, and CI.`,
    highlights: [
      "Lossless, ffmpeg-free trim on native platform APIs",
      "Near-instant stream-copy: no re-encode, ~0 MB added",
      "Fixes the Android audio/video desync via a shared keyframe origin",
      "Typed Expo module, New Arch, example app, and CI",
    ],
  },
  {
    title: "Business ERP",
    slug: "kids-design-company-erp",
    url: "http://factory.kidsdesigncompany.com/",
    category: "Web Dev",
    tags: ["Role-Based Access Control", "Inventory Movement Tracking", "P&L Analytics"],
    color: "bg-blue-500",
    image: kdcERP,
    description: `A growing factory was running inventory, staff, and finances across disconnected spreadsheets with no single source of truth. This ERP pulls them into one system with real-time operational visibility. Role-based access control and role-scoped dashboards protect sensitive data while keeping workflows efficient, inventory movement is tracked end to end, and P&L insights plus admin tooling turn day-to-day operations into decisions.`,
    highlights: [
      "Role-scoped dashboards and permissions (RBAC)",
      "Inventory movement tracking and P&L insights",
      "Admin tooling for day-to-day operations",
    ],
    slideshowImages: [kdcERP1, kdcERP3, kdcERP2],
    hasRBAC: true,
    demoRolesURL: [
      { role: "CEO", url: "https://erp.fluxdevs.com/ceo/dashboard" },
      { role: "Factory Manager", url: "https://erp.fluxdevs.com/factory-manager/dashboard" },
      { role: "Project Manager", url: "https://erp.fluxdevs.com/project-manager/dashboard" },
      { role: "Store Keeper", url: "https://erp.fluxdevs.com/store-keeper/dashboard" },
      { role: "Admin", url: "https://erp.fluxdevs.com/admin/dashboard" },
    ],
  },
  {
    title: "expo-ota-guard",
    slug: "expo-ota-guard",
    category: "Open Source",
    tags: ["OTA vs Native Classifier", "Live Runtime Discovery", "CI Safety Gate", "Zero Config CLI"],
    color: "bg-[#f59e0b]",
    image: otaGuard,
    curveImg: true,
    ongoing: false,
    url: "https://github.com/siyegs/expo-ota-guard",
    description: `Expo teams ship over-the-air updates blind. Add a native dependency or touch a config plugin, publish an OTA, and expo-updates fails silently: the JS lands on a binary that cannot run it, so the feature no-ops or the app crashes, and nothing in the publish output warned you. expo-ota-guard is a zero-config CLI that reads your pending changes and answers one question before you run eas update - is this safe to ship over the air, and to which live runtime? It classifies every changed file and explains each call: dependencies are judged by what is actually installed in node_modules (android/, ios/, cpp/, podspec, build.gradle, config plugin), app config is diffed field by field against native versus JS-only tables, and anything unrecognized is surfaced for review rather than assumed safe. It also reads live runtimes from eas update:list - the only source that sees local and CI builds - flags channel-to-branch mismatches that would send an update to nobody, and audits the stale-bundle config trap that makes good fixes look broken. With --ci it emits JSON and exits non-zero, so the publish step never runs on a change that needed a build instead.`,
    highlights: [
      "Classifies every pending change as OTA-safe or native-affecting, with a reason",
      "Reads live runtimes from eas update:list, which sees local and CI builds",
      "Warns on channel-to-branch mismatches that send updates to nobody",
      "--ci gate: JSON output and a non-zero exit before eas update runs",
    ],
  },
  {
    title: "ProVerse",
    slug: "proverse",
    url: "",
    category: "Desktop App",
    tags: ["Real-Time Speech-to-Text", "Automatic Verse Detection", "Offline KJV Lookup & Caching"],
    color: "bg-purple-500",
    image: proverseDisplay,
    curveImg: true,
    ongoing: false,
    description: `During live services, operators scramble to find and project Bible verses the moment they are spoken, and every delay breaks the flow of worship. ProVerse removes the manual work: it listens to sermon audio, turns speech into text, and detects verse references as they are spoken, resolving them fast from a local KJV library with fallback lookup, caching, and deduplication to cut delays and avoid repeats. Manual text mode, chapter and verse selection, recent-verse history, and smooth fade-in transitions keep operators in control when they need it.`,
    highlights: [
      "Live speech-to-text from sermon audio",
      "Automatic Bible verse detection with local KJV lookup",
      "Caching and deduplication for fast, repeat-free projection",
    ],
    requestDemoEmail: "iyegeresuccess@gmail.com",
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Packa",
    slug: "packa",
    category: "Mobile App",
    tags: ["Two-Sided Marketplace", "Geo Job Matching", "Status-Based Tracking"],
    color: "bg-[#e6f4fe]",
    image: packaMark,
    curveImg: true,
    ongoing: true,
    requestDemoEmail: "iyegeresuccess@gmail.com",
    description: `Apartment residents struggle to get waste collected reliably, and informal pickers lack a steady stream of nearby jobs. Packa connects the two sides of that problem. Residents save their apartment details, request a pickup with the waste type and notes, and track their board from request to completion, while pickers get a focused view of open jobs in their service area, accept quickly, and keep their queue organized by status. The result makes apartment waste collection easier to request, assign, and follow through.`,
    highlights: [
      "Resident pickup requests with waste type and notes",
      "Picker job board scoped to each service area",
      "Status-based tracking from request to completion",
    ],
  },
  {
    title: "Kids Design Company",
    slug: "kids-design-company",
    url: "https://kidsdesigncompany.com/",
    category: "Web Dev",
    tags: ["JWT & Google OAuth", "Cart & Wishlist", "Flutterwave & Paystack"],
    color: "bg-red-300",
    image: kdc,
    curveImg: false,
    ongoing: false,
    description: `A children's brand needed to sell online without losing customers to clunky sign-in or unreliable checkout. This storefront removes that friction with secure JWT and Google OAuth authentication and a smooth catalog, cart, and wishlist flow, backed by Flutterwave and Paystack payments and an admin dashboard for inventory and orders. Reliable API integration, clean UX, and a maintainable component structure keep it converting as it grows.`,
    highlights: [
      "JWT and Google OAuth authentication",
      "Catalog, cart, and wishlist with an admin dashboard",
      "Flutterwave and Paystack payments",
    ],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Mystra - AI and automation",
    slug: "mystra-ai-automation",
    url: "https://www.mystrahq.com",
    category: "Web Dev",
    tags: ["AI Sales & Voice Agents", "WhatsApp Automation", "Order-Management Pipelines", "Verified Creator Marketplace"],
    color: "bg-emerald-200",
    image: mystraLandingPage,
    curveImg: true,
    ongoing: false,
    description: `Small businesses lose sales to slow replies and manual booking, and most cannot afford a full operations team. MystraHQ deploys AI automation that answers and sells on WhatsApp, books by voice, and runs full order-management pipelines, often live in as little as 48 hours. The same account also unlocks a creator marketplace: brands post a brief, get matched to verified creators by niche and audience, approve submissions, and pay for real performance instead of follower counts, while creators receive automatic milestone payouts as their content performs. One account spans done-for-you AI automation and creator-driven growth, with escrow, identity and business verification, and shipping built in.`,
    highlights: [
      "WhatsApp sales agents and voice booking systems",
      "Full order-management pipelines, live in about 48 hours",
      "Creator marketplace with escrow and verified payouts",
    ],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "ASL Originals",
    slug: "asl-originals",
    url: "https://asluxuryoriginals.com/",
    category: "Web Dev",
    tags: ["JWT Auth & Protected Routes", "REST API Integration", "Cart & Wishlist State"],
    color: "bg-pink-300",
    image: asl,
    curveImg: false,
    ongoing: false,
    description: `Shoppers abandon stores that feel slow or insecure on their phones. ASL Originals answers with a responsive storefront built for trust and speed: JWT authentication with protected routes, REST API integration, and state-managed cart and wishlist. Modular components keep it maintainable and consistent, so browsing stays smooth and performance holds up as the catalog scales.`,
    highlights: [
      "JWT authentication with protected routes",
      "REST API integration with cart and wishlist state",
      "Responsive, performance-tuned storefront",
    ],
    underMaintenance: false,
    isDemo: false,
  },
  // {
  //   title: "ISK Chat",
  //   slug: "isk-chat-room",
  //   url: "https://isk-chat-room.web.app",
  //   category: "Web Dev",
  //   tags: ["Real-Time Messaging", "Permission-Based Rooms", "Media Sharing & Notifications"],
  //   color: "bg-purple-400",
  //   image: chatApp,
  //   curveImg: false,
  //   ongoing: false,
  //   description: `Group conversations break down when the wrong people reach the wrong rooms and updates lag behind. ISK Chat keeps communication tight and controlled: secure sign-in with permission-based room access, live message updates, media sharing, and notifications across mobile and desktop. It is built around reliable delivery, clear access rules, and simple flows that keep conversations moving.`,
  //   highlights: [
  //     "Secure sign-in with permission-based rooms",
  //     "Live message updates and media sharing",
  //     "Notifications across mobile and desktop",
  //   ],
  //   underMaintenance: false,
  //   isDemo: false,
  // },
  {
    title: "Shop Co",
    slug: "shop-co",
    url: "https://shop.fluxdevs.com/",
    category: "Web Dev",
    tags: ["JWT & Google OAuth", "Dynamic Product Listings", "Flutterwave & Paystack"],
    color: "bg-[#aab2d1]",
    image: shopCo,
    curveImg: false,
    ongoing: false,
    description: `Turning browsers into buyers takes frictionless sign-in and a checkout people actually trust. Shop Co delivers both: JWT and Google OAuth authentication, dynamic product listings, and a full checkout flow, with Flutterwave and Paystack payments and reusable cart and wishlist components. Responsive design and clean API boundaries keep the experience fast and easy to build on.`,
    highlights: [
      "JWT and Google OAuth with a full checkout flow",
      "Dynamic product listings and reusable cart/wishlist",
      "Flutterwave and Paystack integration",
    ],
    underMaintenance: false,
    isDemo: false,
  },
];

export default projectsData;


