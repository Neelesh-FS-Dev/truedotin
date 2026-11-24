import { Field, StatusMessage, describedBy, isEmail, isInstagramUrl, useEnquiry, type Errors } from "../components/forms";
import { useDocumentMeta } from "../lib/meta";

const categories = ["Food & drink", "Lifestyle", "Fashion", "Entertainment", "Travel", "Other"];
const audiences = ["Under 10k", "10k–50k", "50k–250k", "250k+", "Prefer not to say"];
const interests = ["Campaign content", "Events and experiences", "Brand launches", "Short vertical films", "Other"];

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!String(d.get("name") ?? "").trim()) e.name = "Please enter your full name.";
  const email = String(d.get("email") ?? "");
  if (!email.trim()) e.email = "Please enter your email address.";
  else if (!isEmail(email)) e.email = "Please enter a valid email address.";
  const ig = String(d.get("instagram") ?? "");
  if (!ig.trim()) e.instagram = "Please enter your Instagram profile link.";
  else if (!isInstagramUrl(ig)) e.instagram = "Please enter an Instagram link, for example instagram.com/yourname.";
  const other = String(d.get("other") ?? "");
  if (other.trim() && !isInstagramUrl(other) && !/^https?:\/\//.test(other.trim())) e.other = "Please enter a full link, including https://.";
  if (!String(d.get("category") ?? "")) e.category = "Please choose your content category.";
  if (d.getAll("interest").length === 0) e.interest = "Please choose at least one collaboration interest.";
  if (!d.get("consent")) e.consent = "Please confirm you agree to be contacted about collaborations.";
  return e;
}

export default function Collaborate() {
  useDocumentMeta("Creator collaborations — True.in", "Tell True.in about your content. Creator collaboration enquiries are reviewed by the team and are not published.");
  const { status, errors, submit } = useEnquiry((d) => ({
    kind: "creator",
    name: d.get("name"),
    email: d.get("email"),
    instagram: d.get("instagram"),
    other: d.get("other"),
    category: d.get("category"),
    city: d.get("city"),
    audience: d.get("audience"),
    interests: d.getAll("interest"),
    message: d.get("message"),
  }));

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Creator collaborations</p>
        <h1 className="display display--md">Let&rsquo;s create something together.</h1>
        <p className="lede">Share your profile and what you make. We read every enquiry. Sending this form does not place you in a network or agreement.</p>
      </section>
      <section className="form-wrap">
        <form className="form" noValidate onSubmit={(e) => submit(e, validate)}>
          <p className="caption">Fields marked required are needed to respond.</p>
          <div className="form__row">
            <Field id="name" label="Full name (required)" error={errors.name}>
              <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describedBy("name", errors.name)} required />
            </Field>
            <Field id="email" label="Email address (required)" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("email", errors.email)} required />
            </Field>
          </div>
          <div className="form__row">
            <Field id="instagram" label="Instagram profile link (required)" error={errors.instagram} hint="For example instagram.com/yourname">
              <input id="instagram" name="instagram" type="url" inputMode="url" aria-invalid={!!errors.instagram} aria-describedby={describedBy("instagram", errors.instagram, "instagram-hint")} required />
            </Field>
            <Field id="other" label="Other profile link (optional)" error={errors.other}>
              <input id="other" name="other" type="url" inputMode="url" aria-invalid={!!errors.other} aria-describedby={describedBy("other", errors.other)} />
            </Field>
          </div>
          <div className="form__row">
            <Field id="category" label="Content category (required)" error={errors.category}>
              <select id="category" name="category" defaultValue="" aria-invalid={!!errors.category} aria-describedby={describedBy("category", errors.category)} required>
                <option value="" disabled>Choose one</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field id="city" label="City (optional)">
              <input id="city" name="city" autoComplete="address-level2" />
            </Field>
          </div>
          <Field id="audience" label="Audience size (optional)">
            <select id="audience" name="audience" defaultValue="">
              <option value="">Prefer not to say</option>
              {audiences.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </Field>
          <fieldset className="fieldset" aria-describedby={errors.interest ? "interest-error" : undefined}>
            <legend>Collaboration interests (required, choose any)</legend>
            <div className="checks">
              {interests.map((i) => (
                <label key={i} className="check">
                  <input type="checkbox" name="interest" value={i} />
                  <span>{i}</span>
                </label>
              ))}
            </div>
            {errors.interest && <p className="field__error" id="interest-error" role="alert">{errors.interest}</p>}
          </fieldset>
          <Field id="message" label="Anything else (optional)">
            <textarea id="message" name="message" rows={5} />
          </Field>
          <label className="check">
            <input type="checkbox" name="consent" aria-invalid={!!errors.consent} aria-describedby={describedBy("consent", errors.consent)} required />
            <span>I agree that True.in may contact me about creator collaborations. I can ask for my details to be removed at any time.</span>
          </label>
          {errors.consent && <p className="field__error" id="consent-error" role="alert">{errors.consent}</p>}
          <p className="caption privacy">
            We do not publish submitted details. In this preview, submitting shows a demonstration message and sends nothing.
          </p>
          <div className="form__actions">
            <button type="submit" className="button button--solid" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send collaboration enquiry"}
            </button>
          </div>
          <StatusMessage status={status} sentText="Thank you. Your enquiry has been received and will be reviewed." />
        </form>
      </section>
    </>
  );
}
