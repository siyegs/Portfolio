import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

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

const ACCENT = "#2563EB";

const SUGGESTIONS = [
  "What's your strongest project?",
  "Do you have payments / fintech experience?",
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
  const dark = theme === "dark";
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

  const panelText = dark ? "text-[#f3f2f9]" : "text-[#18181b]";
  const subtle = dark ? "text-white/50" : "text-black/50";
  const border = dark ? "border-white/10" : "border-black/10";
  const assistantBubble = dark
    ? "bg-white/[0.06] text-[#f3f2f9]/90"
    : "bg-black/[0.05] text-[#18181b]/90";
  const inputBg = dark ? "bg-white/[0.06]" : "bg-black/[0.04]";
  const chip = dark
    ? "border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.1]"
    : "border-black/10 bg-black/[0.04] text-black/75 hover:bg-black/[0.08]";

  const empty = messages.length === 0;

  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex flex-col items-end"
      style={{ fontFamily: "Space Grotesk" }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={`mb-3 flex h-[min(600px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border ${border} shadow-2xl backdrop-blur-xl ${
              dark ? "bg-[#18181b]/95" : "bg-[#f3f2f9]/95"
            } ${panelText}`}
          >
            {/* Header */}
            <div className={`flex items-center gap-3 border-b ${border} px-4 py-3`}>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                SK
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">Interview me</p>
                <p className={`text-xs leading-tight ${subtle}`}>
                  AI trained on my work
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className={`rounded-full p-1.5 transition-colors ${
                  dark ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
            >
              {empty ? (
                <div className="space-y-4">
                  <div className={`rounded-2xl px-4 py-3 text-sm ${assistantBubble}`}>
                    {GREETING}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${chip}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => {
                  const isUser = m.role === "user";
                  const streaming =
                    busy && i === messages.length - 1 && m.role === "assistant";
                  return (
                    <div
                      key={i}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isUser ? "text-white" : assistantBubble
                        }`}
                        style={isUser ? { backgroundColor: ACCENT } : undefined}
                      >
                        {m.content ? (
                          renderContent(m.content)
                        ) : streaming ? (
                          <span className="inline-flex gap-1">
                            <Dot delay={0} dark={dark} />
                            <Dot delay={0.15} dark={dark} />
                            <Dot delay={0.3} dark={dark} />
                          </span>
                        ) : null}
                        {streaming && m.content && (
                          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-current" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className={`flex items-end gap-2 border-t ${border} p-3`}
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
                placeholder="Ask about my work..."
                className={`max-h-28 flex-1 resize-none rounded-xl px-3 py-2 text-sm outline-none ${inputBg} ${panelText} placeholder:${subtle}`}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
                style={{ backgroundColor: ACCENT }}
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with my AI"}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
        style={{ backgroundColor: ACCENT }}
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </motion.button>
    </div>
  );
};

function Dot({ delay, dark }: { delay: number; dark: boolean }) {
  return (
    <motion.span
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        dark ? "bg-white/50" : "bg-black/40"
      }`}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

export default InterviewChat;
