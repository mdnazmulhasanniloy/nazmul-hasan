import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxFileSize = 6 * 1024 * 1024;

function detectImage(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { type: "image/jpeg", extension: "jpg" };
  if (bytes.slice(0, 8).every((byte, index) => byte === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index])) return { type: "image/png", extension: "png" };
  const ascii = Buffer.from(bytes).toString("ascii");
  if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return { type: "image/webp", extension: "webp" };
  if (ascii.slice(4, 12) === "ftypavif" || ascii.slice(4, 12) === "ftypavis") return { type: "image/avif", extension: "avif" };
  return null;
}

function config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    throw new Error("Cloudflare R2 is not configured. Add the five R2 environment variables.");
  }
  return { accountId, accessKeyId, secretAccessKey, bucket, publicUrl: publicUrl.replace(/\/$/, "") };
}

export async function uploadImage(file: File) {
  if (!allowedTypes.has(file.type)) throw new Error("Only JPG, PNG, WebP, and AVIF images are allowed.");
  if (file.size > maxFileSize) throw new Error("Image must be smaller than 6 MB.");
  if (file.size < 12) throw new Error("The image file is invalid.");
  const body = Buffer.from(await file.arrayBuffer());
  const detected = detectImage(body.subarray(0, 16));
  if (!detected || detected.type !== file.type) throw new Error("The file content does not match a supported image type.");
  const { accountId, accessKeyId, secretAccessKey, bucket, publicUrl } = config();
  const key = `portfolio/${new Date().getUTCFullYear()}/${randomUUID()}.${detected.extension}`;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: detected.type,
    CacheControl: "public, max-age=31536000, immutable",
  }));
  return `${publicUrl}/${key}`;
}
