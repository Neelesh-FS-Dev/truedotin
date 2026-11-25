import { useSearchParams } from 'react-router';
import { EnquiryForm } from '../components/EnquiryForm';
import { SITE } from '../content/site';
import { useDocumentMeta } from '../lib/meta';

export default function Contact() {
  useDocumentMeta('Contact | True.in', 'Start a conversation with True.in about brand campaigns, creator collaborations, celebrity bookings, events, launches or PR.');
  const [params] = useSearchParams();
  const initial = params.get('type') ?? 'brand';

  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <p className="mono eyebrow">Contact</p>
          <h1 className="display page__title">Start a conversation.</h1>
          <p className="page__lede">Choose the enquiry type that fits best. Brand and creator enquiries are handled as separate journeys.</p>
        </header>
        <div className="two-col">
          <aside className="contact-aside" aria-label="Other ways to reach True.in">
            <h2 className="mono eyebrow">Other routes</h2>
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
                <p className="footer__small">A community invitation listed on the Instagram profile. It is not a business WhatsApp number.</p>
              </li>
              <li>{SITE.businessEmail ?? 'Business email: to be confirmed.'}</li>
            </ul>
          </aside>
          <EnquiryForm initialCategory={initial} />
        </div>
      </div>
    </div>
  );
}
