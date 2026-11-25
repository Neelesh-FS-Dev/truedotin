import { Link } from 'react-router';
import { NAV, SITE } from '../content/site';
import { Wordmark } from './Masthead';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer__statement display">
          Let&apos;s make
          <br />
          something worth
          <br />
          talking about.
        </p>
        <div className="footer__cta">
          <Link to="/contact" className="cta cta--lime">
            Start a conversation
          </Link>
          <Link to="/contact?type=creator" className="cta cta--ghost">
            Collaborate as a creator
          </Link>
        </div>
        <div className="footer__grid">
          <div>
            <Wordmark />
            <p className="footer__small">{SITE.positioning}</p>
          </div>
          <nav aria-label="Footer">
            <p className="mono eyebrow">Explore</p>
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mono eyebrow">Enquiries</p>
            <ul>
              <li>
                <Link to="/contact?type=brand">Brand enquiry</Link>
              </li>
              <li>
                <Link to="/contact?type=creator">Creator collaboration</Link>
              </li>
            </ul>
            <p className="footer__small">
              {SITE.businessEmail ? <a href={`mailto:${SITE.businessEmail}`}>{SITE.businessEmail}</a> : 'Business email: to be confirmed.'}
            </p>
          </div>
          <div>
            <p className="mono eyebrow">Social</p>
            <ul>
              <li>
                <a href={SITE.instagramUrl} rel="noopener noreferrer" target="_blank">
                  Instagram @truedotin<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={SITE.whatsappCommunityUrl} rel="noopener noreferrer" target="_blank">
                  WhatsApp community invite<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <p className="footer__small">© 2026 True.in. Concept proposal, not an official True.in site.</p>
          <p className="footer__small">{SITE.conceptNotice}</p>
        </div>
      </div>
    </footer>
  );
}
