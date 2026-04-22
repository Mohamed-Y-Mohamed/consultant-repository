import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  fullName?: string;
  company?: string;
  email?: string;
  enquiryType?: string;
  message?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").trim();
  const enquiryType = (body.enquiryType || "General Enquiry").trim();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Full name, email, and message are required." },
      { status: 400 },
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!to) {
    return NextResponse.json({ error: "Recipient email not configured." }, { status: 500 });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; background:#0E0C0A; color:#F5F0E8; padding:32px;">
      <div style="max-width:600px; margin:0 auto; background:#1A1816; border:1px solid #3A3530; padding:32px;">
        <p style="color:#C9A96E; letter-spacing:0.22em; font-size:11px; text-transform:uppercase; margin:0 0 8px;">Evora Capital — New Enquiry</p>
        <h1 style="font-family: Georgia, serif; color:#F5F0E8; font-weight:300; margin:0 0 24px; font-size:26px;">${escapeHtml(enquiryType)}</h1>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:8px 0; color:#A8A09A; width:120px;">Name</td><td style="padding:8px 0; color:#F5F0E8;">${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A;">Email</td><td style="padding:8px 0; color:#F5F0E8;"><a href="mailto:${escapeHtml(email)}" style="color:#C9A96E; text-decoration:none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A;">Company</td><td style="padding:8px 0; color:#F5F0E8;">${escapeHtml(company || "—")}</td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A; vertical-align:top;">Enquiry</td><td style="padding:8px 0; color:#F5F0E8;">${escapeHtml(enquiryType)}</td></tr>
        </table>
        <hr style="border:none; border-top:1px solid #3A3530; margin:20px 0;" />
        <p style="color:#A8A09A; letter-spacing:0.22em; font-size:10px; text-transform:uppercase; margin:0 0 10px;">Message</p>
        <p style="color:#F5F0E8; font-size:14px; line-height:1.7; white-space:pre-wrap; margin:0;">${escapeHtml(message)}</p>
      </div>
      <p style="color:#7F7872; font-size:11px; text-align:center; margin-top:20px;">Sent via evoracapital.com contact form</p>
    </div>
  `;

  if (!apiKey || apiKey.startsWith("re_placeholder")) {
    console.warn("[send-enquiry] RESEND_API_KEY not configured. Enquiry logged only:", {
      fullName, email, company, enquiryType, message,
    });
    return NextResponse.json({
      error: "Email service is not yet configured. The site owner needs to add RESEND_API_KEY.",
    }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: `Evora Capital <${from}>`,
      to: [to],
      subject: `New Enquiry — ${enquiryType} — ${fullName}`,
      replyTo: email,
      html,
    });

    if (error) {
      console.error("[send-enquiry] Resend error:", error);
      return NextResponse.json({ error: "Unable to send message. Please try again shortly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[send-enquiry] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}

export async function GET() {
  const configured = !!process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_placeholder");
  return NextResponse.json({ ok: true, route: "send-enquiry", email_configured: configured });
}
