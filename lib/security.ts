import { timingSafeEqual } from "node:crypto";

const MAX_JSON_BYTES = 512 * 1024;
const MAX_DEPTH = 8;
const MAX_ITEMS = 200;

export function safeEqual(value: string, expected: string) {
  if (!expected) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isSameOrigin(request: Request) {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return process.env.NODE_ENV !== "production";
  try {
    return new URL(source).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_JSON_BYTES) throw new Error("Request is too large.");
  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > MAX_JSON_BYTES) throw new Error("Request is too large.");
  return JSON.parse(text);
}

function assertSafeUrl(value: string) {
  if (!value) return;
  const url = new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Only HTTP(S) URLs are allowed.");
}

function assertEmail(value: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Enter a valid email address.");
}

export function validateContentValue(value: unknown, depth = 0): void {
  if (depth > MAX_DEPTH) throw new Error("Content is nested too deeply.");
  if (typeof value === "string") {
    if (value.length > 20_000) throw new Error("A content field is too long.");
    return;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Invalid number.");
    return;
  }
  if (typeof value === "boolean" || value === null) return;
  if (Array.isArray(value)) {
    if (value.length > MAX_ITEMS) throw new Error("Too many content items.");
    value.forEach(item => validateContentValue(item, depth + 1));
    return;
  }
  if (!value || typeof value !== "object") throw new Error("Unsupported content value.");
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > MAX_ITEMS) throw new Error("Too many content fields.");
  for (const [key, item] of entries) {
    if (key.startsWith("$") || key.includes(".")) throw new Error("Invalid content field name.");
    if (typeof item === "string" && key === "email") assertEmail(item);
    if (typeof item === "string" && /^(href|image|certificate|github|linkedin|instagram)$/i.test(key)) assertSafeUrl(item);
    validateContentValue(item, depth + 1);
  }
}
