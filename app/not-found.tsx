import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-6">
      <div className="text-center max-w-lg space-y-6">
        <h1 className="font-serif text-8xl md:text-9xl font-bold text-gold/30">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          This page doesn&apos;t exist or the project may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bg-primary bg-gold hover:bg-gold-muted rounded-lg transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none" strokeWidth="2">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
