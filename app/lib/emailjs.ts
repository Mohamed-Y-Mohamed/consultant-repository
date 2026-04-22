import emailjs from "@emailjs/browser";

export type ContactPayload = {
  fullName: string;
  company: string;
  email: string;
  enquiryType: string;
  message: string;
};

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function emailjsConfigured(): boolean {
  return Boolean(
    SERVICE_ID &&
      TEMPLATE_ID &&
      PUBLIC_KEY &&
      !SERVICE_ID.startsWith("service_placeholder") &&
      !TEMPLATE_ID.startsWith("template_placeholder") &&
      !PUBLIC_KEY.startsWith("placeholder"),
  );
}

type EmailJsError = { status?: number; text?: string };

function formatEmailJsError(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as EmailJsError & Record<string, unknown>;
    const status = typeof e.status === "number" ? e.status : undefined;
    const text = typeof e.text === "string" ? e.text : undefined;

    // EmailJS throws a plain {status, text} object for API errors.
    if (text) return status ? `EmailJS ${status}: ${text}` : text;

    if (e.message && typeof e.message === "string") return e.message;

    try {
      return JSON.stringify(e);
    } catch {
      return String(err);
    }
  }
  return String(err);
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!emailjsConfigured()) {
    throw new Error(
      "Email service is not yet configured. The site owner needs to add EmailJS credentials.",
    );
  }

  const templateParams = {
    // Primary variables (what our new Evora templates use):
    name: payload.fullName,
    title: payload.enquiryType,
    reply_to: payload.email,
    email: payload.email,
    company: payload.company || "—",
    enquiry_type: payload.enquiryType,
    message: payload.message,
    // Aliases kept for backwards compatibility with any existing templates:
    from_name: payload.fullName,
  };

  try {
    const result = await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams, {
      publicKey: PUBLIC_KEY!,
    });
    return result;
  } catch (err) {
    const readable = formatEmailJsError(err);
    // Log a proper string (never "[object Object]") so it's useful in the console.
    console.error("EmailJS error:", readable, err);
    throw new Error(readable);
  }
}
