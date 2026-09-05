function ProjectSkeleton() {
  return <div className="card animate-pulse p-6 sm:p-8">
    <div className="mb-10 h-4 w-10 bg-line" />
    <div className="mb-4 h-3 w-32 bg-line" />
    <div className="mb-4 h-9 w-3/4 bg-line" />
    <div className="mb-2 h-4 w-full bg-line" />
    <div className="mb-7 h-4 w-5/6 bg-line" />
    <div className="mb-8 flex gap-2"><div className="h-7 w-20 bg-line" /><div className="h-7 w-24 bg-line" /><div className="h-7 w-16 bg-line" /></div>
    <div className="flex justify-between border-t border-line pt-5"><div className="h-4 w-28 bg-line" /><div className="h-10 w-24 bg-line" /></div>
  </div>;
}

export default function ProjectsLoading() {
  return <main id="main" className="pt-28"><section className="shell py-16 sm:py-24" aria-busy="true" aria-label="Loading projects">
    <div className="mb-5 h-3 w-44 animate-pulse bg-line" />
    <div className="h-16 w-3/4 animate-pulse bg-line sm:h-24" />
    <div className="mt-7 h-5 w-full max-w-2xl animate-pulse bg-line" />
    <div className="mt-16 grid gap-4 lg:grid-cols-2"><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /></div>
  </section></main>;
}