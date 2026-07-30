import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Github, Globe2, Smartphone } from "lucide-react";
import { getPortfolioContent } from "@/lib/content";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const {projects}=await getPortfolioContent(); const p=projects.find(x=>x.slug===slug); if(!p)return{title:"Project"};return { title:p.title,description:p.description,alternates:{canonical:`/projects/${p.slug}`},openGraph:{title:p.title,description:p.description,type:"website",url:`/projects/${p.slug}`,...(p.image?{images:[{url:p.image,alt:`${p.title} project preview`}]}:{})},twitter:{card:"summary_large_image",title:p.title,description:p.description,...(p.image?{images:[p.image]}:{})} }; }

export default async function ProjectDetail({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const {projects}=await getPortfolioContent(); const project=projects.find(p=>p.slug===slug); if(!project) notFound();
  return <main id="main" className="pt-28"><section className="shell py-14 sm:py-20"><Link href="/projects" className="focus-ring mb-12 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-white"><ArrowLeft size={15}/> All projects</Link>
    <Reveal><p className="eyebrow mb-5">{project.index} / Case study</p><h1 className="display max-w-5xl">{project.title}</h1><p className="mt-7 max-w-2xl text-xl leading-relaxed text-muted">{project.description}</p></Reveal>
    {project.image && <Reveal className="mt-12 overflow-hidden border border-line"><img src={project.image} alt={`${project.title} project preview`} className="aspect-[16/8] w-full object-cover"/></Reveal>}
    <Reveal className="mt-14 grid gap-px bg-line sm:grid-cols-3">{project.metrics.map(m=><div key={m.label} className="bg-panel p-7"><strong className="font-mono text-3xl text-acid">{m.value}</strong><span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-muted">{m.label}</span></div>)}</Reveal>
  </section>
  <section className="border-y border-line py-20"><div className="shell grid gap-12 lg:grid-cols-[.3fr_.7fr]"><Reveal><p className="eyebrow">The product</p></Reveal><Reveal><h2 className="max-w-3xl text-4xl font-semibold tracking-tight">{project.kicker}</h2><p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted">{project.longDescription}</p></Reveal></div></section>
  <section className="shell py-20"><div className="grid gap-12 lg:grid-cols-[.3fr_.7fr]"><Reveal><p className="eyebrow">Scope & access</p></Reveal><Reveal><div className="card p-8"><h2 className="text-2xl font-semibold">Product highlights</h2><ul className="mt-7 grid gap-4 text-muted sm:grid-cols-2">{project.highlights.map(x=><li key={x} className="flex gap-3"><CheckCircle2 size={17} className="mt-1 shrink-0 text-acid"/>{x}</li>)}</ul></div><div className="mt-7 flex flex-wrap gap-2">{project.stack.map(x=><span key={x} className="border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">{x}</span>)}</div><div className="mt-8 flex flex-wrap gap-3">{project.links.map(link=><a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center gap-2 border border-line px-5 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-acid hover:bg-acid hover:text-ink">{link.kind==="github"?<Github size={15}/>:link.kind==="web"?<Globe2 size={15}/>:<Smartphone size={15}/>} {link.label}<ArrowUpRight size={14}/></a>)}</div></Reveal></div></section>
  </main>;
}
