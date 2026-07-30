/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep dev and production artifacts isolated. Running `next build` while a
  // dev server is active can otherwise leave the dev chunk manifest stale.
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next",
};

export default nextConfig;
