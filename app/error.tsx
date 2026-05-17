'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-orbitron font-bold mb-4">Something went wrong!</h2>
      <p className="text-secondary mb-8 max-w-md">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-accent-cyan text-background font-bold rounded-xl"
      >
        Try again
      </button>
    </div>
  );
}
