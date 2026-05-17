export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 border-4 border-white/10 border-t-accent-cyan rounded-full animate-spin"></div>
      <p className="mt-4 text-secondary font-orbitron tracking-widest text-sm uppercase">Loading Ecosystem...</p>
    </div>
  );
}
