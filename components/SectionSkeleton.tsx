export default function SectionSkeleton({ className = "h-48" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`mx-auto max-w-7xl animate-pulse rounded-2xl bg-[var(--bg-card)]/60 ${className}`}
    />
  );
}
