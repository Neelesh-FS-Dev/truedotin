import { useState } from 'react';
import { CAPABILITIES } from '../content/capabilities';
import { Link } from 'react-router';
import { Photo } from './Media';
import { canHover } from '../lib/motion';

export function ServiceIndex() {
  const [selected, setSelected] = useState(0);
  const current = CAPABILITIES[selected] ?? CAPABILITIES[0];
  if (!current) return null;

  return (
    <div className="svc">
      <ol className="svc__list">
        {CAPABILITIES.map((c, i) => {
          const isOpen = i === selected;
          return (
            <li key={c.id} className="svc__item" data-open={isOpen}>
              <button
                type="button"
                className="svc__row"
                aria-expanded={isOpen}
                aria-controls={`svc-${c.id}`}
                onClick={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse' && canHover()) setSelected(i);
                }}
              >
                <span className="mono svc__index">{c.index}</span>
                <span className="svc__title">{c.title}</span>
                <svg className="svc__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <div id={`svc-${c.id}`} className="svc__panel" hidden={!isOpen}>
                <p className="svc__summary">{c.summary}</p>
                <p className="svc__purpose">{c.purpose}</p>
                <p className="mono svc__need">Proposed customer need: {c.need}</p>
                <div className="svc__inline-media">
                  <Photo id={c.media} alt="" sizes="92vw" />
                </div>
                <Link className="text-link" to={`/contact?type=${c.enquiry}`}>
                  Enquire about {c.title.toLowerCase()}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
      <aside className="svc__preview" aria-hidden="true">
        <Photo key={current.media} id={current.media} alt="" sizes="(min-width: 1024px) 40vw, 92vw" />
        <p className="mono svc__preview-label">
          {current.index} / {current.title}
        </p>
      </aside>
    </div>
  );
}
