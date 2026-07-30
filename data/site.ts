export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mdnazmulhasanniloy323@gmail.com",
  phone: "+8801518963455",
  phoneDisplay: "+880 1518-963455",
  location: "Mohakhali, Dhaka, Bangladesh",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/mdnazmulhasanniloy",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/mdnazmulhasan323/",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/dev.nazmulhasan",
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
} as const;
