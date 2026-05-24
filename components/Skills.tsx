import React from "react";
import { Skill } from "@/types/skill";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="section-label">03 / Automation Stack</p>
          <h2 className="section-title">Skills</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );

            return (
              <div key={category} className="card-hover p-6 space-y-5">
                <h3 className="font-serif text-sm font-bold text-gold tracking-wider uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-block px-3 py-1.5 text-xs font-medium text-text-muted bg-bg-elevated border border-border rounded-md hover:border-gold/30 hover:text-gold transition-all duration-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
