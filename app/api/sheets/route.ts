import { getAccessToken } from "@/lib/sheetsAuth";
import {
  getGeneralInfo,
  getServices,
  getSkills,
  getExperiences,
  getProjects,
  getTestimonials,
  updateSheetValues,
} from "@/lib/googleSheets";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export async function GET() {
  const [general, services, skills, experiences, projects, testimonials] =
    await Promise.all([
      getGeneralInfo(),
      getServices(),
      getSkills(),
      getExperiences(),
      getProjects(),
      getTestimonials(),
    ]);

  return Response.json({
    general,
    services,
    skills,
    experiences,
    projects,
    testimonials,
    source: SPREADSHEET_ID ? "sheets" : "mock",
  });
}

const TAB_RANGES: Record<string, string> = {
  general: "General!A1:B20",
  services: "Services!A1:B50",
  skills: "Skills!A1:C50",
  experience: "Experience!A1:D50",
  projects: "Projects!A1:L50",
  testimonials: "Testimonials!A1:C50",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tab = body.tab?.toLowerCase();
    const range = TAB_RANGES[tab];

    if (!range) {
      return Response.json(
        {
          error: `Unknown tab "${body.tab}". Valid: ${Object.keys(TAB_RANGES).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const { values } = body;
    if (!Array.isArray(values) || values.length === 0) {
      return Response.json(
        { error: "Request body must contain a non-empty `values` array of rows" },
        { status: 400 }
      );
    }

    const success = await updateSheetValues(range, values);

    if (!success) {
      return Response.json(
        { error: "Failed to update sheet" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, tab, rows: values.length });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Invalid request" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}