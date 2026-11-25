import { useEffect, useMemo } from 'react';
import { Link, useNavigationType, useSearchParams } from 'react-router';
import { CampaignFigure } from '../components/CampaignFigure';
import { CAMPAIGNS } from '../content/campaigns';
import { MEDIA } from '../content/media.generated';
import { FILTERS, filterCampaigns, isFilter, type Filter } from '../lib/filters';
import { useDocumentMeta } from '../lib/meta';

const SCROLL_KEY = 'work-scroll-y';
// Column spans cycle through a fixed rhythm so the archive stays asymmetric on desktop.
const SPANS = [7, 5, 4, 4, 4, 8, 5, 7, 6, 6, 12, 4];

export default function Work() {
  useDocumentMeta('Work: campaign archive | True.in', 'The True.in campaign archive: creator sessions, hospitality, events, lifestyle and destination media.');
  const [params, setParams] = useSearchParams();
  const navigationType = useNavigationType();
  const raw = params.get('filter');
  const filter: Filter = isFilter(raw) ? raw : 'All';
  const reelsOnly = params.get('format') === 'reels';

  const list = useMemo(() => filterCampaigns(CAMPAIGNS, filter, reelsOnly), [filter, reelsOnly]);
  // Only show filters that have content under the current format setting.
  const available = FILTERS.filter((f) => f === 'All' || filterCampaigns(CAMPAIGNS, f, reelsOnly).length > 0);

  const update = (mutate: (p: URLSearchParams) => void) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        mutate(next);
        return next;
      },
      { preventScrollReset: true },
    );

  // Remember the latest scroll position, and restore it only on back/forward (POP) navigation.
  useEffect(() => {
    const remember = () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    window.addEventListener('scroll', remember, { passive: true });
    if (navigationType === 'POP') {
      const saved = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
      if (saved > 0) window.scrollTo(0, saved);
    }
    return () => window.removeEventListener('scroll', remember);
  }, []); // runs once per visit: the position is restored on mount

  return (
    <div className="wrap page">
      <header className="page__head">
        <p className="mono eyebrow">Campaign archive · {CAMPAIGNS.length} entries</p>
        <h1 className="display page__title">The work, archived.</h1>
        <p className="page__lede">Creator sessions, hospitality, events and lifestyle media from the True.in archive. Titles describe visible content only. Third-party material is shown for proposal purposes and is subject to rights confirmation.</p>
      </header>

      <div className="filters" role="group" aria-label="Filter campaigns by category">
        {available.map((f) => (
          <button
            key={f}
            type="button"
            className="filter"
            aria-pressed={filter === f}
            onClick={() => update((p) => (f === 'All' ? p.delete('filter') : p.set('filter', f)))}
          >
            {f}
          </button>
        ))}
        <button
          type="button"
          className="filter filter--format"
          aria-pressed={reelsOnly}
          onClick={() => update((p) => (reelsOnly ? p.delete('format') : p.set('format', 'reels')))}
        >
          Reels only
        </button>
      </div>

      {list.length === 0 ? (
        <div className="empty" role="status">
          <p>Nothing matches this filter yet.</p>
          <button type="button" className="text-link" onClick={() => setParams(new URLSearchParams(), { preventScrollReset: true })}>
            Show all work
          </button>
        </div>
      ) : (
        <div className="archive">
          {list.map((c) => {
            const index = CAMPAIGNS.indexOf(c);
            const span = SPANS[index % SPANS.length] ?? 6;
            return (
              <CampaignFigure
                key={c.slug}
                campaign={c}
                variant={c.media.length > 1 && c.media.every((id) => MEDIA[id].kind === 'video') ? 'reels' : 'card'}
                className="archive__item"
                style={{ gridColumn: `span ${span}` }}
                eager={index === 0}
              />
            );
          })}
        </div>
      )}
      <p className="page__foot"><Link to="/contact" className="text-link">Discuss a project</Link></p>
    </div>
  );
}
