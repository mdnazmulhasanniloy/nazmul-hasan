"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Check, Database, ImagePlus, LogOut, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import type { EditableSection, PortfolioContent } from "@/lib/content";

type FormObject = Record<string, unknown>;
const sections: { key: EditableSection; label: string }[] = [
  { key: "projects", label: "Projects" }, { key: "experience", label: "Experience" },
  { key: "education", label: "Education" }, { key: "courses", label: "Courses" },
  { key: "skills", label: "Skills" }, { key: "testimonials", label: "Client reviews" },
  { key: "posts", label: "Blog posts" }, { key: "settings", label: "Site settings" },
];

function emptyFrom(value: unknown): unknown {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value as FormObject).map(([key, item]) => [key, emptyFrom(item)]));
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  return "";
}

export function AdminDashboard({ initialContent }: { initialContent: PortfolioContent }) {
  const router = useRouter();
  const [content, setContent] = useState<PortfolioContent>(() => ({
    ...initialContent,
    projects: initialContent.projects.map(project => ({ image: "", ...project })),
  }));
  const [active, setActive] = useState<EditableSection>("projects");
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [error, setError] = useState("");
  const activeValue = content[active];
  const items = Array.isArray(activeValue) ? activeValue as unknown as FormObject[] : null;
  const current = items ? items[selected] : activeValue as unknown as FormObject;
  const title = useMemo(() => {
    if (!current) return "New item";
    return String(current.title || current.name || current.role || current.degree || current.company || `Item ${selected + 1}`);
  }, [current, selected]);

  function choose(section: EditableSection) { setActive(section); setSelected(0); setStatus("idle"); setError(""); }
  function setCurrent(next: FormObject) {
    if (items) {
      const updated = [...items]; updated[selected] = next;
      setContent(previous => ({ ...previous, [active]: updated } as PortfolioContent));
    } else setContent(previous => ({ ...previous, [active]: next } as PortfolioContent));
    setStatus("idle");
  }
  function addItem() {
    if (!items) return;
    const model = items[0] || {};
    const next = emptyFrom(model) as FormObject;
    if (active === "projects") Object.assign(next, { index: String(items.length + 1).padStart(2, "0"), image: "", links: [], highlights: [], metrics: [], stack: [] });
    const updated = [...items, next];
    setContent(previous => ({ ...previous, [active]: updated } as PortfolioContent)); setSelected(updated.length - 1);
  }
  function removeItem() {
    if (!items || !items[selected] || !confirm(`Delete “${title}”?`)) return;
    const updated = items.filter((_, index) => index !== selected);
    setContent(previous => ({ ...previous, [active]: updated } as PortfolioContent)); setSelected(Math.max(0, selected - 1));
  }
  function move(direction: -1 | 1) {
    if (!items) return; const target = selected + direction;
    if (target < 0 || target >= items.length) return;
    const updated = [...items]; [updated[selected], updated[target]] = [updated[target], updated[selected]];
    setContent(previous => ({ ...previous, [active]: updated } as PortfolioContent)); setSelected(target);
  }
  async function save() {
    setStatus("saving"); setError("");
    const response = await fetch(`/api/admin/content/${active}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ value: content[active] }) });
    if (!response.ok) { setStatus("error"); setError("Could not publish this section. Please retry."); return; }
    setStatus("saved"); router.refresh(); window.setTimeout(() => setStatus("idle"), 1800);
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }

  return <div className="grid min-w-0 gap-4 xl:grid-cols-[220px_270px_minmax(0,1fr)] xl:gap-5">
    <aside className="card min-w-0 p-3 xl:sticky xl:top-24 xl:h-fit">
      <div className="flex items-center justify-between gap-3 border-b border-line px-2 pb-3 xl:mb-3 xl:block xl:border-b-0 xl:px-0 xl:pb-0">
        <div className="flex items-center gap-3 xl:border-b xl:border-line xl:p-3 xl:pb-5"><span className="grid size-10 shrink-0 place-items-center bg-acid text-ink"><Database size={18}/></span><div><strong className="block text-sm">Content CMS</strong><span className="font-mono text-[9px] uppercase tracking-wider text-muted">MongoDB + R2</span></div></div>
        <button onClick={logout} className="focus-ring grid size-11 shrink-0 place-items-center text-muted hover:text-white xl:hidden" aria-label="Sign out"><LogOut size={17}/></button>
      </div>
      <nav aria-label="Content sections" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 pt-3 xl:mx-0 xl:block xl:overflow-visible xl:px-0 xl:pb-0 xl:pt-0">{sections.map(section => <button key={section.key} onClick={() => choose(section.key)} className={`focus-ring flex min-h-11 shrink-0 items-center justify-between gap-4 px-3 text-left text-sm transition-colors xl:w-full ${active === section.key ? "bg-acid text-ink" : "border border-line text-muted hover:border-muted hover:text-white xl:border-transparent xl:hover:bg-panel"}`}><span>{section.label}</span><span className="font-mono text-[9px]">{Array.isArray(content[section.key]) ? (content[section.key] as unknown[]).length : "—"}</span></button>)}</nav>
      <button onClick={logout} className="focus-ring mt-3 hidden min-h-11 w-full items-center gap-2 border-t border-line px-3 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-white xl:flex"><LogOut size={14}/>Sign out</button>
    </aside>

    {items && <aside className="card min-w-0 p-3 xl:sticky xl:top-24 xl:h-fit xl:max-h-[calc(100dvh-120px)] xl:overflow-y-auto">
      <div className="mb-3 flex items-center justify-between px-2 py-2"><strong className="text-sm">{sections.find(section => section.key === active)?.label}</strong><button onClick={addItem} className="focus-ring grid size-10 place-items-center bg-acid text-ink" aria-label={`Add ${active} item`}><Plus size={16}/></button></div>
      <div className="flex snap-x gap-2 overflow-x-auto pb-2 xl:block xl:space-y-1 xl:overflow-visible xl:pb-0">{items.map((item, index) => <button key={index} onClick={() => setSelected(index)} className={`focus-ring min-w-[210px] snap-start border px-3 py-3 text-left transition-colors xl:w-full xl:min-w-0 ${selected === index ? "border-acid bg-acid/10" : "border-line text-muted hover:border-muted hover:text-white xl:border-transparent xl:hover:border-line"}`}><span className="block truncate text-sm font-medium">{String(item.title || item.name || item.role || item.degree || item.company || `Item ${index + 1}`)}</span><span className="mt-1 block truncate font-mono text-[9px] uppercase tracking-wider text-muted">{String(item.period || item.category || item.kicker || `#${index + 1}`)}</span></button>)}</div>
    </aside>}

    <section className={`card min-w-0 overflow-hidden p-4 sm:p-6 lg:p-7 ${items ? "" : "xl:col-span-2"}`}>
      <header className="mb-6 flex flex-col justify-between gap-4 border-b border-line pb-5 lg:flex-row lg:items-end"><div className="min-w-0"><p className="eyebrow mb-2">Editing / {active}</p><h2 className="truncate text-2xl font-semibold sm:text-3xl">{items ? title : "Site settings"}</h2></div><div className="flex w-full flex-wrap gap-2 lg:w-auto lg:justify-end">{items && <><button onClick={() => move(-1)} disabled={selected === 0} className="focus-ring grid size-11 place-items-center border border-line disabled:opacity-30" aria-label="Move item up"><ArrowUp size={15}/></button><button onClick={() => move(1)} disabled={selected === items.length - 1} className="focus-ring grid size-11 place-items-center border border-line disabled:opacity-30" aria-label="Move item down"><ArrowDown size={15}/></button><button onClick={removeItem} className="focus-ring grid size-11 place-items-center border border-red-400/30 text-red-300 hover:bg-red-400/10" aria-label="Delete item"><Trash2 size={15}/></button></>}<button onClick={save} disabled={status === "saving"} className="focus-ring ml-auto inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-acid px-4 font-mono text-[10px] font-bold uppercase tracking-wider text-ink disabled:opacity-50 sm:flex-none lg:ml-0">{status === "saved" ? <Check size={15}/> : <Save size={15}/>} {status === "saving" ? "Saving…" : status === "saved" ? "Published" : "Save & publish"}</button></div></header>
      {current ? <ObjectFields value={current} onChange={setCurrent} path={active}/> : <div className="grid min-h-80 place-items-center text-center text-muted"><div><p>No items in this section.</p><button onClick={addItem} className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 bg-acid px-5 text-sm font-semibold text-ink"><Plus size={16}/>Add first item</button></div></div>}
      {error && <p role="alert" className="mt-5 border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
    </section>
  </div>;
}

function ObjectFields({ value, onChange, path }: { value: FormObject; onChange: (value: FormObject) => void; path: string }) {
  const settingsLayout = path === "settings";
  return <div className={`grid gap-5 ${settingsLayout ? "grid-cols-1" : "sm:grid-cols-2"}`}>{Object.entries(value).map(([key, field]) => <Field key={key} label={key} value={field} path={`${path}.${key}`} onChange={next => onChange({ ...value, [key]: next })}/>)}</div>;
}

function Field({ label, value, onChange, path }: { label: string; value: unknown; onChange: (value: unknown) => void; path: string }) {
  const pretty = label.replace(/([A-Z])/g, " $1").replace(/^./, letter => letter.toUpperCase());
  const longText = /description|text|introduction|quote|excerpt|long/i.test(label);
  const imageField = /image|cover|thumbnail/i.test(label);
  if (imageField && typeof value === "string") return <ImageUpload label={pretty} value={value} onChange={onChange}/>;
  if (typeof value === "boolean") return <label className="flex min-h-12 items-center gap-3 border border-line p-3 text-sm"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)} className="size-4 accent-[#c7ff4a]"/>{pretty}</label>;
  if (typeof value === "number") return <label className="block"><span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[.12em] text-muted">{pretty}</span><input type="number" value={value} onChange={event => onChange(Number(event.target.value))} className="focus-ring min-h-14 w-full border border-line bg-ink px-4 text-base text-white"/></label>;
  if (typeof value === "string") return <label className={longText ? "block sm:col-span-2" : "block"}><span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[.12em] text-muted">{pretty}</span>{longText ? <textarea value={value} onChange={event => onChange(event.target.value)} rows={path.startsWith("settings.") ? 5 : 4} className="focus-ring w-full resize-y border border-line bg-ink p-4 text-base leading-relaxed text-white placeholder:text-muted/50"/> : <input value={value} onChange={event => onChange(event.target.value)} className="focus-ring min-h-14 w-full border border-line bg-ink px-4 text-base text-white placeholder:text-muted/50"/>}</label>;
  if (Array.isArray(value)) {
    if (!value.length || value.every(item => typeof item === "string")) return <label className="block sm:col-span-2"><span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[.12em] text-muted">{pretty}</span><input value={(value as string[]).join(", ")} onChange={event => onChange(event.target.value.split(",").map(item => item.trim()).filter(Boolean))} placeholder="Separate items with commas" className="focus-ring min-h-14 w-full border border-line bg-ink px-4 text-base text-white"/></label>;
    return <NestedList label={pretty} value={value as FormObject[]} onChange={onChange} path={path}/>;
  }
  if (value && typeof value === "object") return <div className="border border-line p-4 sm:col-span-2"><h3 className="mb-4 text-sm font-semibold">{pretty}</h3><ObjectFields value={value as FormObject} onChange={onChange} path={path}/></div>;
  return null;
}

function NestedList({ label, value, onChange, path }: { label: string; value: FormObject[]; onChange: (value: unknown) => void; path: string }) {
  function update(index: number, item: FormObject) { const next=[...value];next[index]=item;onChange(next); }
  function add() { onChange([...value, emptyFrom(value[0] || { label: "", href: "" }) as FormObject]); }
  return <div className="border border-line p-4 sm:col-span-2"><div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">{label}</h3><button type="button" onClick={add} className="focus-ring inline-flex min-h-10 items-center gap-2 border border-line px-3 font-mono text-[9px] uppercase tracking-wider hover:border-acid"><Plus size={14}/>Add</button></div><div className="space-y-4">{value.map((item,index)=><div key={index} className="relative border border-line bg-ink/60 p-4"><button type="button" onClick={()=>onChange(value.filter((_,i)=>i!==index))} className="focus-ring absolute right-2 top-2 grid size-9 place-items-center text-red-300" aria-label={`Remove ${label} ${index+1}`}><Trash2 size={14}/></button><div className="pr-9"><ObjectFields value={item} onChange={next=>update(index,next)} path={`${path}.${index}`}/></div></div>)}</div></div>;
}

function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (value: unknown) => void }) {
  const [uploading,setUploading]=useState(false); const [error,setError]=useState("");
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file=event.target.files?.[0]; if(!file)return;
    setUploading(true);setError("");const body=new FormData();body.append("file",file);
    const response=await fetch("/api/admin/upload",{method:"POST",body});const result=await response.json();setUploading(false);
    if(!response.ok){setError(result.error||"Upload failed.");return;}onChange(result.url);
  }
  return <div className="sm:col-span-2"><span className="mb-2 block font-mono text-[9px] uppercase tracking-wider text-muted">{label}</span><div className="grid gap-4 border border-line p-4 sm:grid-cols-[180px_1fr]">{value?<img src={value} alt="" className="aspect-[16/10] w-full object-cover"/>:<div className="grid aspect-[16/10] place-items-center bg-panel text-muted"><ImagePlus size={28}/></div>}<div className="flex flex-col justify-center"><input value={value} onChange={event=>onChange(event.target.value)} placeholder="Image URL" className="focus-ring min-h-11 w-full border border-line bg-ink px-3 text-sm"/><label className="focus-ring mt-3 inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 bg-acid px-4 font-mono text-[9px] font-bold uppercase tracking-wider text-ink"><UploadCloud size={15}/>{uploading?"Uploading…":"Upload to R2"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} disabled={uploading} className="sr-only"/></label>{error&&<p className="mt-2 text-xs text-red-300">{error}</p>}</div></div></div>;
}
