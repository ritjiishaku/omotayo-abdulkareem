"use client";

import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(projects.map((p) => p.category).filter(Boolean))
      ),
    ],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? projects
        : projects.filter((p) => p.category === selectedCategory);
    return [...filtered].sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="section-label">05 / Proven Outcomes</p>
          <h2 className="section-title">Case Studies</h2>
          <div className="section-divider mx-auto" />
        </div>

        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold text-bg-primary border-gold"
                    : "bg-bg-card text-text-muted border-gold/10 hover:text-white hover:border-gold/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
