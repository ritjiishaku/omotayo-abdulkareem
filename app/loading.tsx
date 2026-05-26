import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
        <p className="text-text-muted text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
