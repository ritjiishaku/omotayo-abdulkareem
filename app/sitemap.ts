import { MetadataRoute } from "next";
import { getProjects } from "@/lib/googleSheets";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://omotayo.dev/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://omotayo.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
