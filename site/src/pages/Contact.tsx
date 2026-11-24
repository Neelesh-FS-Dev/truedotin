import { Field, StatusMessage, describedBy, isEmail, useEnquiry, type Errors } from "../components/forms";
import { services } from "../content/site";
import { useDocumentMeta } from "../lib/meta";

const objectives = ["Awareness", "Creator-led content", "Event or launch", "Community or hospitality", "Public relations", "Other"];

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!String(d.get("name") ?? "").trim()) e.name = "Please enter your name.";
  if (!String(d.get("company") ?? "").trim()) e.company = "Please enter your company or brand.";
  const email = String(d.get("email") ?? "");
  if (!email.trim()) e.email = "Please enter a work email address.";
  else if (!isEmail(email)) e.email = "Please enter a valid email address.";
  if (!String(d.get("service") ?? "")) e.service = "Please choose the service you are interested in.";
  if (!String(d.get("message") ?? "").trim()) e.message = "Please describe the project.";
  if (!d.get("consent")) e.consent = "Please confirm you agree to be contacted about this enquiry.";
  return e;
}

export default function Contact() {
  useDocumentMeta("Contact — True.in", "Start a project with True.in: influencer marketing, celebrity collaborations, brand events, launches and PR.");
  const { status, errors, submit } = useEnquiry((d) => ({
    kind: "business",
    name: d.get("name"),
    company: d.get("company"),
    email: d.get("email"),
    phone: d.get("phone"),
    service: d.get("service"),
    objective: d.get("objective"),
    budget: d.get("budget"),
    timeline: d.get("timeline"),
    message: d.get("message"),
  }));

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1 className="display display--md">Have a brand story to tell?</h1>
        <p className="lede">Tell us about the brand, the audience and what you want people to feel. We reply by email once the enquiry is received.</p>
      </section>
      <section className="form-wrap">
        <form className="form" noValidate onSubmit={(e) => submit(e, validate)} aria-describedby="form-note">
          <p id="form-note" className="caption">Fields marked required are needed to respond. Optional fields help us prepare.</p>
          <div className="form__row">
            <Field id="name" label="Name (required)" error={errors.name}>
              <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describedBy("name", errors.name)} required />
            </Field>
            <Field id="company" label="Company or brand (required)" error={errors.company}>
              <input id="company" name="company" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={describedBy("company", errors.company)} required />
            </Field>
          </div>
          <div className="form__row">
            <Field id="email" label="Work email (required)" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("email", errors.email)} required />
            </Field>
            <Field id="phone" label="Phone (optional)">
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </Field>
          </div>
          <div className="form__row">
            <Field id="service" label="Interested service (required)" error={errors.service}>
              <select id="service" name="service" defaultValue="" aria-invalid={!!errors.service} aria-describedby={describedBy("service", errors.service)} required>
                <option value="" disabled>Choose one</option>
                {services.map((s) => (
                  <option key={s.no} value={s.title}>{s.title}</option>
                ))}
              </select>
            </Field>
            <Field id="objective" label="Campaign objective (optional)">
              <select id="objective" name="objective" defaultValue="">
                <option value="">Choose one</option>
                {objectives.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="form__row">
            <Field id="budget" label="Estimated budget range (optional)" hint="A rough range helps us suggest the right scope.">
              <input id="budget" name="budget" aria-describedby="budget-hint" />
            </Field>
            <Field id="timeline" label="Preferred timeline (optional)">
              <input id="timeline" name="timeline" />
            </Field>
          </div>
          <Field id="message" label="Project description (required)" error={errors.message}>
            <textarea id="message" name="message" rows={6} aria-invalid={!!errors.message} aria-describedby={describedBy("message", errors.message)} required />
          </Field>
          <label className="check">
            <input type="checkbox" name="consent" aria-invalid={!!errors.consent} aria-describedby={describedBy("consent", errors.consent)} required />
            <span>I agree that True.in may contact me about this enquiry. I can ask for my details to be removed at any time.</span>
          </label>
          {errors.consent && <p className="field__error" id="consent-error" role="alert">{errors.consent}</p>}
          <div className="form__actions">
            <button type="submit" className="button button--solid" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
          </div>
          <StatusMessage status={status} sentText="Thank you. Your enquiry has been received." />
        </form>
      </section>
    </>
  );
}
