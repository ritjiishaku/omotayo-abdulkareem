import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/sheetsAuth";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const RANGE = "ContactSubmissions!A:D";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Always log so submissions are never silently lost
    console.log("[Contact] New submission:", { name, email, timestamp });

    if (!SPREADSHEET_ID) {
      // No sheet configured — still acknowledge the submission
      console.warn(
        "[Contact] GOOGLE_SHEETS_SPREADSHEET_ID not set. Submission logged above."
      );
      return NextResponse.json({ ok: true });
    }

    const token = await getAccessToken();

    // Append a new row to the ContactSubmissions tab
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(
      RANGE
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[name.trim(), email.trim(), message.trim(), timestamp]],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[Contact] Failed to append to sheet:", res.status, text);
      // Return success anyway so the user isn't punished for a sheet misconfiguration
      return NextResponse.json({ ok: true, warning: "sheet_unavailable" });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
