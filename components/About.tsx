import React from "react";
import { GeneralInfo } from "@/lib/mockData";

interface AboutProps {
  generalInfo: GeneralInfo;
}

export default function About({ generalInfo }: AboutProps) {
  const pillars = [
    {
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
      title: "Speed & Efficiency",
      description: "Eliminate repetitive tasks to allow your team to focus on strategic initiatives."
    },
    {
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
      title: "Reliability First",
      description: "Design fault-tolerant workflows with automated retries and real-time error notifications."
    },
    {
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
      title: "ROI-Driven Solutions",
      description: "Every automation is custom-built to directly reduce expenses or increase pipeline volume."
    },
    {
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>,
      title: "AI Native Integration",
      description: "Infuse your workflows with smart LLM analysis, categorization, and routing."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-bg-primary relative">

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">
            01 / Professional Profile
          </p>
          <h2 className="section-title">
            About Me
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Detailed Biography */}
          <div className="lg:col-span-7 space-y-6 text-text-primary leading-relaxed">
            <h3 className="font-serif text-2xl font-semibold text-white">
              Engineering systems that work while you sleep.
            </h3>
            <p>{generalInfo.bioSummary}</p>
            <p>{generalInfo.bioDetailed}</p>
            <div className="p-6 rounded bg-bg-surface/50 border-l-2 border-gold text-sm italic text-text-muted">
              &quot;The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.&quot;
            </div>
          </div>

          {/* Pillars Card Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="card-hover flex items-start space-x-4 p-6"
              >
                <div className="p-2.5 rounded bg-bg-elevated border border-gold/20">
                  {pillar.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-white tracking-wide">
                    {pillar.title}
                  </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
