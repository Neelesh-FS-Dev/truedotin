import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Photo } from "../components/Photo";
import { ClipVideo } from "../components/ClipVideo";
import { publishedCollections, type Collection } from "../content/work";
import { useDocumentMeta } from "../lib/meta";

const filters: Array<"All" | Collection["category"]> = ["All", "Creator sessions", "Hospitality", "Portraits", "Reels", "Events"];

export default function Work() {
  useDocumentMeta("Work — True.in", "Content collections from the @truedotin feed: creator sessions, evenings out, portraits and short vertical films.");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = useMemo(() => publishedCollections.filter((c) => filter === "All" || c.category === filter), [filter]);

  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Work</p>
        <h1 className="display">Stories from the feed</h1>
        <p className="lede">Collections grouped by what is in them. Brand and client case studies appear here once names, roles and permissions are confirmed.</p>
      </section>
      <div className="filters" role="group" aria-label="Filter by category">
        {filters.map((f) => (
          <button key={f} type="button" className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <ol className="collection-list" aria-live="polite">
        {items.map((c, i) => (
          <li key={c.slug} className={`collection collection--${i % 3}`}>
            <Link to={`/work/${c.slug}`} className="collection__link">
              <div className="collection__media">
                {c.cover.kind === "photo" ? (
                  <Photo photo={c.cover.photo} sizes="(max-width: 768px) 92vw, 60vw" />
                ) : (
                  <ClipVideo src={c.cover.clip.src} poster={c.cover.clip.poster} label={c.cover.clip.alt} hoverPreview className="collection__video" />
                )}
              </div>
              <div className="collection__text">
                <p className="caption">{c.category} · {c.period}{c.rightsPending ? " · Rights pending" : ""}</p>
                <h2 className="h2">{c.title}</h2>
                <p>{c.summary}</p>
                <span className="text-link">Open collection</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      {items.length === 0 && <p className="empty">No collections in this category yet.</p>}
    </>
  );
}
