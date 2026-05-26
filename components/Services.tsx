import React from "react";
import { Service } from "@/lib/mockData";

interface ServicesProps {
  services: Service[];
}

const serviceIcons: Record<string, React.ReactNode> = {
  default: <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  "ai work flow automation": <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.05A6.99 6.99 0 0 1 19 22H5a6.99 6.99 0 0 1-1.95-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" /></svg>,
  "crm automation": <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  "ai chatbots": <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  "business process automation": <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
  "api integrations": <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold stroke-current fill-none" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
};

function getIcon(title: string): React.ReactNode {
  const key = title.toLowerCase();
  for (const [match, icon] of Object.entries(serviceIcons)) {
    if (key.includes(match)) return icon;
  }
  return serviceIcons.default;
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">02 / What I Do</p>
          <h2 className="section-title">Services</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="card-hover flex flex-col"
            >
              <div className="p-6 md:p-8 space-y-5 flex-1">
                <div className="p-2.5 rounded bg-bg-elevated border border-gold/20 inline-flex">
                  {getIcon(service.title)}
                </div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  {service.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
