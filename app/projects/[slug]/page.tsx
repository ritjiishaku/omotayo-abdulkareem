import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjects, getGeneralInfo } from "@/lib/googleSheets";
import { getProjectSchema } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `https://omotayo.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://omotayo.dev/projects/${project.slug}`,
      images: [{ url: project.image }],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [generalInfo, projects] = await Promise.all([
    getGeneralInfo(),
    getProjects(),
  ]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const projectSchema = getProjectSchema(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <div className="flex flex-col min-h-screen bg-bg-primary">
        <Navbar generalInfo={generalInfo} />

        <main className="flex-1 pt-32 pb-24">
          <div className="max-w-5xl mx-auto px-6 space-y-8 lg:space-y-12">
            <Link
              href="/#projects"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-text-muted hover:text-gold font-semibold transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none group-hover:-translate-x-1 transition-transform duration-200" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Case Studies</span>
            </Link>

            <div className="space-y-4">
              {project.category && (
                <span className="px-3 py-1 rounded bg-gold/10 border border-gold/25 text-xs font-semibold uppercase tracking-widest text-gold-muted">
                  {project.category}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight break-words">
                {project.title}
              </h1>
              <p className="text-text-muted text-base md:text-lg max-w-3xl leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden card">
              <Image
                src={project.image}
                alt={`${project.title} case study`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
              <div className="lg:col-span-4 space-y-6 lg:order-last">
                <div className="card-hover p-6 space-y-6">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wider border-b border-gold/10 pb-3">
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8 lg:space-y-12 leading-relaxed text-text-primary">
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Overview
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {project.problem && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                      <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                        The Challenge
                      </h3>
                    </div>
                    <p className="text-sm md:text-base">{project.problem}</p>
                  </div>
                )}

                {project.solution && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2">
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                      </svg>
                      <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-sm md:text-base">{project.solution}</p>
                  </div>
                )}

                {project.outcome && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current fill-none" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                        The Results
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {project.outcome.split("\n").map((line, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-3 text-sm md:text-base"
                        >
                          <span className="h-5 w-5 text-gold shrink-0 mt-0.5">
                            •
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.demoUrl && (
                  <div className="pt-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 px-6 py-3 rounded-lg bg-gold text-bg-primary font-semibold text-sm uppercase tracking-wider hover:bg-gold-muted transition-colors duration-200"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" strokeWidth="0">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>Watch Demo Recording</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer generalInfo={generalInfo} />
      </div>
    </>
  );
}
