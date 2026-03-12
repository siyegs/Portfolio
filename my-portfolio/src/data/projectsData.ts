import shopCo from "../assets/shopCo.webp";
import asl from "../assets/asl.webp";
import kdc from "../assets/kdc.webp";
import amazite from "../assets/amazite.webp";
import chatApp from "../assets/chatAppTablet.png";
import mystra from "../assets/iuy.png";
import mystraLandingPage from "../assets/mystra-landing-page/ipad-pro-mockup.png";
import proverseDisplay from "../assets/proverse-display.png";

//kdcERP
import kdcERP from "../assets/kdcERP/kdcERP.png";
import kdcERP1 from "../assets/kdcERP/Screenshot_3-8-2025_14529_factory.kidsdesigncompany.com.jpeg";
import kdcERP2 from "../assets/kdcERP/kdcERPLaptopWOFrame.jpeg";
import kdcERP3 from "../assets/kdcERP/kdc3.jpeg";

const projectsData = [
  {
    title: "Mystra App",
    slug: "mystra-app",
    category: "Mobile App",
    tags: ["Social Media", "UGC", "Influencer Marketing"],
    color: "bg-purple-500",
    image: mystra,
    curveImg: true,
    ongoing: true,
    description: `Cross-platform influencer marketing app that connects brands with creators through structured, role-based flows. Businesses define campaigns (budget, niche, deliverables) and review applications, while creators discover opportunities, apply, and track outcomes. Built a vertical, full-screen media feed with auto-advancing carousels, plus real-time chat via WebSockets with optimistic UI, offline queueing, and read receipts. Push notifications, follower graphs, and editable profile galleries complete the social layer.`,
    tools: ["React Native", "TypeScript", "Socket.IO", "NativeWind", "Firebase"],
  },
  {
    title: "Business ERP",
    slug: "kids-design-company-erp",
    url: "http://factory.kidsdesigncompany.com/",
    category: "Web Dev",
    tags: ["ERP", "Financial Analytics"],
    color: "bg-blue-500",
    image: kdcERP,
    description: `End-to-end ERP that unifies inventory, employee records, and financials to deliver real-time operational visibility. Implemented RBAC with role-scoped dashboards and permissions to protect sensitive data while keeping workflows efficient. Includes inventory movement tracking, P&L insights, and admin tooling for daily operations.`,
    tools: ["React", "Tailwind CSS", "TypeScript", "Stripe"],
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
    tags: ["Church Tech", "AI", "Real-Time"],
    color: "bg-purple-500",
    image: proverseDisplay,
    curveImg: true,
    ongoing: false,
    description: `Desktop app for live church projection that listens to sermon audio, transcribes speech with Groq Whisper, and detects verse references using a Groq Llama model. Verses resolve instantly from a local KJV dataset with API fallback, plus caching and deduplication to minimize latency and repeat displays. Projector-optimized UI includes manual text mode, chapter and verse selection, recent-verse history, and smooth fade-in transitions.`,
    tools: ["Python", "Groq Whisper", "Groq Llama", "Tkinter", "SoundDevice"],
    requestDemoEmail: "iyegeresuccess@gmail.com",
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Kids Design Company",
    slug: "kids-design-company",
    url: "https://kidsdesigncompany.com/",
    category: "Web Dev",
    tags: ["E-commerce"],
    color: "bg-red-300",
    image: kdc,
    curveImg: false,
    ongoing: false,
    description: `Production e-commerce storefront with secure JWT and Google OAuth authentication, product catalog, cart, and wishlist. Integrated Flutterwave and Paystack for payments and built an admin dashboard for inventory and order management. Focused on reliable API integration, clean UX, and maintainable component structure.`,
    tools: ["React", "Tailwind CSS", "TypeScript", "Stripe"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Mystra Landing Page",
    slug: "mystra-landing-page",
    url: "https://mystrahq.com",
    category: "Web Dev",
    tags: ["Landing Page", "Marketing"],
    color: "bg-emerald-200",
    image: mystraLandingPage,
    curveImg: true,
    ongoing: false,
    description: `High-converting marketing site for Mystra with a clear narrative from hero to features, workflows, and social proof. Implemented animated device mockups, scroll-triggered reveals, and micro-interactions using Framer Motion without sacrificing performance. Built with a modular layout system to keep content updates simple.`,
    tools: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "ASL Originals",
    slug: "asl-originals",
    url: "https://asluxuryoriginals.com/",
    category: "Web Dev",
    tags: ["E-commerce"],
    color: "bg-pink-300",
    image: asl,
    curveImg: false,
    ongoing: false,
    description: `Responsive e-commerce experience with JWT authentication, REST API integration, and state-managed cart and wishlist. Implemented protected routes and modular components for maintainability and scale. Optimized for smooth browsing and consistent performance across devices.`,
    tools: ["React", "Tailwind CSS", "TypeScript", "Stripe"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "ISK Chat",
    slug: "isk-chat-room",
    url: "https://isk-chat-room.web.app",
    category: "Web Dev",
    tags: ["Chat App", "Network"],
    color: "bg-purple-400",
    image: chatApp,
    curveImg: false,
    ongoing: false,
    description: `Real-time chat app on Firebase with secure authentication, live message sync, and permission-based room access. Supports media sharing, notifications, and a clean responsive UI across mobile and desktop. Designed for reliability with resilient data updates and clear access workflows.`,
    tools: ["React", "Tailwind CSS", "Firebase"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Shop Co",
    slug: "shop-co",
    url: "https://shop.fluxdevs.com/",
    category: "Web Dev",
    tags: ["E-commerce"],
    color: "bg-[#aab2d1]",
    image: shopCo,
    curveImg: false,
    ongoing: false,
    description: `Modern e-commerce platform with JWT and Google OAuth, dynamic product listings, and a full checkout flow. Integrated Flutterwave and Paystack for payments and built reusable components for cart and wishlist management. Emphasized responsive design and clean API boundaries.`,
    tools: ["React", "Tailwind CSS", "TypeScript", "Stripe"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Amazite Academy",
    slug: "amazite-academy",
    url: "https://amaziteacademy.com/",
    category: "Web Dev",
    tags: ["Education"],
    color: "bg-blue-400",
    image: amazite,
    curveImg: false,
    ongoing: true,
    description: `Education platform with dynamic program listings, clear navigation, and mobile-first layouts. Built with React and Tailwind CSS to keep the UI fast and consistent across devices. Focused on content discoverability and a smooth onboarding path for prospective students.`,
    tools: ["React", "Tailwind CSS"],
    underMaintenance: false,
    isDemo: false,
  },
];

export default projectsData;


