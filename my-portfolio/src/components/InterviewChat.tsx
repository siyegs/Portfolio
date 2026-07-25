import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import { tone } from "../lib/work";
import { MetaLabel } from "./work/primitives";

interface InterviewChatProps {
  theme: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// In production, point this at your deployed Cloudflare Worker via
// VITE_CHAT_ENDPOINT. In dev it falls back to the Vite middleware at /api/chat.
const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || "/api/chat";

const SUGGESTIONS = [
  "What's your strongest project?",
  "Do you have payments experience?",
  "Tell me about Mystra.",
  "What's your tech stack?",
];

const GREETING =
  "Hi - I'm an AI trained on Success's work. Ask me anything about his projects, stack, or experience.";

// Render plain text but make URLs clickable. Trailing sentence punctuation
// (. , ! ? : ; ) ]) is kept OUT of the link so "...mystrahq.com." never turns
// into a broken "mystrahq.com./" link.
function renderContent(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (!/^https?:\/\//.test(part)) return <span key={i}>{part}</span>;
    const trailing = part.match(/[.,!?:;)\]]+$/)?.[0] ?? "";
    const url = trailing ? part.slice(0, -trailing.length) : part;
    return (
      <span key={i}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          {url}
        </a>
        {trailing}
      </span>
    );
  });
}

const InterviewChat: React.FC<InterviewChatProps> = ({ theme }) => {
  const t = tone(theme);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const history = [...messages, { role: "user", content: question } as ChatMessage];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const info = await res.json().catch(() => ({}));
        throw new Error(info.error || `Request failed (${res.status})`);
      }

      // A misconfigured VITE_CHAT_ENDPOINT lands on the SPA's catch-all rewrite,
      // which answers 200 with index.html - a body that reads as an empty stream
      // and fails silently. Only an SSE content-type is a real answer.
      if (!res.headers.get("Content-Type")?.includes("text/event-stream")) {
        throw new Error("Chat endpoint is misconfigured.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: acc };
                return next;
              });
            }
          } catch {
            /* ignore keep-alive / partial frames */
          }
        }
      }

      if (!acc) {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content:
              "Sorry - I couldn't generate a reply just now. You can email Success at iyegeresuccess@gmail.com.",
          };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "I'm having trouble reaching my brain right now. Please try again, or email Success at iyegeresuccess@gmail.com.",
        };
        return next;
      });
    } finally {
      setBusy(false);
      controllerRef.current = null;
    }
  }

  const panel = t.isDark ? "bg-ink/95 text-paper" : "bg-paper/95 text-ink";
  const userBubble = `${t.accentFill} ${t.isDark ? "text-ink" : "text-paper"}`;
  const empty = messages.length === 0;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-3 flex h-[min(600px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden border ${t.rule} ${panel} shadow-2xl backdrop-blur-xl`}
          >
            {/* Header */}
            <div className={`flex items-center gap-3 border-b px-4 py-3 ${t.rule}`}>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center font-display text-xs ${t.invert}`}
              >
                SK
              </span>
              <div className="min-w-0 flex-1">
                <MetaLabel>Interview me</MetaLabel>
                <p className={`mt-0.5 text-[11px] leading-tight ${t.faint}`}>
                  AI trained on my work
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className={`p-1.5 transition-colors duration-300 ${t.dim} ${
                  t.isDark ? "hover:text-paper" : "hover:text-ink"
                }`}
              >
                <FiX size={17} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              {empty ? (
                <div className="space-y-5">
                  <p className={`text-sm leading-relaxed ${t.body}`}>{GREETING}</p>
                  <div className="flex flex-col items-start gap-2">
                    {SUGGESTIONS.map((question) => (
                      <button
                        key={question}
                        onClick={() => send(question)}
                        className={`border px-3 py-2 text-left text-xs transition-colors duration-300 ${
                          t.rule
                        } ${t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"}`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, i) => {
                  const isUser = message.role === "user";
                  const streaming =
                    busy && i === messages.length - 1 && message.role === "assistant";
                  return (
                    <div
                      key={i}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[86%] whitespace-pre-wrap text-sm leading-relaxed ${
                          isUser
                            ? `px-3.5 py-2.5 ${userBubble}`
                            : `border-l pl-3.5 ${t.ruleStrong} ${t.body}`
                        }`}
                      >
                        {message.content ? (
                          renderContent(message.content)
                        ) : streaming ? (
                          <span className="inline-flex gap-1">
                            <Dot delay={0} fill={t.accentFill} />
                            <Dot delay={0.15} fill={t.accentFill} />
                            <Dot delay={0.3} fill={t.accentFill} />
                          </span>
                        ) : null}
                        {streaming && message.content && (
                          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-current" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input. Underlined rather than boxed, like the rest of the site. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className={`flex items-end gap-3 border-t p-3 ${t.rule}`}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask about my work"
                className={`max-h-28 flex-1 resize-none border-b bg-transparent px-1 py-1.5 text-sm outline-none transition-colors duration-300 ${t.rule} ${
                  t.isDark
                    ? "placeholder:text-paper/35 focus:border-paper/40"
                    : "placeholder:text-ink/40 focus:border-ink/40"
                }`}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className={`flex h-9 w-9 shrink-0 items-center justify-center transition-opacity duration-300 disabled:opacity-40 ${userBubble}`}
              >
                <FiSend size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher. Labelled, because a bare speech bubble does not tell anyone
          there is an AI behind it that answers as Success. */}
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={open ? "Close chat" : "Interview me: chat with my AI"}
        aria-expanded={open}
        className={`group inline-flex items-center gap-2.5 border px-4 py-3 shadow-xl backdrop-blur-md transition-colors duration-300 ${t.rule} ${panel} ${
          t.isDark ? "hover:border-paper/40" : "hover:border-ink/40"
        }`}
      >
        {open ? (
          <FiX size={16} />
        ) : (
          <span
            aria-hidden
            className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.accentFill}`}
          />
        )}
        <MetaLabel>{open ? "Close" : "Interview me"}</MetaLabel>
      </button>
    </div>
  );
};

function Dot({ delay, fill }: { delay: number; fill: string }) {
  return (
    <motion.span
      className={`inline-block h-1.5 w-1.5 rounded-full ${fill}`}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

export default InterviewChat;
