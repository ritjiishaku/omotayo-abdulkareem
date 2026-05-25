import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-bg-surface rounded-lg border border-border hover:border-gold/30 hover:shadow-gold-sm transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="p-6 space-y-5">
        {/* Header: Featured badge + category */}
        <div className="flex items-center justify-between gap-3">
          {project.featured ? (
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              Featured
            </span>
          ) : (
            <span />
          )}
          {project.category && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
              {project.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-gold transition-colors duration-200">
          {project.title}
        </h3>

        {/* Problem */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
            Problem
          </span>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
            Solution
          </span>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {project.solution}
          </p>
        </div>

        {/* Outcome */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
            Outcome
          </span>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {project.outcome.split("\n")[0]}
          </p>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tools.slice(0, 4).map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="tag">+{project.tools.length - 4}</span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1 text-xs uppercase tracking-wider text-gold font-semibold">
            <span>Read Case Study</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current fill-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
          </div>
          {project.demoUrl && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoUrl, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center space-x-1 text-xs uppercase tracking-wider text-gold-muted font-semibold hover:text-gold transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current fill-none" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Watch Demo</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
