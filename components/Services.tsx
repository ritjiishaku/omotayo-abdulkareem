import React from "react";
import { Service } from "@/lib/mockData";

interface ServicesProps {
  services: Service[];
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
                <div className="w-8 h-px bg-gold/60" />
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
