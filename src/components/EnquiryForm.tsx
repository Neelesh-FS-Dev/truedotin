import { useId, useRef, useState, type FormEvent } from 'react';
import { CATEGORY_LABELS, ENQUIRY_CATEGORIES, buildEnquiryText, isEnquiryCategory, validateEnquiry, type EnquiryErrors, type EnquiryInput } from '../lib/validation';
import { SITE } from '../content/site';

const EMPTY: EnquiryInput = { category: 'brand', name: '', organisation: '', email: '', instagram: '', message: '' };

export function EnquiryForm({ initialCategory = 'brand' }: { initialCategory?: string }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryInput>({ ...EMPTY, category: isEnquiryCategory(initialCategory) ? initialCategory : 'other' });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const isCreator = values.category === 'creator';

  const set = (key: keyof EnquiryInput) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const id = (name: string) => `${uid}-${name}`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setSummary(null);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // No submission endpoint exists. The form never reports a successful send.
    setSummary(buildEnquiryText(values));
  };

  const fieldError = (name: keyof EnquiryInput) =>
    errors[name] ? <p id={id(`${name}-err`)} className="field__error">{errors[name]}</p> : null;
  const describedBy = (name: keyof EnquiryInput) => (errors[name] ? id(`${name}-err`) : undefined);

  if (summary !== null) {
    return (
      <div className="notice" role="status">
        <h3>Not sent: this preview has no submission endpoint</h3>
        <p>
          Nothing has been transmitted or stored. Copy the summary below and send it by Instagram direct message to{' '}
          <a href={SITE.instagramUrl} rel="noopener noreferrer" target="_blank">
            @truedotin<span className="sr-only"> (opens in a new tab)</span>
          </a>
          , or wait until a business email or form is confirmed.
        </p>
        <label className="field">
          <span className="field__label">Enquiry summary</span>
          <textarea readOnly rows={8} value={summary} className="field__input" />
        </label>
        <div className="row">
          <button
            type="button"
            className="cta cta--ink"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            Copy summary
          </button>
          <button type="button" className="text-link" onClick={() => setSummary(null)}>
            Edit enquiry
          </button>
          <span className="mono" aria-live="polite">{copied ? 'Copied.' : ''}</span>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={id('intro')}>
      <p id={id('intro')} className="form__intro">
        Fields marked required must be completed. This preview has no submission endpoint, so the form checks your details and gives you a summary to send.
      </p>
      {Object.keys(errors).length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="error-summary" role="alert">
          <p>Please fix {Object.keys(errors).length} {Object.keys(errors).length === 1 ? 'field' : 'fields'}:</p>
          <ul>
            {Object.entries(errors).map(([k, v]) => (
              <li key={k}>
                <a href={`#${id(k)}`}>{v}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="form__grid">
        <label className="field field--wide" htmlFor={id('category')}>
          <span className="field__label">Enquiry category <span aria-hidden="true">*</span></span>
          <select id={id('category')} className="field__input" value={values.category} onChange={set('category')} aria-invalid={Boolean(errors.category)} aria-describedby={describedBy('category')} required>
            {ENQUIRY_CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
          {fieldError('category')}
        </label>
        <label className="field" htmlFor={id('name')}>
          <span className="field__label">Name <span aria-hidden="true">*</span></span>
          <input id={id('name')} className="field__input" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} required />
          {fieldError('name')}
        </label>
        <label className="field" htmlFor={id('email')}>
          <span className="field__label">Email <span aria-hidden="true">*</span></span>
          <input id={id('email')} type="email" className="field__input" autoComplete="email" value={values.email} onChange={set('email')} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} required />
          {fieldError('email')}
        </label>
        {!isCreator && (
          <label className="field" htmlFor={id('organisation')}>
            <span className="field__label">Business or organisation <span aria-hidden="true">*</span></span>
            <input id={id('organisation')} className="field__input" autoComplete="organization" value={values.organisation} onChange={set('organisation')} aria-invalid={Boolean(errors.organisation)} aria-describedby={describedBy('organisation')} required />
            {fieldError('organisation')}
          </label>
        )}
        <label className="field" htmlFor={id('instagram')}>
          <span className="field__label">{isCreator ? 'Instagram profile link' : 'Instagram profile (optional)'}{isCreator && <span aria-hidden="true"> *</span>}</span>
          <input id={id('instagram')} type="url" inputMode="url" className="field__input" placeholder="https://www.instagram.com/yourname/" value={values.instagram} onChange={set('instagram')} aria-invalid={Boolean(errors.instagram)} aria-describedby={describedBy('instagram')} required={isCreator} />
          {fieldError('instagram')}
        </label>
        <label className="field field--wide" htmlFor={id('message')}>
          <span className="field__label">Message <span aria-hidden="true">*</span></span>
          <textarea id={id('message')} rows={6} className="field__input" value={values.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} required />
          {fieldError('message')}
        </label>
      </div>
      <div className="row">
        <button type="submit" className="cta cta--ink">Check and prepare enquiry</button>
        <p className="mono form__privacy">Nothing is stored or sent from this page.</p>
      </div>
    </form>
  );
}
