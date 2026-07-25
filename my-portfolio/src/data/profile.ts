/**
 * The facts the About page is built from.
 *
 * Kept as data rather than prose so the page cannot drift from what the
 * Interview Me AI says: api/knowledge.ts carries the same stack and the same
 * roles, and both should be updated together.
 */

export interface Role {
  company: string;
  title: string;
  url?: string;
}

export const ROLES: Role[] = [
  { company: "MystraHQ", title: "Lead Developer", url: "https://www.mystrahq.com" },
  { company: "Fluxdevs", title: "Staff Software Engineer", url: "https://fluxdevs.com" },
];

export interface Capability {
  label: string;
  items: string[];
}

export const CAPABILITIES: Capability[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Dart"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "TanStack", "Three.js"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo", "Flutter", "iOS", "Android", "New Architecture"],
  },
  {
    label: "Backend",
    items: ["NestJS", "Node.js", "REST", "WebSockets", "TypeORM", "Prisma"],
  },
  { label: "Data", items: ["PostgreSQL", "Redis", "MongoDB", "Firebase"] },
  { label: "Infra", items: ["Docker", "Nginx", "CI/CD", "Cloudflare Workers"] },
  { label: "Payments", items: ["Paystack", "Flutterwave", "Wallets", "Escrow payouts"] },
  { label: "Auth", items: ["JWT", "Google OAuth", "Apple Sign-In"] },
];
