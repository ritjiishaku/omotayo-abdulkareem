import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="py-24 bg-bg-primary" />,
});

import {
  getGeneralInfo,
  getServices,
  getSkills,
  getExperiences,
  getProjects,
  getTestimonials
} from "@/lib/googleSheets";
import { getPersonSchema, getLocalBusinessSchema, getServicesSchema } from "@/lib/seo";

// Enable ISR: Revalidate page data at most every hour
export const revalidate = 3600;

export default async function Home() {
  // Fetch all CMS data in parallel
  const [generalInfo, services, skills, experiences, projects, testimonials] = await Promise.all([
    getGeneralInfo(),
    getServices(),
    getSkills(),
    getExperiences(),
    getProjects(),
    getTestimonials()
  ]);

  // Generate structured SEO data
  const personSchema = getPersonSchema(generalInfo);
  const localBusinessSchema = getLocalBusinessSchema(generalInfo);
  const servicesSchema = getServicesSchema(services);

  return (
    <>
      {/* Structured SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Navigation bar */}
        <Navbar generalInfo={generalInfo} />

        <main className="flex-1">
          {/* Section: Hero */}
          <Hero generalInfo={generalInfo} />

          {/* Section: About */}
          <About generalInfo={generalInfo} />

          {/* Section: Services */}
          <Services services={services} />

          {/* Section: Skills */}
          <Skills skills={skills} />

          {/* Section: Experience */}
          <Experience experiences={experiences} />

          {/* Section: Projects */}
          <Projects projects={projects} />

          {/* Section: Testimonials */}
          <Testimonials testimonials={testimonials} />

          {/* Section: Contact Form */}
          <Contact generalInfo={generalInfo} />
        </main>

        <WhatsAppButton phone={generalInfo.whatsapp} />

        {/* Universal Footer */}
        <Footer generalInfo={generalInfo} />
      </div>
    </>
  );
}
