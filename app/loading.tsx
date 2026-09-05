export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[80] flex min-h-dvh w-full items-center justify-center bg-ink"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-5 size-10 animate-spin rounded-full border border-line border-t-acid" />

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Resolving system
        </p>
      </div>
    </div>
  );
}