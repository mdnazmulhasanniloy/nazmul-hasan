"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, User, X } from "lucide-react";

type Message = { id: number; sender: "bot" | "user"; text: string };

const quickPrompts = ["Core skills", "Work experience", "Education", "Contact Nazmul"];

function formatInline(text: string) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g).filter(Boolean);
  return tokens.map((token, index) => {
    const bold = token.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={index} className="font-semibold text-white">{bold[1]}</strong>;
    const link = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link && /^https?:|^mailto:/i.test(link[2])) return <a key={index} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined} className="text-acid underline underline-offset-2">{link[1]}</a>;
    return <span key={index}>{token}</span>;
  });
}

function renderAssistantText(text: string) {
  const lines = text.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(<ul key={`list-${blocks.length}`} className="my-1.5 space-y-1.5 pl-4">{bullets.map((bullet, index) => <li key={index} className="list-disc pl-1 marker:text-acid">{formatInline(bullet)}</li>)}</ul>);
    bullets = [];
  };
  lines.forEach((line, index) => {
    const bullet = line.match(/^\s*[*-]\s+(.+)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flushBullets();
    if (line.trim()) blocks.push(<p key={`line-${index}`} className="mb-2 last:mb-0">{formatInline(line.trim())}</p>);
  });
  flushBullets();
  return blocks;
}

export function PortfolioChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: "Hi, I’m Nazmul’s portfolio assistant. What would you like to know?" }
  ]);
  const nextId = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (open) window.setTimeout(() => closeRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;

    setMessages(current => [...current, { id: nextId.current++, sender: "user", text: clean }]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean })
      });

      const result = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !result.answer) {
        throw new Error(result.error ?? "The assistant is temporarily unavailable.");
      }

      setMessages(current => [...current, { id: nextId.current++, sender: "bot", text: result.answer! }]);
    } catch (error) {
      setMessages(current => [
        ...current,
        {
          id: nextId.current++,
          sender: "bot",
          text: error instanceof Error ? error.message : "The assistant is temporarily unavailable. Please try again."
        }
      ]);
    } finally {
      setTyping(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="Nazmul portfolio assistant"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[68px] right-0 flex h-[min(590px,calc(100dvh-120px))] w-[min(390px,calc(100vw-40px))] flex-col overflow-hidden border border-line bg-ink/95 shadow-[0_24px_80px_rgba(0,0,0,.55)] backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-line p-4">
              <div className="flex items-center gap-3">
                <span className="relative grid size-10 place-items-center border border-acid/40 bg-acid/10 text-acid">
                  <Bot size={19} />
                  <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-acid" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">Portfolio assistant</h2>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-muted">Local · Instant answers</p>
                </div>
              </div>
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                className="focus-ring grid size-11 place-items-center text-muted transition-colors hover:text-white"
                aria-label="Close portfolio assistant"
              >
                <X size={18} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
              {messages.map(message => (
                <div key={message.id} className={`flex gap-2.5 ${message.sender === "user" ? "justify-end" : ""}`}>
                  {message.sender === "bot" && (
                    <span className="mt-1 grid size-7 shrink-0 place-items-center border border-line text-acid">
                      <Sparkles size={13} />
                    </span>
                  )}
                  <p
                    className={`max-w-[82%] whitespace-pre-wrap px-3.5 py-3 text-sm leading-relaxed ${
                      message.sender === "user" ? "bg-acid text-ink font-medium" : "border border-line bg-panel text-[#d7ddd8]"
                    }`}
                  >
                    {message.sender === "bot" ? renderAssistantText(message.text) : message.text}
                  </p>
                  {message.sender === "user" && (
                    <span className="mt-1 grid size-7 shrink-0 place-items-center border border-line text-muted">
                      <User size={13} />
                    </span>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2.5">
                  <span className="grid size-7 place-items-center border border-line text-acid">
                    <Sparkles size={13} />
                  </span>
                  <div className="flex items-center gap-1 border border-line bg-panel px-4 py-3" aria-label="Assistant is typing">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="size-1 rounded-full bg-muted"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => send(prompt)}
                    disabled={typing}
                    className="focus-ring min-h-9 shrink-0 border border-line px-3 font-mono text-[9px] uppercase tracking-wider text-muted transition-colors hover:border-acid hover:text-white disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="flex gap-2">
                <label htmlFor="chat-message" className="sr-only">Ask about Nazmul</label>
                <input
                  id="chat-message"
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  placeholder="Ask about skills or experience…"
                  autoComplete="off"
                  className="focus-ring min-h-12 min-w-0 flex-1 border border-line bg-panel px-3 text-sm placeholder:text-muted/60"
                />
                <button
                  disabled={!input.trim() || typing}
                  className="focus-ring grid size-12 shrink-0 place-items-center bg-acid text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(value => !value)}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        className="focus-ring relative grid size-14 place-items-center rounded-full bg-acid text-ink shadow-[0_10px_40px_rgba(199,255,74,.2)]"
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <MessageCircle size={21} fill="currentColor" />}
        {!open && <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-ink bg-white" />}
      </motion.button>
    </div>
  );
}