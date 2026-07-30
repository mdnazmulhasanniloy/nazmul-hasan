import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion";
import { getPortfolioContent } from "@/lib/content";

export const metadata = { title: "Projects", description: "Explore production web, mobile, backend API, booking, logistics, food-tech, and marketplace projects by MD Nazmul Hasan.", alternates: { canonical: "/projects" } };
export default async function ProjectsPage() {
  const { projects } = await getPortfolioContent();
  return <main id="main" className="pt-28"><section className="shell py-16 sm:py-24"><Reveal><p className="eyebrow mb-5">Projects / Selected work</p><h1 className="display max-w-5xl">Systems with <span className="text-acid">receipts.</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">A collection of backend platforms designed around measurable reliability, operational clarity, and real product constraints.</p></Reveal>
    <div className="mt-16 grid gap-4 lg:grid-cols-2">{projects.map((p,i)=><Reveal key={p.slug} delay={i*.05}><ProjectCard project={p}/></Reveal>)}</div>
  </section></main>;
}
