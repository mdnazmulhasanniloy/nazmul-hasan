import { Db, MongoClient } from "mongodb";
import { Resolver } from "node:dns/promises";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "nazmul_portfolio";

if (!uri) throw new Error("MONGODB_URI is not configured.");

async function resolveWindowsAtlasUri(source: string) {
  if (process.platform !== "win32" || !source.startsWith("mongodb+srv://")) return source;
  const parsed = new URL(source);
  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);
  const [records, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${parsed.hostname}`),
    resolver.resolveTxt(parsed.hostname).catch(() => []),
  ]);
  const options = new URLSearchParams(parsed.searchParams);
  for (const record of txtRecords.flat().join("").split("&")) {
    const [key, value] = record.split("=");
    if (key && value && !options.has(key)) options.set(key, value);
  }
  options.set("tls", "true");
  const credentials = parsed.username
    ? `${encodeURIComponent(decodeURIComponent(parsed.username))}:${encodeURIComponent(decodeURIComponent(parsed.password))}@`
    : "";
  const hosts = records.map(record => `${record.name}:${record.port}`).join(",");
  return `mongodb://${credentials}${hosts}/${parsed.pathname.replace(/^\//, "")}?${options.toString()}`;
}

const globalMongo = globalThis as typeof globalThis & { __mongoClient?: Promise<MongoClient> };

export const clientPromise =
  globalMongo.__mongoClient ?? resolveWindowsAtlasUri(uri).then(connectionUri => new MongoClient(connectionUri, { maxPoolSize: 10 }).connect());

if (process.env.NODE_ENV !== "production") globalMongo.__mongoClient = clientPromise;

export async function getDatabase(): Promise<Db> {
  return (await clientPromise).db(dbName);
}
