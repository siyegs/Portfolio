import shopCo from "../assets/shopCo.webp";
import asl from "../assets/asl.webp";
import kdc from "../assets/kdc.webp";
import chatApp from "../assets/chatAppTablet.png";
import mystra from "../assets/iuy.png";
import packaMark from "../assets/packa-mark.jpg";
import mystraLandingPage from "../assets/mystra-landing-page/ipad-pro-mockup.png";
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
    tags: ["Role-Based Campaign Flows", "In-App Wallet & Verified Payouts", "Real-Time Chat & Push", "Full-Screen Video Feed"],
    color: "bg-purple-500",
    image: mystra,
    curveImg: true,
    ongoing: false,
    iosAppStoreUrl: "https://apps.apple.com/ng/app/mystra/id6761019285",
    androidDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.iyegeres.mystraappfinal",
    description: `Cross-platform influencer marketing app that connects brands with creators through structured, role-based flows. Businesses create campaigns with budgets, niches, and deliverables, then review and approve creator applications from one place. Creators discover opportunities, apply, track milestones, build profile galleries, and get paid through an in-app wallet with identity-verified payouts. Real-time messaging, read receipts, push notifications, follower graphs, and a full-screen video feed round out a product built for social discovery and trust.`,
    highlights: [
      "Brand campaign creation with budgets, niches, and deliverables",
      "Creator wallet with identity-verified milestone payouts",
      "Real-time chat, push notifications, and a full-screen video feed",
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
    description: `End-to-end ERP that unifies inventory, employee records, and financials to deliver real-time operational visibility. Implemented RBAC with role-scoped dashboards and permissions to protect sensitive data while keeping workflows efficient. Includes inventory movement tracking, P&L insights, and admin tooling for daily operations.`,
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
    title: "ProVerse",
    slug: "proverse",
    url: "",
    category: "Desktop App",
    tags: ["Real-Time Speech-to-Text", "Automatic Verse Detection", "Offline KJV Lookup & Caching"],
    color: "bg-purple-500",
    image: proverseDisplay,
    curveImg: true,
    ongoing: false,
    description: `Desktop app for live church projection that listens to sermon audio, turns speech into text, and detects Bible verse references as they are spoken. Verses resolve quickly from a local KJV library with fallback lookup, caching, and deduplication to reduce delays and avoid repeat displays. The projector-focused interface includes manual text mode, chapter and verse selection, recent-verse history, and smooth fade-in transitions for services.`,
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
    description: `Mobile-first waste pickup marketplace for Nigerian apartments, connecting residents who need collection with waste pickers ready to accept nearby jobs. Residents can create an account, save their apartment details, request a pickup with the waste type and notes, and track their own pickup board. Pickers get a focused view of open jobs in their service area, can accept requests quickly, and keep their queue organized by pickup status. The experience is designed to make apartment waste collection easier to request, easier to assign, and easier to follow from start to completion.`,
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
    description: `Production e-commerce storefront with secure JWT and Google OAuth authentication, product catalog, cart, and wishlist. Integrated Flutterwave and Paystack for payments and built an admin dashboard for inventory and order management. Focused on reliable API integration, clean UX, and maintainable component structure.`,
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
    description: `MystraHQ deploys AI-powered automation for businesses across Africa and Europe: WhatsApp sales agents, voice booking systems, and full order-management pipelines, often live in as little as 48 hours. Every client onboards as a MystraHQ Business account that also unlocks Mystra's influencer marketing platform: post a campaign brief, get matched to verified creators by niche and audience, approve submissions, and pay for real performance instead of follower counts. Creators apply to paid campaigns from verified brands, build a portfolio of real work, and receive automatic milestone payouts straight to their bank as their content performs. One account spans done-for-you AI automation and creator-driven growth, with escrow, identity and business verification, and product shipping built in.`,
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
    description: `Responsive e-commerce experience with JWT authentication, REST API integration, and state-managed cart and wishlist. Implemented protected routes and modular components for maintainability and scale. Optimized for smooth browsing and consistent performance across devices.`,
    highlights: [
      "JWT authentication with protected routes",
      "REST API integration with cart and wishlist state",
      "Responsive, performance-tuned storefront",
    ],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "ISK Chat",
    slug: "isk-chat-room",
    url: "https://isk-chat-room.web.app",
    category: "Web Dev",
    tags: ["Real-Time Messaging", "Permission-Based Rooms", "Media Sharing & Notifications"],
    color: "bg-purple-400",
    image: chatApp,
    curveImg: false,
    ongoing: false,
    description: `Real-time chat app with secure sign-in, live message updates, and permission-based room access. Users can join the right rooms, share media, receive notifications, and keep conversations moving through a clean interface that works across mobile and desktop. The experience is designed around reliable updates, clear access rules, and simple communication flows.`,
    highlights: [
      "Secure sign-in with permission-based rooms",
      "Live message updates and media sharing",
      "Notifications across mobile and desktop",
    ],
    underMaintenance: false,
    isDemo: false,
  },
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
    description: `Modern e-commerce platform with JWT and Google OAuth, dynamic product listings, and a full checkout flow. Integrated Flutterwave and Paystack for payments and built reusable components for cart and wishlist management. Emphasized responsive design and clean API boundaries.`,
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


