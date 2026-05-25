import type { NextRequest } from "next/server";
import { updateSheetValues } from "@/lib/googleSheets";

const TAB_RANGES: Record<string, string> = {
  general: "General!A1:B20",
  services: "Services!A1:B50",
  skills: "Skills!A1:C50",
  experience: "Experience!A1:D50",
  projects: "Projects!A1:L50",
  testimonials: "Testimonials!A1:C50",
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ tab: string }> }
) {
  const { tab } = await params;
  const range = TAB_RANGES[tab.toLowerCase()];

  if (!range) {
    return Response.json(
      { error: `Unknown tab "${tab}". Valid tabs: ${Object.keys(TAB_RANGES).join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
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
        { error: "Failed to update sheet. Check server logs." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, tab, rows: values.length });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Invalid request body" },
      { status: 400 }
    );
  }
}