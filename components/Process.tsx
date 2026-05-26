import React from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We map your current workflows, identify bottlenecks, and define measurable goals for the automation."
  },
  {
    number: "02",
    title: "Design",
    description: "I architect a custom automation blueprint — tool selection, data flow, error handling, and success metrics."
  },
  {
    number: "03",
    title: "Build & Test",
    description: "The automation is built, tested with real data, and iterated until it meets reliability and accuracy thresholds."
  },
  {
    number: "04",
    title: "Deploy & Optimize",
    description: "Deployed to production with monitoring, alerting, and documentation. Ongoing optimization to ensure peak performance."
  }
];

export default function Process() {
  return (
    <section id="process" className="py-16 md:py-20 lg:py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">How I Work</p>
          <h2 className="section-title">The Process</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="card-hover p-6 md:p-8 space-y-4 relative">
              <span className="block font-serif text-4xl font-bold text-gold/20">
                {step.number}
              </span>
              <div className="w-8 h-px bg-gold/60" />
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
