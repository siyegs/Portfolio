// Framework-neutral core for the Interview Me chat endpoint.
// Holds no secrets itself - the caller passes the Groq API key so this file
// works unchanged in the Vite dev middleware and in a Cloudflare Worker.

import { SYSTEM_PROMPT } from "./knowledge";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatBody {
  messages?: ChatMessage[];
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// Free, fast, open-weight (shown as "Llama 3.3 70B" in the Groq console).
const MODEL = "llama-3.3-70b-versatile";

const MAX_HISTORY = 12; // cap turns sent upstream (cost + prompt-injection safety)
const MAX_CHARS = 1500; // cap length of any single user message

/** Calls Groq and returns a streaming (SSE) fetch Response. */
export async function streamChat(
  body: ChatBody,
  apiKey: string | undefined,
): Promise<Response> {
  if (!apiKey) {
    return json({ error: "Server is missing GROQ_API_KEY." }, 500);
  }

  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const clean = incoming
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (clean.length === 0) {
    return json({ error: "No message provided." }, 400);
  }

  const upstream = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.5,
      max_tokens: 700,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...clean],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return json(
      { error: "Upstream model error.", status: upstream.status, detail },
      502,
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

function json(obj: unknown, status: number): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
