import React from "react";
import { Testimonial } from "@/lib/mockData";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-24 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">06 / Client Endorsements</p>
          <h2 className="section-title">Client Testimonials</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="card-hover p-6 md:p-8 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold/20 fill-current"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /></svg>
                <p className="text-text-primary text-sm leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="pt-6 border-t border-gold/5 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-bg-primary border border-gold/20 flex items-center justify-center font-serif text-gold text-sm font-bold shrink-0">
                    {testimonial.name[0]}
                  </div>
                  <div className="text-xs">
                    <h4 className="font-serif font-bold text-white tracking-wider">
                      {testimonial.name}
                    </h4>
                    <p className="text-text-muted mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
