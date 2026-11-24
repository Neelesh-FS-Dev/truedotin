import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "../content/site";

export type Errors = Record<string, string>;

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export function isInstagramUrl(v: string) {
  if (!v.trim()) return true;
  try {
    const u = new URL(v.trim().startsWith("http") ? v.trim() : `https://${v.trim()}`);
    return /(^|\.)instagram\.com$/.test(u.hostname);
  } catch {
    return false;
  }
}

type Status = "idle" | "sending" | "demo" | "sent" | "error";

// Shared submit handling. With no endpoint configured it shows a demo state and sends nothing.
export function useEnquiry(payloadOf: (form: FormData) => Record<string, unknown>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const submit = async (e: FormEvent<HTMLFormElement>, validate: (f: FormData) => Errors) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      // Focus by field name: aria-invalid is not yet re-rendered at this point.
      form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    if (!site.formEndpoint) {
      setStatus("demo");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadOf(data)),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return { status, errors, submit, setStatus };
}

export function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {children}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  const ids = [error ? `${id}-error` : "", hint ? `${id}-hint` : ""].filter(Boolean).join(" ");
  return ids || undefined;
}

export function StatusMessage({ status, sentText }: { status: Status; sentText: string }) {
  if (status === "demo")
    return (
      <p className="form-status" role="status">
        <strong>Demonstration only.</strong> Nothing was sent and nothing was stored. Set a form endpoint in <code>src/content/site.ts</code> to deliver submissions.
      </p>
    );
  if (status === "sent") return <p className="form-status" role="status">{sentText}</p>;
  if (status === "error")
    return (
      <p className="form-status form-status--error" role="alert">
        Your message did not send. Please try again in a moment.
      </p>
    );
  return null;
}
