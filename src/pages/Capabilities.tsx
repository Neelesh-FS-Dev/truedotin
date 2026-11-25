import { useEffect } from 'react';
import { Link } from 'react-router';
import { Photo } from '../components/Media';
import { CAPABILITIES } from '../content/capabilities';
import { useDocumentMeta } from '../lib/meta';
import { prefersReducedMotion } from '../lib/motion';

const JOURNEY = [
  { step: 'Brief', text: 'You describe the brand, audience, timing and the moment you want to create.' },
  { step: 'Match', text: 'We propose creators, venues or formats that fit the brief. Nothing is confirmed until agreed in writing.' },
  { step: 'Plan', text: 'Scope, schedule and creative direction are agreed before anything is produced.' },
  { step: 'Deliver', text: 'Content and coverage are delivered in agreed formats, with a summary afterwards.' },
];

export default function Capabilities() {
  useDocumentMeta('Capabilities | True.in', 'Influencer marketing, celebrity collaborations, brand events, launches and public relations from True.in.');

  // Anchor links from the home index scroll to the right capability once the page has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }, []);

  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <p className="mono eyebrow">Capabilities</p>
          <h1 className="display page__title">Made for the way culture moves.</h1>
          <p className="page__lede">Five service areas, described conservatively. Descriptions explain purpose and the kind of need each area addresses. They do not list confirmed processes or results.</p>
        </header>
      </div>

      {CAPABILITIES.map((c, i) => (
        <section key={c.id} id={c.id} className={`cap-block ${i % 2 === 1 ? 'cap-block--flip' : ''}`} aria-labelledby={`${c.id}-title`}>
          <div className="cap-block__media">
            <Photo id={c.media} alt={`Imagery for ${c.title}`} sizes="(min-width: 1024px) 46vw, 92vw" />
          </div>
          <div className="cap-block__text">
            <p className="mono eyebrow">{c.index} / Capability</p>
            <h2 id={`${c.id}-title`} className="display cap-block__title">{c.title}</h2>
            <p className="cap-block__summary">{c.summary}</p>
            <p><strong>Purpose.</strong> {c.purpose}</p>
            <p><strong>Proposed customer need.</strong> {c.need}</p>
            <Link to={`/contact?type=${c.enquiry}`} className="cta cta--ink">Enquire about {c.title.toLowerCase()}</Link>
          </div>
        </section>
      ))}

      <section className="section wrap" aria-labelledby="journey-title">
        <header className="section__head">
          <p className="mono eyebrow">Proposed engagement journey</p>
          <h2 id="journey-title" className="display section__title">A possible path from brief to delivery.</h2>
          <p className="section__lede">This is a proposal for discussion. It is not a confirmed agency process.</p>
        </header>
        <ol className="journey">
          {JOURNEY.map((j, i) => (
            <li key={j.step}>
              <span className="mono">0{i + 1}</span>
              <h3>{j.step}</h3>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
