import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAccessToken } from "@/lib/sheetsAuth";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RANGE = "ContactSubmissions!A:D";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Save to Google Sheet
    if (SPREADSHEET_ID) {
      try {
        const token = await getAccessToken();
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
        await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [[trimmedName, trimmedEmail, trimmedMessage, timestamp]],
          }),
        });
      } catch (err) {
        console.error("[Contact] Sheet append failed:", err);
      }
    }

    // Send email notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "omolinks@gmail.com",
          subject: `New Contact from ${trimmedName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${trimmedName}</p>
            <p><strong>Email:</strong> ${trimmedEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${trimmedMessage}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">Submitted at ${timestamp}</p>
          `,
        });
        console.log("[Contact] Email sent to omolinks@gmail.com");
      } catch (err) {
        console.error("[Contact] Email send failed:", err);
      }
    } else {
      console.warn("[Contact] RESEND_API_KEY not set. Email skipped.");
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
