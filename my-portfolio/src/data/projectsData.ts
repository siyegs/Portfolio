import shopCo from "../assets/shopCo.webp";
import asl from "../assets/asl.webp";
import kdc from "../assets/kdc.webp";
import amazite from "../assets/amazite.webp";
import chatApp from "../assets/chatAppTablet.png";

//kdcERP
import kdcERP from "../assets/kdcERP/kdcERP.png";
import kdcERP1 from "../assets/kdcERP/Screenshot_3-8-2025_14529_factory.kidsdesigncompany.com.jpeg";
import kdcERP2 from "../assets/kdcERP/kdcERPLaptopWOFrame.jpeg";
import kdcERP3 from "../assets/kdcERP/kdc3.jpeg";

const projectsData = [
  {
    title: "Mystra",
    slug: "mystra-app",
    url: "",
    category: "Mobile App",
    tags: ["Influencer"],
    color: "bg-green-400",
    image: "",
    ongoing: true,
    description: `Mystra is an influencer marketing mobile application designed to connect brands with social media influencers for effective marketing campaigns. The app allows brands to discover, collaborate, and manage influencer partnerships seamlessly. Influencers can create profiles, showcase their work, and connect with potential brand partners. Key features include campaign management, performance analytics, and secure payment processing. Mystra aims to streamline the influencer marketing process, making it easier for brands to reach their target audience through authentic influencer collaborations.`,
    tools: ["React Native", "Firebase"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "Business ERP",
    slug: "kids-design-company-erp",
    url: "http://factory.kidsdesigncompany.com/",
    category: "Web Dev",
    tags: ["ERP"],
    color: "bg-blue-500",
    image: kdcERP,
    ongoing: false,
    description: `The ERP provides end-to-end tracking of company activities, including profit and loss calculations, employee and inventory records, delivering actionable insights for informed decision-making. Implemented Role-Based Access Control (RBAC) to enforce secure, granular access management, safeguarding sensitive data and tailoring permissions to user roles. Key functionalities include real-time inventory management, financial analytics, and employee administration, creating a unified platform for streamlined business processes.`,
    tools: ["React", "Tailwind CSS", "TypeScript"],
    underMaintenance: false,
    isDemo: false,
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
    title: "ASL Originals",
    slug: "asl-originals",
    url: "https://asluxuryoriginals.com/",
    category: "Web Dev",
    tags: ["E-commerce"],
    color: "bg-pink-300",
    image: asl,
    ongoing: false,
    description:
      "Fully responsive e-commerce application, featuring secure JWT-based authentication, dynamic product data consumption from a RESTful API, and robust state management for cart and wishlist functionalities. Implements efficient API communication, protected routes, and modular component architecture to ensure scalability and maintainability across different devices. Hey! You are here. Why don't you shop for something special?",
    tools: ["React", "Tailwind CSS", "TypeScript"],
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
    ongoing: false,
    description: `Your kid will love it here, so would you! This features secure authentication using JWT and Google OAuth, dynamic product listings, and full e-commerce functionality including a shopping cart and wishlist. Online payments are processed through Flutterwave and Paystack, offering secure and flexible checkout options. 
    An admin dashboard allows authorized users to add, update, and delete products, managing the store's inventory directly from the platform. The admin panel, is available for demonstration upon request.`,
    tools: ["React", "Tailwind CSS", "TypeScript"],
    underMaintenance: false,
    isDemo: false,
  },
  {
    title: "ISK Chat",
    slug: "isk-chat-room",
    url: "https://isk-chat-room.web.app",
    category: "Web Dev",
    tags: ["Chat App"],
    color: "bg-purple-400",
    image: chatApp,
    ongoing: false,
    description: `Modern, real-time chat application powered by a serverless backend. Features secure, persistent user authentication, real-time messaging, and a sophisticated, permission-based chat access system with requests, accept/revoke, and grant-back capabilities. The application includes multimedia support and real-time notifications. Leveraging Firestore for live data synchronization, the fully responsive interface provides a seamless and intuitive user experience across all devices.`,
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
    ongoing: false,
    description:
      "A modern e-commerce platform built with React and Tailwind CSS. Features secure JWT and Google OAuth authentication, dynamic product listings, shopping cart, wishlist, and online payment through Flutterwave and Paystack. REST API integration and responsive UI provide a seamless user experience.",
    tools: ["React", "Tailwind CSS", "TypeScript"],
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
    ongoing: true,
    description:
      "A responsive web application for students seeking educational programs and guidance. Developed with React.js and styled with Tailwind CSS, the platform features dynamic course listings, an intuitive navigation flow, and mobile-friendly design to improve user engagement.",
    tools: ["React", "Tailwind CSS"],
    underMaintenance: false,
    isDemo: false,
  },
];

export default projectsData;
