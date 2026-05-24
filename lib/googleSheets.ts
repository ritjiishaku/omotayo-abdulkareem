import {
  generalInfo as mockGeneralInfo,
  services as mockServices,
  skills as mockSkills,
  experiences as mockExperiences,
  projects as mockProjects,
  testimonials as mockTestimonials,
  GeneralInfo,
  Service,
  Testimonial,
} from "./mockData";
import { Project } from "@/types/project";
import { Experience } from "@/types/experience";
import { Skill } from "@/types/skill";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_DEVELOPER_API_KEY;

async function getSheetValues(range: string): Promise<string[][] | null> {
  if (!SPREADSHEET_ID || !API_KEY) return null;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`[Google Sheets] Failed to fetch "${range}": ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.values || null;
  } catch (error) {
    console.error(`[Google Sheets] Error fetching "${range}":`, error);
    return null;
  }
}

function parseRowsToObjects(
  values: string[][] | null
): Record<string, string>[] | null {
  if (!values || values.length < 2) return null;
  const headers = values[0].map((h) => h.trim().toLowerCase());
  const rows = values.slice(1);
  return rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index].trim() : "";
    });
    return obj;
  });
}

export async function getGeneralInfo(): Promise<GeneralInfo> {
  const values = await getSheetValues("General!A1:B20");
  if (!values) return mockGeneralInfo;
  try {
    const info: GeneralInfo = { ...mockGeneralInfo };
    values.forEach((row) => {
      if (row.length < 2) return;
      const key = row[0].trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      const val = row[1].trim();
      if (key === "name") info.name = val;
      else if (key === "role") info.role = val;
      else if (key === "tagline") info.tagline = val;
      else if (key === "biosummary") info.bioSummary = val;
      else if (key === "biodetailed") info.bioDetailed = val;
      else if (key === "email") info.email = val;
      else if (key === "phone") info.phone = val;
      else if (key === "whatsapp") info.whatsapp = val;
      else if (key === "location") info.location = val;
      else if (key === "linkedin") info.linkedin = val;
    });
    return info;
  } catch (e) {
    console.error("[Google Sheets] Error parsing generalInfo", e);
    return mockGeneralInfo;
  }
}

export async function getServices(): Promise<Service[]> {
  const values = await getSheetValues("Services!A1:B50");
  const parsed = parseRowsToObjects(values);
  if (!parsed) return mockServices;
  return parsed.map((item) => ({
    title: item.title || "",
    description: item.description || "",
  }));
}

export async function getSkills(): Promise<Skill[]> {
  const values = await getSheetValues("Skills!A1:C50");
  const parsed = parseRowsToObjects(values);
  if (!parsed) return mockSkills;
  return parsed.map((item) => ({
    name: item.name || "",
    category: item.category || "General",
    level: parseInt(item.level, 10) || 80,
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  const values = await getSheetValues("Experience!A1:D50");
  const parsed = parseRowsToObjects(values);
  if (!parsed) return mockExperiences;
  return parsed.map((item) => ({
    company: item.company || "",
    role: item.role || "",
    period: item.period || "",
    description: item.description || "",
  }));
}

export async function getProjects(): Promise<Project[]> {
  const values = await getSheetValues("Projects!A1:K50");
  const parsed = parseRowsToObjects(values);
  if (!parsed) return mockProjects;
  return parsed.map((item) => ({
    id: item.id || "",
    slug: item.slug || "",
    title: item.title || "",
    category: item.category || "",
    summary: item.summary || "",
    problem: item.problem || "",
    solution: item.solution || "",
    tools: item.tools
      ? item.tools.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    outcome: item.outcome || "",
    featured:
      item.featured === "true" ||
      item.featured === "TRUE" ||
      item.featured === "1" ||
      item.featured === "yes",
    image:
      item.image ||
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const values = await getSheetValues("Testimonials!A1:C50");
  const parsed = parseRowsToObjects(values);
  if (!parsed) return mockTestimonials;
  return parsed.map((item) => ({
    name: item.name || "",
    role: item.role || "",
    text: item.text || "",
  }));
}
