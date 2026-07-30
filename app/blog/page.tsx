import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { getPortfolioContent } from "@/lib/content";

export const metadata = { title: "Writing", description: "Technical articles by MD Nazmul Hasan about backend architecture, APIs, databases, reliability, and engineering practice.", alternates: { canonical: "/blog" } };
export default async function BlogPage() {
  const { posts } = await getPortfolioContent();
  const categories = ["All notes", ...new Set(posts.map(p => p.category))];
  return <main id="main" className="pt-28"><section className="shell py-16 sm:py-24"><Reveal><p className="eyebrow mb-5">Writing / Field notes</p><h1 className="display max-w-5xl">Ideas for systems<br />that <span className="text-acid">have to last.</span></h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">Technical essays about architecture, reliability, and the human decisions behind dependable software.</p></Reveal>
    <Reveal className="mt-12 flex flex-wrap gap-2">{categories.map((c,i)=><span key={c} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-wider ${i===0?"border-acid bg-acid text-ink":"border-line text-muted"}`}>{c}</span>)}</Reveal>
    <div className="mt-12 border-t border-line">{posts.map((post,i)=><Reveal key={post.slug} delay={i*.04}><Link href={`/blog/${post.slug}`} className="focus-ring group grid gap-5 border-b border-line py-9 transition-colors hover:bg-panel/50 sm:grid-cols-[.2fr_.65fr_.15fr] sm:px-6">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted"><p>{post.date}</p><p className="mt-2 text-acid">{post.category}</p></div>
      <div><h2 className="text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{post.title}</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted">{post.excerpt}</p><span className="mt-5 block font-mono text-[9px] text-muted">{post.read} READ</span></div>
      <ArrowUpRight className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid sm:justify-self-end"/>
    </Link></Reveal>)}</div>
  </section></main>;
}
