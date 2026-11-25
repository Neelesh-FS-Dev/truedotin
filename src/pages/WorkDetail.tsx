import { Link, useParams } from "react-router";
import { Photo } from "../components/Photo";
import { ClipVideo } from "../components/ClipVideo";
import { collectionBySlug, publishedCollections } from "../content/work";
import { useDocumentMeta } from "../lib/meta";
import NotFound from "./NotFound";

export default function WorkDetail() {
  const { slug = "" } = useParams();
  const c = collectionBySlug(slug);
  useDocumentMeta(c ? `${c.title} — True.in` : "Not found — True.in", c?.summary ?? "This collection could not be found.");
  if (!c) return <NotFound />;

  const related = publishedCollections.filter((x) => x.slug !== c.slug).slice(0, 3);
  const cover = c.cover.kind === "photo" ? c.cover.photo : null;

  return (
    <>
      <section className="case-hero">
        {cover ? (
          <Photo photo={cover} sizes="100vw" priority className="case-hero__media" />
        ) : c.cover.kind === "video" ? (
          <ClipVideo src={c.cover.clip.src} poster={c.cover.clip.poster} label={c.cover.clip.alt} autoPlay className="case-hero__media" />
        ) : null}
        <div className="case-hero__copy">
          <p className="eyebrow">{c.category} · {c.period}</p>
          <h1 className="display display--md">{c.title}</h1>
        </div>
      </section>
      <section className="prose-wide">
        <p className="body-lg">{c.summary}</p>
        {c.rightsPending && (
          <p className="notice" role="note">
            <strong>Rights pending.</strong> This collection shows people, brands and posters that need written permission before publication. Preview only.
          </p>
        )}
        <p className="caption">Source: @truedotin Instagram content. Creators and guests shown are not represented by True.in unless stated.</p>
      </section>
      {c.photos.length > 0 && (
        <section className="case-grid" aria-label="Photographs">
          {c.photos.map((p) => (
            <figure key={p.id} className={`case-grid__cell${p.kind === "poster" ? " case-grid__cell--poster" : ""}`}>
              <Photo photo={p} sizes="(max-width: 768px) 92vw, 45vw" />
            </figure>
          ))}
        </section>
      )}
      {c.clips.length > 0 && (
        <section className="case-reels" aria-label="Films">
          {c.clips.map((v) => (
            <figure key={v.id} className="case-reels__cell">
              <ClipVideo src={v.src} poster={v.poster} label={v.alt} controls className="case-reels__video" />
            </figure>
          ))}
        </section>
      )}
      <section className="related" aria-labelledby="related-title">
        <h2 id="related-title" className="h2">More from the feed</h2>
        <ul className="related__list">
          {related.map((r) => (
            <li key={r.slug}><Link to={`/work/${r.slug}`} className="text-link">{r.title}</Link></li>
          ))}
        </ul>
        <p className="section-foot"><Link className="button button--solid" to="/contact">Start a project</Link></p>
      </section>
    </>
  );
}
