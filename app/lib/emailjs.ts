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

export async function sendContactEmail(payload: ContactPayload) {
  if (!emailjsConfigured()) {
    throw new Error(
      "Email service is not yet configured. The site owner needs to add EmailJS credentials.",
    );
  }

  const templateParams = {
    // Primary variables (what our new Evora templates use):
    name: payload.fullName,
    email: payload.email,
    reply_to: payload.email,
    company: payload.company || "—",
    enquiry_type: payload.enquiryType,
    message: payload.message,
  };

  return emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams, {
    publicKey: PUBLIC_KEY!,
  });
}
