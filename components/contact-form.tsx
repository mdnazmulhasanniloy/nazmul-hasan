"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm(){
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error,setError]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=new FormData(form);
    setStatus("sending");
    setError("");
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(data))});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error || "Message service returned an error.");
      setStatus("sent"); form.reset();
    }catch(error){
      setError(error instanceof Error ? error.message : "The message could not be sent. Please try again.");
      setStatus("error");
    }
  }
  const sent=status==="sent";
  return <AnimatePresence mode="wait">{sent?
    <motion.div key="success" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} role="status" aria-live="polite" className="card grid min-h-[420px] place-items-center p-8 text-center"><div><CheckCircle2 className="mx-auto mb-5 text-acid" size={48}/><h2 className="text-3xl font-semibold">Message received.</h2><p className="mt-3 max-w-sm text-muted">Thanks for reaching out. Your message has been saved securely and I’ll reply as soon as possible.</p><button onClick={()=>setStatus("idle")} className="focus-ring mt-7 min-h-11 border border-line px-5 font-mono text-[10px] uppercase tracking-wider hover:border-acid">Send another</button></div></motion.div>:
    <motion.form key="form" exit={{opacity:0,y:-10}} onSubmit={submit} className="card space-y-6 p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2"><Field id="name" label="Your name" placeholder="Ada Lovelace" autoComplete="name"/><Field id="email" label="Email address" placeholder="ada@company.com" type="email" autoComplete="email"/></div>
      <Field id="company" label="Company / project" placeholder="What are you building?" autoComplete="organization"/>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
      <div><label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">Project details <span className="text-acid">*</span></label><textarea id="message" name="message" required rows={6} placeholder="The problem, current constraints, and what a great outcome looks like…" className="focus-ring w-full resize-y border border-line bg-ink p-4 text-base placeholder:text-muted/50 hover:border-muted"/></div>
      {error && <p role="alert" className="border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-relaxed text-muted">I typically reply within 1–2 working days. No sales automation, just a direct conversation.</p><button disabled={status==="sending"} className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 bg-acid px-6 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-transform active:scale-[.98] disabled:cursor-wait disabled:opacity-60">{status==="sending"?"Sending…":"Send inquiry"} <ArrowRight size={16}/></button></div>
    </motion.form>}</AnimatePresence>;
}
function Field({id,label,...props}:{id:string;label:string}&React.InputHTMLAttributes<HTMLInputElement>){return <div><label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">{label} <span className="text-acid">*</span></label><input id={id} name={id} required {...props} className="focus-ring min-h-12 w-full border border-line bg-ink px-4 text-base placeholder:text-muted/50 hover:border-muted"/></div>}
