export function PostSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 animate-pulse">
      <div className="flex justify-between items-start mb-2">
        <div className="h-6 w-3/4 bg-neutral-800 rounded" />
        <div className="h-4 w-16 bg-neutral-800 rounded" />
      </div>
      <div className="h-4 w-full bg-neutral-800/50 rounded mb-2" />
      <div className="h-4 w-2/3 bg-neutral-800/50 rounded mb-3" />
      <div className="flex items-center gap-3">
        <div className="h-5 w-20 bg-neutral-800 rounded-full" />
        <div className="h-4 w-12 bg-neutral-800 rounded" />
      </div>
    </div>
  );
}