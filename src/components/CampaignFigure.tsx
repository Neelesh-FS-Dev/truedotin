import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router';
import type { Campaign } from '../content/campaigns';
import { CAMPAIGNS } from '../content/campaigns';
import { MEDIA, type MediaId } from '../content/media.generated';
import { Photo, Reel } from './Media';

export type Variant = 'card' | 'feature' | 'contact' | 'reels' | 'wide' | 'pair' | 'poster';

export function archiveNumber(c: Campaign): string {
  return `No. ${String(CAMPAIGNS.indexOf(c) + 1).padStart(2, '0')}`;
}

function Lead({ id, label, sizes, eager }: { id: MediaId; label: string; sizes: string; eager?: boolean }) {
  return MEDIA[id].kind === 'video' ? (
    <Reel id={id} label={label} sizes={sizes} showToggle />
  ) : (
    <Photo id={id} alt={`${label}`} sizes={sizes} eager={eager} />
  );
}

// One archive entry. The variant sets the composition; the title link is always present for keyboard users.
export function CampaignFigure({ campaign, variant = 'card', className, style, eager = false }: { campaign: Campaign; variant?: Variant; className?: string; style?: CSSProperties; eager?: boolean }) {
  const [lead, ...rest] = campaign.media;
  if (!lead) return null;
  const label = campaign.title;
  const photos = campaign.media.filter((id) => MEDIA[id].kind === 'photo');
  const reels = campaign.media.filter((id) => MEDIA[id].kind === 'video');

  let media: ReactNode;
  switch (variant) {
    case 'contact':
      media = (
        <div className="entry__sheet">
          {(photos.length ? photos : campaign.media).slice(0, 8).map((id, i) => (
            <figure key={id} className={`entry__frame entry__frame--${i % 4}`}>
              {MEDIA[id].kind === 'photo' ? <Photo id={id} alt={`${label}, frame ${i + 1}`} sizes="(min-width: 1024px) 14vw, 30vw" /> : <Reel id={id} label={`${label}, frame ${i + 1}`} sizes="20vw" />}
              <span className="mono entry__frame-no">{String(i + 1).padStart(2, '0')}</span>
            </figure>
          ))}
        </div>
      );
      break;
    case 'reels':
      media = (
        <div className="entry__reels">
          {(reels.length ? reels : campaign.media).slice(0, 3).map((id, i) => (
            <Reel key={id} id={id} label={`${label}, reel ${i + 1}`} sizes="(min-width: 1024px) 18vw, 44vw" showToggle />
          ))}
        </div>
      );
      break;
    case 'pair':
      media = (
        <div className="entry__pair">
          <Photo id={campaign.media[0] ?? lead} alt={`${label}, frame 1`} sizes="(min-width: 1024px) 26vw, 60vw" />
          {campaign.media[1] && <Photo id={campaign.media[1]} alt={`${label}, frame 2`} sizes="(min-width: 1024px) 18vw, 40vw" />}
        </div>
      );
      break;
    case 'wide':
      media = <Photo id={lead} alt={label} sizes="(min-width: 1024px) 100vw, 100vw" position="50% 40%" className="entry__wide" />;
      break;
    case 'poster':
      media = (
        <div className="entry__poster">
          <Lead id={lead} label={`${label}, poster`} sizes="(min-width: 1024px) 34vw, 70vw" />
          {rest[0] && <Lead id={rest[0]} label={`${label}, promotional reel`} sizes="(min-width: 1024px) 20vw, 44vw" />}
        </div>
      );
      break;
    default:
      media = <Lead id={lead} label={label} sizes="(min-width: 1024px) 40vw, 92vw" eager={eager} />;
  }

  return (
    <article className={`entry entry--${variant} ${className ?? ''}`} style={style}>
      <div className="entry__media">{media}</div>
      <div className="entry__meta">
        <p className="mono entry__index">
          {archiveNumber(campaign)} · {campaign.category} · {campaign.date}
        </p>
        <h2 className="entry__title">
          <Link to={`/work/${campaign.slug}`}>{campaign.title}</Link>
        </h2>
        {variant !== 'contact' && variant !== 'reels' && <p className="entry__desc">{campaign.description}</p>}
      </div>
    </article>
  );
}
