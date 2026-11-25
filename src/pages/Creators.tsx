import { Link, useSearchParams } from 'react-router';
import { EnquiryForm } from '../components/EnquiryForm';
import { Photo } from '../components/Media';
import { useDocumentMeta } from '../lib/meta';

const PATH = [
  { step: 'Share your profile', text: 'Send your Instagram profile link and a short note about the content you make.' },
  { step: 'Review', text: 'We look at fit with current briefs. Review does not guarantee that any opportunity exists.' },
  { step: 'Conversation', text: 'If there is a fit, we talk through the brief, format and expectations before anything is agreed.' },
  { step: 'Possible collaboration', text: 'Any collaboration is agreed in writing, with terms set for that brief.' },
];

export default function Creators() {
  useDocumentMeta('Creators | True.in', 'Creator collaborations with True.in: how to share your profile and what to expect. No guaranteed collaborations or rates.');
  const [params] = useSearchParams();
  const initial = params.get('type') ?? 'creator';

  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <p className="mono eyebrow">Creators</p>
          <h1 className="display page__title">Good stories need the right people.</h1>
          <p className="page__lede">True.in works with creators on brand stories, events and public moments. This page describes a proposed pathway. It does not promise representation, collaborations, payment rates or brand opportunities.</p>
        </header>
        <div className="creators-grid">
          <Photo id="a009" alt="Creators gathered around a mood board session" sizes="(min-width: 1024px) 34vw, 92vw" />
          <Photo id="a037" alt="Creator in a restaurant with a styled table" sizes="(min-width: 1024px) 24vw, 60vw" position="50% 40%" />
        </div>
      </div>

      <section className="section wrap" aria-labelledby="path-title">
        <header className="section__head">
          <p className="mono eyebrow">Proposed pathway</p>
          <h2 id="path-title" className="display section__title">How a conversation could start.</h2>
        </header>
        <ol className="journey">
          {PATH.map((p, i) => (
            <li key={p.step}>
              <span className="mono">0{i + 1}</span>
              <h3>{p.step}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="mono creators__note">Not promised: exclusive representation · guaranteed collaborations · payment rates · brand opportunities.</p>
      </section>

      <section className="section wrap" aria-labelledby="form-title">
        <div className="two-col">
          <div>
            <p className="mono eyebrow">Creator enquiry</p>
            <h2 id="form-title" className="display section__title">Share your profile.</h2>
            <p>We ask only for what is needed to respond: a name, an email, your Instagram link and a short message. <Link to="/contact" className="text-link">Other enquiry types</Link></p>
          </div>
          <EnquiryForm initialCategory={initial} />
        </div>
      </section>
    </div>
  );
}
