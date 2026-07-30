import { unstable_noStore as noStore } from "next/cache";
import { getDatabase } from "@/lib/mongodb";
import { courses, education, experience, posts, projects, technicalSkills, testimonials } from "@/data/portfolio";

export type PortfolioContent = {
  projects: typeof projects;
  experience: typeof experience;
  education: typeof education;
  courses: typeof courses;
  skills: typeof technicalSkills;
  testimonials: typeof testimonials;
  posts: typeof posts;
  settings: {
    headline: string;
    introduction: string;
    availability: string;
    email: string;
    phone: string;
    phoneDisplay: string;
    location: string;
    github: string;
    linkedin: string;
    instagram: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
  };
};

export const defaultContent: PortfolioContent = {
  projects,
  experience,
  education,
  courses,
  skills: technicalSkills,
  testimonials,
  posts,
  settings: {
    headline: "I build the systems behind the experience.",
    introduction: "Backend engineer turning complex product requirements into fast, observable, dependable infrastructure that stays calm under pressure.",
    availability: "Available for select projects · UTC+6",
    email: "mdnazmulhasanniloy323@gmail.com",
    phone: "+8801518963455",
    phoneDisplay: "+880 1518-963455",
    location: "Mohakhali, Dhaka, Bangladesh",
    github: "https://github.com/mdnazmulhasanniloy",
    linkedin: "https://www.linkedin.com/in/mdnazmulhasan323/",
    instagram: "https://www.instagram.com/dev.nazmulhasan",
    seoTitle: "MD Nazmul Hasan — Backend Developer",
    seoDescription: "Backend developer specializing in Node.js, TypeScript, REST APIs, PostgreSQL, MongoDB, scalable systems, and production infrastructure.",
    seoKeywords: "MD Nazmul Hasan, backend developer, Node.js developer, TypeScript developer, API developer, MongoDB developer, PostgreSQL developer, Bangladesh software engineer",
  },
};

export const editableSections = ["projects", "experience", "education", "courses", "skills", "testimonials", "posts", "settings"] as const;
export type EditableSection = (typeof editableSections)[number];

export async function getPortfolioContent(): Promise<PortfolioContent> {
  noStore();
  const db = await getDatabase();
  const collection = db.collection<PortfolioContent & { _id: string }>("content");
  const existing = await collection.findOne({ _id: "portfolio" });
  if (existing) {
    return {
      projects: existing.projects ?? defaultContent.projects,
      experience: existing.experience ?? defaultContent.experience,
      education: existing.education ?? defaultContent.education,
      courses: existing.courses ?? defaultContent.courses,
      skills: existing.skills ?? defaultContent.skills,
      testimonials: existing.testimonials ?? defaultContent.testimonials,
      posts: existing.posts ?? defaultContent.posts,
      settings: { ...defaultContent.settings, ...(existing.settings ?? {}) },
    };
  }
  await collection.insertOne({ _id: "portfolio", ...defaultContent });
  return defaultContent;
}

export async function updateContentSection(section: EditableSection, value: unknown) {
  const db = await getDatabase();
  await db.collection<{ _id: string; [key: string]: unknown }>("content").updateOne(
    { _id: "portfolio" },
    { $set: { [section]: value, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
}

export async function seedDefaultContent(force = false) {
  const db = await getDatabase();
  const collection = db.collection<{ _id: string; [key: string]: unknown }>("content");
  if (force) {
    await collection.replaceOne({ _id: "portfolio" }, { _id: "portfolio", ...defaultContent, createdAt: new Date(), updatedAt: new Date() }, { upsert: true });
    return "replaced";
  }
  const result = await collection.updateOne({ _id: "portfolio" }, { $setOnInsert: { ...defaultContent, createdAt: new Date(), updatedAt: new Date() } }, { upsert: true });
  return result.upsertedCount ? "inserted" : "already-exists";
}
