import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  intent?: string;
  name?: string;
  phone?: string;
  pagePath?: string;
  pageTitle?: string;
  transcript?: Array<{ role: string; text: string }>;
};

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as LeadPayload;
  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const intent = payload.intent?.trim();

  if (!name || !phone || !intent) {
    return NextResponse.json(
      { error: "Name, phone, and intent are required." },
      { status: 400 }
    );
  }

  const toEmail = process.env.RESEND_LEAD_TO_EMAIL || "info@isighteyecare.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "iSight Chatbot <onboarding@resend.dev>";
  const receivedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const transcriptLines =
    payload.transcript
      ?.map((entry) => `${entry.role === "bot" ? "Bot" : "User"}: ${entry.text}`)
      .join("\n") || "No transcript provided";

  await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `New chatbot lead: ${name}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Intent: ${intent}`,
      `Page path: ${payload.pagePath || "Unknown"}`,
      `Page title: ${payload.pageTitle || "Unknown"}`,
      `Received at (IST): ${receivedAt}`,
      "",
      "Conversation transcript:",
      transcriptLines,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
