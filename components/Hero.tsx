import React from "react";
import { GeneralInfo } from "@/lib/mockData";

interface HeroProps {
  generalInfo: GeneralInfo;
}

export default function Hero({ generalInfo }: HeroProps) {
  const whatsappNumber = generalInfo.whatsapp.replace(/[^0-9]/g, "");
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-bg-primary"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gold/30" />

      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-10">
        <div className="space-y-5">
          <h1 className="space-y-2">
            <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
              {generalInfo.name}
            </span>
            <span className="block font-serif text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-gold">
              {generalInfo.role}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-text-muted text-base md:text-lg leading-relaxed">
            {generalInfo.tagline}
          </p>
        </div>

        <div className="w-16 h-px bg-gold/50 mx-auto" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center space-x-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bg-primary bg-gold hover:bg-gold-muted rounded-lg transition-all duration-300"
          >
            <span>View Projects</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary border border-gold/30 hover:border-gold rounded-lg transition-all duration-300"
          >
            <span>Contact Me</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold stroke-current fill-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
