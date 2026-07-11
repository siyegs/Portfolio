// Cloudflare Worker entry for production (free tier, no credit card).
// Deploy: `bunx wrangler deploy` after setting the secret:
//   bunx wrangler secret put GROQ_API_KEY
// Then point the frontend at the Worker URL via VITE_CHAT_ENDPOINT.

import { streamChat } from "../api/chat-core";

interface Env {
  GROQ_API_KEY: string;
}

// Lock this down to your own origins in production.
const ALLOWED_ORIGINS = [
  "https://iyegeresk.web.app",
  "https://iyegeresk.firebaseapp.com",
  "http://localhost:5173",
];

function corsHeaders(origin: string): Record<string, string> {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const res = await streamChat(body as never, env.GROQ_API_KEY);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(cors)) headers.set(k, v);
    return new Response(res.body, { status: res.status, headers });
  },
};
