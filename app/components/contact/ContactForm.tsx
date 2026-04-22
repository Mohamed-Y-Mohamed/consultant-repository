"use client";
import { useState, ReactNode } from "react";

const ENQUIRY_TYPES = [
  "Management Contracts",
  "Revenue Management",
  "Property Sales",
  "Digital Marketing",
  "Staffing Solutions",
  "Careers",
  "General Enquiry",
];

type FieldProps = {
  label: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
};

function Field({ label, required, htmlFor, children }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && <span style={{ color: "var(--gold)", marginLeft: "6px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    enquiryType: "General Enquiry",
    message: "",
  });

  const onChange = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({} as Record<string, unknown>));
      if (!res.ok) {
        const d = data as { error?: string; detail?: string | unknown };
        let msg: string | undefined = d.error;
        if (!msg && typeof d.detail === "string") msg = d.detail;
        if (!msg && Array.isArray(d.detail)) {
          msg = (d.detail as Array<{ msg?: string }>).map((e) => e.msg).filter(Boolean).join("; ");
        }
        setError(msg || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        data-testid="contact-form-success"
        style={{
          border: "1px solid var(--border-gold)",
          padding: "3.5rem 2.5rem",
          textAlign: "center",
          background: "var(--bg-secondary)",
          position: "relative",
        }}
      >
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        }} />
        <span className="section-label mb-5 inline-block">
          <span className="gold-line" />
          Message Received
        </span>
        <h3 className="display-heading text-primary mt-2 mb-5" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 300 }}>
          Thank you for reaching out.
        </h3>
        <p className="text-secondary" style={{ maxWidth: "32rem", margin: "0 auto", lineHeight: 1.8, fontSize: "0.98rem" }}>
          Your enquiry has been received. A member of our team will respond within three
          business days. For urgent matters, please contact our London office directly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm({ fullName: "", company: "", email: "", enquiryType: "General Enquiry", message: "" });
          }}
          className="btn-outline mt-8"
          data-testid="contact-form-reset"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="contact-form" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.75rem" }}>
        <Field label="Full Name" required htmlFor="fullName">
          <input
            id="fullName"
            data-testid="contact-input-fullname"
            className="field-input"
            type="text"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            required
          />
        </Field>
        <Field label="Company" htmlFor="company">
          <input
            id="company"
            data-testid="contact-input-company"
            className="field-input"
            type="text"
            placeholder="Optional"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </Field>
        <Field label="Email Address" required htmlFor="email">
          <input
            id="email"
            data-testid="contact-input-email"
            className="field-input"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
          />
        </Field>
        <Field label="Enquiry Type" htmlFor="enquiryType">
          <select
            id="enquiryType"
            data-testid="contact-input-enquirytype"
            className="field-select"
            value={form.enquiryType}
            onChange={(e) => onChange("enquiryType", e.target.value)}
          >
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" required htmlFor="message">
        <textarea
          id="message"
          data-testid="contact-input-message"
          className="field-textarea"
          rows={5}
          placeholder="Tell us about your property, timeline, and how we can help."
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          required
        />
      </Field>

      {error && status === "error" && (
        <p data-testid="contact-form-error" style={{ color: "#E86B6B", fontSize: "0.85rem" }}>{error}</p>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem" }}>
        <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.7, maxWidth: "24rem" }}>
          By sending this form, you consent to Evora Capital contacting you regarding your enquiry.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
          data-testid="contact-form-submit"
        >
          {status === "loading" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ animation: "spin 0.8s linear infinite" }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                <path d="M22 12a10 10 0 01-10 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              Sending
            </>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
