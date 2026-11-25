import { Link } from "react-router";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { photosIn } from "../content/media";
import { useDocumentMeta } from "../lib/meta";

export default function Creators() {
  useDocumentMeta("Creators — True.in", "Creator collaborations with True.in: what we look for, how we ask, and how your details are handled.");
  const photos = photosIn(6, 17);
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Creators</p>
        <h1 className="display">Culture starts with people.</h1>
        <p className="lede">We build brand stories with creators whose audiences already listen to them. Tell us who you are and what you make.</p>
      </section>
      <section className="creator-gallery" aria-label="Creator sessions">
        {photos.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.05} className={`creator-gallery__cell creator-gallery__cell--${i % 4}`}>
            <Photo photo={p} sizes="(max-width: 768px) 46vw, 30vw" />
          </Reveal>
        ))}
      </section>
      <section className="prose-wide">
        <Reveal>
          <h2 className="h2">What we look for</h2>
          <p>Creators who make specific, credible content: food, drink, nightlife, lifestyle, fashion and entertainment. Audience size is one signal among several; fit with the brand matters more.</p>
        </Reveal>
        <Reveal>
          <h2 className="h2">Your details</h2>
          <p>We ask only for what we need to review a collaboration: your name, a way to reply, your Instagram profile and what you make. Submissions are reviewed by the team and are not published. Sending a form does not mean you have been accepted into any network or agreement.</p>
          <p className="section-foot"><Link className="button button--solid" to="/collaborate">Join the conversation</Link></p>
        </Reveal>
      </section>
    </>
  );
}
