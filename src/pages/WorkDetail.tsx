import { Link, useParams } from 'react-router';
import { CampaignFigure, archiveNumber } from '../components/CampaignFigure';
import { Photo, Reel } from '../components/Media';
import { CAMPAIGNS, CAMPAIGN_BY_SLUG } from '../content/campaigns';
import { MEDIA } from '../content/media.generated';
import { useDocumentMeta } from '../lib/meta';
import NotFound from './NotFound';

export default function WorkDetail() {
  const { slug = '' } = useParams();
  const campaign = CAMPAIGN_BY_SLUG.get(slug);
  useDocumentMeta(
    campaign ? `${campaign.title} | True.in` : 'Not found | True.in',
    campaign ? campaign.description : 'This page is not in the True.in archive.',
  );
  if (!campaign) return <NotFound />;

  const index = CAMPAIGNS.indexOf(campaign);
  const prev = CAMPAIGNS[(index - 1 + CAMPAIGNS.length) % CAMPAIGNS.length];
  const next = CAMPAIGNS[(index + 1) % CAMPAIGNS.length];
  const related = CAMPAIGNS.filter((c) => c.category === campaign.category && c.slug !== campaign.slug).slice(0, 3);
  const [hero, ...gallery] = campaign.media;
  if (!hero) return <NotFound />;

  return (
    <article className="wrap page detail">
      <nav aria-label="Breadcrumb" className="mono crumbs">
        <Link to="/work">Work</Link> / <span>{campaign.category}</span>
      </nav>
      <header className="page__head">
        <p className="mono eyebrow">{archiveNumber(campaign)} · {campaign.category} · {campaign.date}</p>
        <h1 className="display page__title">{campaign.title}</h1>
        <p className="page__lede">{campaign.description}</p>
      </header>

      <div className="detail__hero">
        {MEDIA[hero].kind === 'video' ? (
          <Reel id={hero} label={campaign.title} sizes="(min-width: 1024px) 80vw, 100vw" showToggle />
        ) : (
          <Photo id={hero} alt={campaign.title} sizes="(min-width: 1024px) 80vw, 100vw" eager />
        )}
      </div>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery-title" className="detail__gallery">
          <h2 id="gallery-title" className="mono eyebrow">Media gallery · {campaign.media.length} frames</h2>
          <ul className="detail__grid">
            {gallery.map((id, i) => (
              <li key={id}>
                {MEDIA[id].kind === 'video' ? (
                  <Reel id={id} label={`${campaign.title}, frame ${i + 2}`} sizes="(min-width: 1024px) 30vw, 46vw" showToggle />
                ) : (
                  <Photo id={id} alt={`${campaign.title}, frame ${i + 2}`} sizes="(min-width: 1024px) 30vw, 46vw" />
                )}
                <span className="mono">Frame {String(i + 2).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="detail__source mono">
        Media is third-party or rights-pending unless confirmed. Visible people are not described as staff or represented talent.
      </p>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section">
          <h2 id="related-title" className="display section__title">More {campaign.category.toLowerCase()}.</h2>
          <div className="archive">
            {related.map((c) => (
              <CampaignFigure key={c.slug} campaign={c} className="archive__item" style={{ gridColumn: 'span 4' }} />
            ))}
          </div>
        </section>
      )}

      <nav className="pager" aria-label="Campaign navigation">
        <Link to={`/work/${prev?.slug ?? ''}`} className="pager__link">
          <span className="mono">← Previous</span>
          <span>{prev?.title}</span>
        </Link>
        <Link to={`/work/${next?.slug ?? ''}`} className="pager__link pager__link--next">
          <span className="mono">Next →</span>
          <span>{next?.title}</span>
        </Link>
      </nav>
    </article>
  );
}
