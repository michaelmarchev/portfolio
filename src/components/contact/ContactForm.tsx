"use client";

import { useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Contact form UI.
 *
 * There is no backend in this build. Set NEXT_PUBLIC_CONTACT_ENDPOINT to a
 * form service (Formspree, Basin, a Resend route at /api/contact, anything
 * that accepts a JSON POST) and the form submits to it. Until then, a valid
 * submission resolves into a prefilled email link, so the page is never a dead
 * end for a visitor who has already typed a message.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

type FieldName = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent" | "failed" | "mailto";

const FIELD_LABEL: Record<FieldName, string> = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const EMPTY = { name: "", email: "", subject: "", message: "" };

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter an email address so I can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address does not look complete.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "A sentence or two about what you are working on helps.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({ ...EMPTY });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: FieldName) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const mailtoHref = () => {
    const subject = values.subject.trim() || "Portfolio enquiry";
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = (Object.keys(found) as FieldName[])[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      setValues({ ...EMPTY });
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <Field
        name="name"
        value={values.name}
        error={errors.name}
        onChange={set("name")}
        autoComplete="name"
        required
      />
      <Field
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={set("email")}
        autoComplete="email"
        required
      />
      <Field
        name="subject"
        value={values.subject}
        error={errors.subject}
        onChange={set("subject")}
        hint="Optional"
        autoComplete="off"
      />
      <Field
        name="message"
        value={values.message}
        error={errors.message}
        onChange={set("message")}
        multiline
        required
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
        <ButtonAction type="submit" variant="solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </ButtonAction>
        <p className="u-meta text-fg-4">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="u-link text-fg-3">
            {site.email}
          </a>
        </p>
      </div>

      {/* Single live region: screen readers hear one status, not four. */}
      <div aria-live="polite" role="status" className="min-h-[1.25rem]">
        {status === "sent" && (
          <p className="text-caption text-fg-2">
            Thank you — your message has been sent. I will reply to the address
            you gave.
          </p>
        )}
        {status === "failed" && (
          <p className="text-caption text-accent-text">
            Something went wrong sending that. Please email{" "}
            <a href={`mailto:${site.email}`} className="u-link">
              {site.email}
            </a>{" "}
            directly.
          </p>
        )}
        {status === "mailto" && (
          <p className="text-caption text-fg-2">
            This form is not connected to a mail service yet.{" "}
            <a href={mailtoHref()} className="u-link text-accent-text">
              Open this message in your email client
            </a>{" "}
            to send it now.
          </p>
        )}
        {Object.keys(errors).length > 0 && status === "idle" && (
          <p className="text-caption text-accent-text">
            Please check the highlighted {Object.keys(errors).length === 1 ? "field" : "fields"}.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  value,
  error,
  onChange,
  type = "text",
  multiline,
  required,
  hint,
  autoComplete,
}: {
  name: FieldName;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const control = cn(
    "w-full border-0 border-b bg-transparent px-0 py-3 font-sans text-[1.0625rem] text-fg",
    "placeholder:text-fg-4 focus:outline-none focus-visible:outline-none",
    "transition-colors duration-200",
    error
      ? "border-b-accent-text"
      : "border-b-line-strong focus:border-b-accent hover:border-b-fg-3",
  );

  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="u-meta text-fg-3">
          {FIELD_LABEL[name]}
          {required && (
            <span aria-hidden="true" className="pl-1 text-accent-text">
              *
            </span>
          )}
        </label>
        {hint && (
          <span id={hintId} className="u-meta text-fg-4">
            {hint}
          </span>
        )}
      </div>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={cn(control, "resize-y leading-[1.65]")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={control}
        />
      )}

      {error && (
        <p id={errorId} className="text-caption text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}
