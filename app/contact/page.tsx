import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { ArrowUpRight, Clock3, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getPortfolioContent } from "@/lib/content";

export const metadata={title:"Contact",description:"Contact MD Nazmul Hasan for backend development, API architecture, Node.js, TypeScript, MongoDB, PostgreSQL, and infrastructure projects.",alternates:{canonical:"/contact"}};
export default async function ContactPage(){const {settings}=await getPortfolioContent();return <main id="main" className="pt-28"><section className="shell py-16 sm:py-24"><div className="grid gap-14 lg:grid-cols-[.4fr_.6fr]">
  <Reveal><p className="eyebrow mb-5">Contact / Open channel</p><h1 className="text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl">Let’s solve the <span className="text-acid">hard part.</span></h1><p className="mt-7 max-w-md text-lg leading-relaxed text-muted">Tell me what needs to work, what is getting in the way, and what happens if it fails. We’ll take it from there.</p>
    <div className="mt-10 space-y-4 border-t border-line pt-7 font-mono text-[10px] uppercase tracking-wider text-muted"><p className="flex items-center gap-3"><MapPin size={15} className="shrink-0 text-acid"/> {settings.location}</p><p className="flex items-center gap-3"><Clock3 size={15} className="shrink-0 text-acid"/> Replies within 1–2 working days</p></div>
    <div className="mt-7 space-y-2">
      <a href={`mailto:${settings.email}`} className="focus-ring flex min-h-11 items-center gap-3 text-sm text-white hover:text-acid"><Mail size={15} className="text-acid"/>{settings.email}</a>
      <a href={`tel:${settings.phone}`} className="focus-ring flex min-h-11 items-center gap-3 text-sm text-white hover:text-acid"><Phone size={15} className="text-acid"/>{settings.phoneDisplay}</a>
    </div>
    <div className="mt-7 flex flex-wrap gap-2" aria-label="Social profiles">
      <SocialLink href={settings.github} label="GitHub"><Github size={15}/></SocialLink>
      <SocialLink href={settings.linkedin} label="LinkedIn"><Linkedin size={15}/></SocialLink>
      <SocialLink href={settings.instagram} label="Instagram"><Instagram size={15}/></SocialLink>
    </div>
  </Reveal><Reveal delay={.1}><ContactForm/></Reveal></div></section></main>}

function SocialLink({href,label,children}:{href:string;label:string;children:React.ReactNode}){return <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 border border-line px-4 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-acid hover:text-white">{children}{label}<ArrowUpRight size={12}/></a>}
