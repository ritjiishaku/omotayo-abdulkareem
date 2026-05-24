import { GeneralInfo, Service } from "./mockData";
import { Project } from "@/types/project";

const siteUrl = "https://omotayo.dev";

export function getPersonSchema(info: GeneralInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": info.name,
    "jobTitle": info.role,
    "description": "AI Automation Engineer specializing in workflow automation, AI agent systems, CRM automation, and business process automation. Helping businesses eliminate manual bottlenecks and scale operations through intelligent automation systems.",
    "url": siteUrl,
    "sameAs": [info.linkedin].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "Nigeria",
    },
    "knowsAbout": [
      "AI Automation",
      "Workflow Automation Systems",
      "AI Agent Systems",
      "CRM Automation Systems",
      "Business Process Automation",
      "API Integrations",
      "Intelligent Automation",
      "Automation Strategy",
    ],
  };
}

export function getProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "headline": project.summary,
    "description": project.solution,
    "image": project.image,
    "url": `${siteUrl}/projects/${project.slug}`,
    "creator": {
      "@type": "Person",
      "name": "Omotayo Abdulkareem",
    },
    "keywords": project.tools.join(", "),
  };
}

export function getLocalBusinessSchema(info: GeneralInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${info.name} - AI Automation Engineering`,
    "description": "AI Automation Engineer providing workflow automation, AI agent development, CRM automation, and business process automation services. Serving businesses worldwide.",
    "url": siteUrl,
    "email": info.email,
    "telephone": info.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "NG",
    },
    "sameAs": [info.linkedin].filter(Boolean),
    "areaServed": "Worldwide",
    "priceRange": "$$",
  };
}

export function getServicesSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "Person",
          "name": "Omotayo Abdulkareem",
          "jobTitle": "AI Automation Engineer",
        },
      },
    })),
  };
}
