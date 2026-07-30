import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin";
const secretValue = process.env.AUTH_SECRET;
if (!secretValue) throw new Error("AUTH_SECRET is not configured.");
const secret = new TextEncoder().encode(secretValue);

export async function createAdminToken(email: string) {
  return new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setSubject(email).setIssuedAt().setExpirationTime("12h").sign(secret);
}

export async function verifyAdminToken(token?: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin" && payload.sub === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function isAdmin() {
  return verifyAdminToken((await cookies()).get(COOKIE_NAME)?.value);
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 },
};
