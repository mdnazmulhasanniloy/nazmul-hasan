import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD Nazmul Hasan — Backend Developer",
    short_name: "Nazmul Hasan",
    description: "Backend developer portfolio, projects, experience, and technical writing.",
    start_url: "/",
    display: "standalone",
    background_color: "#070908",
    theme_color: "#c7ff4a",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
