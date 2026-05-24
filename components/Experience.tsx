import React from "react";
import { Experience } from "@/types/experience";

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <p className="section-label">04 / Professional Path</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="relative ml-4 md:ml-8">
          <div className="absolute left-0 md:left-4 top-2 bottom-2 w-px bg-gold/15" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-10 md:pl-16 group">
                <div className="absolute left-[-4px] md:left-0 top-2 w-2.5 h-2.5 rounded-full bg-gold/40 border-2 border-bg-surface group-hover:bg-gold group-hover:scale-125 transition-all duration-300" />

                <div className="card-hover p-6 md:p-8 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-gold font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-text-muted shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 text-sm text-text-muted leading-relaxed">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/40" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
