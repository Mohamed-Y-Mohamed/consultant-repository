import emailjs from "@emailjs/browser";

export type ContactPayload = {
  fullName: string;
  company: string;
  email: string;
  enquiryType: string;
  message: string;
};

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function emailjsConfigured(): boolean {
  return Boolean(
    SERVICE_ID &&
      ADMIN_TEMPLATE_ID &&
      PUBLIC_KEY &&
      !SERVICE_ID.startsWith("service_placeholder") &&
      !ADMIN_TEMPLATE_ID.startsWith("template_placeholder") &&
      !PUBLIC_KEY.startsWith("placeholder"),
  );
}

type EmailJsError = { status?: number; text?: string };

function formatEmailJsError(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as EmailJsError & Record<string, unknown>;
    const status = typeof e.status === "number" ? e.status : undefined;
    const text = typeof e.text === "string" ? e.text : undefined;
    if (text) return status ? `EmailJS ${status}: ${text}` : text;
    if (typeof e.message === "string") return e.message;
    try {
      return JSON.stringify(e);
    } catch {
      return String(err);
    }
  }
  return String(err);
}

function buildTemplateParams(payload: ContactPayload) {
  return {
    name: payload.fullName,
    title: payload.enquiryType,
    reply_to: payload.email,
    email: payload.email,
    company: payload.company || "—",
    enquiry_type: payload.enquiryType,
    message: payload.message,
    from_name: payload.fullName,
  };
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!emailjsConfigured()) {
    throw new Error(
      "Email service is not yet configured. The site owner needs to add EmailJS credentials.",
    );
  }

  const templateParams = buildTemplateParams(payload);
  const options = { publicKey: PUBLIC_KEY! };

  try {
    // 1) Admin notification — goes to m.y.m1995@outlook.com (set inside the template)
    const adminResult = await emailjs.send(
      SERVICE_ID!,
      ADMIN_TEMPLATE_ID!,
      templateParams,
      options,
    );

    // 2) Optional auto-reply — goes to the submitter. Only fires if a second template is configured.
    if (
      AUTOREPLY_TEMPLATE_ID &&
      !AUTOREPLY_TEMPLATE_ID.startsWith("template_placeholder")
    ) {
      try {
        await emailjs.send(
          SERVICE_ID!,
          AUTOREPLY_TEMPLATE_ID,
          templateParams,
          options,
        );
      } catch (autoErr) {
        // Don't fail the whole submission if just the auto-reply bounces.
        console.warn("EmailJS auto-reply failed (admin email still sent):", formatEmailJsError(autoErr));
      }
    }

    return adminResult;
  } catch (err) {
    const readable = formatEmailJsError(err);
    console.error("EmailJS error:", readable, err);
    throw new Error(readable);
  }
}
