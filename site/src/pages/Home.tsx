import { useRef, useState } from "react";
import { Link } from "react-router";
import { Intro } from "../components/Intro";
import { Photo } from "../components/Photo";
import { ClipVideo } from "../components/ClipVideo";
import { Reveal } from "../components/Reveal";
import { heroReel, photo, photosIn } from "../content/media";
import { publishedCollections } from "../content/work";
import { services, site, workflow } from "../content/site";
import { useDocumentMeta } from "../lib/meta";
import { setScrollLocked } from "../lib/scroll";

export default function Home() {
  useDocumentMeta(
    "True.in — Real people. Real stories. Real influence.",
    "Influencer marketing, creator collaborations, brand events and public relations. Telling the story of brands through creators.",
  );
  const reel = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const featured = publishedCollections.slice(0, 4);
  const expPhotos = photosIn(21, 30);
  const creatorPhotos = [photo("p06"), photo("p09"), photo("p12"), photo("p15"), photo("p18"), photo("p20")];
  const journal = photosIn(31, 40);

  const openReel = () => {
    setScrollLocked(true);
    reel.current?.showModal();
  };
  const closeReel = () => reel.current?.close();

  return (
    <>
      <Intro />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Influencer marketing &amp; brand experiences</p>
          <h1 id="hero-title" className="display">
            Real people.<br />Real stories.<br />Real influence.
          </h1>
          <p className="lede">Connecting brands with creators, conversations and experiences that bring their stories to life.</p>
          <div className="cta-row">
            <Link className="button button--solid" to="/work">Explore our work</Link>
            <Link className="button button--ghost" to="/contact">Let&rsquo;s collaborate</Link>
          </div>
          <button type="button" className="link-button" onClick={openReel}>Play showreel</button>
        </div>
        <div className="hero__media">
          {/* The poster is a plain image so it is the LCP candidate; the video fades in over it once decoded. */}
          <img src={heroReel.poster} alt="" width={540} height={960} fetchPriority="high" className="hero__poster" />
          <ClipVideo
            src={heroReel.src}
            mobileSrc={heroReel.mobileSrc}
            poster={heroReel.poster}
            label="True.in showreel, muted vertical film"
            autoPlay
            className={`hero__video ${heroReady ? "is-ready" : ""}`}
            onReady={() => setHeroReady(true)}
          />
        </div>
        <dialog ref={reel} className="reel-dialog" aria-label="True.in showreel" onClose={() => setScrollLocked(false)}>
          <div className="reel-dialog__inner">
            <ClipVideo src={heroReel.src} poster={heroReel.poster} label="True.in showreel with playback controls" controls className="reel-dialog__video" />
            <button type="button" className="button button--ghost" onClick={closeReel}>Close showreel</button>
          </div>
        </dialog>
      </section>

      <section className="statement" aria-label="About True.in">
        <Reveal>
          <p className="statement__text">We connect brands with <em>the people who bring them to life.</em></p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="body-lg">{site.positioning} True.in works with creators, venues and hosts to tell brand stories in the places people already spend time: restaurants, cafés, nights out and social events.</p>
        </Reveal>
      </section>

      <section className="work-index" aria-labelledby="work-title">
        <header className="section-head">
          <p className="eyebrow">01 — Selected work</p>
          <h2 id="work-title" className="h2">Moments from the feed</h2>
        </header>
        <ol className="work-list">
          {featured.map((c, i) => (
            <li key={c.slug} className={`work-row work-row--${i % 2 === 0 ? "wide" : "narrow"}`}>
              <Link to={`/work/${c.slug}`} className="work-row__link">
                <div className="work-row__media">
                  {c.cover.kind === "photo" ? (
                    <Photo photo={c.cover.photo} sizes="(max-width: 768px) 92vw, 50vw" />
                  ) : (
                    <ClipVideo src={c.cover.clip.src} poster={c.cover.clip.poster} label={c.cover.clip.alt} hoverPreview className="work-row__video" />
                  )}
                </div>
                <div className="work-row__text">
                  <p className="caption">{c.category} · {c.period}</p>
                  <h3 className="h3">{c.title}</h3>
                  <p>{c.summary}</p>
                  <span className="text-link">View collection</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <p className="section-foot"><Link to="/work" className="text-link">All work</Link></p>
      </section>

      <section className="services" aria-labelledby="services-title">
        <header className="section-head">
          <p className="eyebrow">02 — Services</p>
          <h2 id="services-title" className="h2">Five ways into the story</h2>
        </header>
        <div className="services__layout">
          <ul className="services__list">
            {services.map((s, i) => (
              <li key={s.no}>
                <button
                  type="button"
                  className="services__item"
                  aria-expanded={active === i}
                  aria-controls={`svc-${s.no}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="services__no">{s.no}</span>
                  <span className="services__title">{s.title}</span>
                </button>
                <div id={`svc-${s.no}`} className="services__body" hidden={active !== i}>
                  <p>{s.body}</p>
                  <Link className="text-link" to={`/work/${s.related}`}>Related work</Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="services__preview" aria-hidden="true">
            <Photo photo={photo(services[active].photo)} sizes="40vw" />
          </div>
        </div>
      </section>

      <section className="creators" aria-labelledby="creators-title">
        <Reveal>
          <header className="section-head">
            <p className="eyebrow">03 — Creator network</p>
            <h2 id="creators-title" className="display display--md">Culture starts with people.</h2>
          </header>
        </Reveal>
        <div className="creators__grid">
          {creatorPhotos.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05} className={`creators__cell creators__cell--${i}`}>
              <Photo photo={p} sizes="(max-width: 768px) 46vw, 24vw" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="creators__note">
            We work with creators whose audiences already trust them. The people shown here are not represented by True.in, and nothing on this page implies an exclusive relationship.
          </p>
          <Link className="button button--solid" to="/collaborate">Join the conversation</Link>
        </Reveal>
      </section>

      <section className="experiences" aria-labelledby="exp-title">
        <div className="experiences__sticky">
          <p className="eyebrow">04 — Experiences</p>
          <h2 id="exp-title" className="display display--md">Beyond the screen. Into the experience.</h2>
          <p>Launch nights, creator dinners and social evenings, documented as they happen. Photography and short films, shot in the room.</p>
          <Link className="text-link" to="/experiences">See experiences</Link>
        </div>
        <div className="experiences__stream">
          {expPhotos.map((p, i) => (
            <Reveal key={p.id} className={`experiences__frame experiences__frame--${i % 3}`}>
              <Photo photo={p} sizes="(max-width: 768px) 92vw, 45vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="process" aria-labelledby="process-title">
        <header className="section-head">
          <p className="eyebrow">05 — How we work</p>
          <h2 id="process-title" className="h2">A creator-led workflow</h2>
          <p className="caption">Proposed process, pending confirmation from True.in.</p>
        </header>
        <ol className="process__list">
          {workflow.map((s) => (
            <li key={s.no}>
              <Reveal>
                <span className="process__no" aria-hidden="true">{s.no}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="manifesto" aria-label="Manifesto">
        <Reveal>
          <p className="manifesto__text">Stories travel further when the people telling them are real.</p>
        </Reveal>
      </section>

      <section className="journal" aria-labelledby="journal-title">
        <header className="section-head">
          <p className="eyebrow">06 — Journal</p>
          <h2 id="journal-title" className="h2">From the @truedotin feed</h2>
        </header>
        <div className="journal__grid">
          {journal.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.04} className={`journal__cell journal__cell--${i % 5}`}>
              <Photo photo={p} sizes="(max-width: 768px) 46vw, 22vw" />
            </Reveal>
          ))}
        </div>
        <p className="section-foot">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">
            Follow {site.instagramHandle} on Instagram
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
      </section>

      <section className="split" aria-label="Enquiries">
        <Reveal className="split__panel split__panel--brand">
          <p className="eyebrow">For brands</p>
          <h2 className="display display--md">Have a brand story to tell?</h2>
          <Link className="button button--light" to="/contact">Start a project</Link>
        </Reveal>
        <Reveal className="split__panel split__panel--creator" delay={0.1}>
          <Photo photo={photo("p43")} sizes="(max-width: 768px) 100vw, 50vw" className="split__photo" />
          <div className="split__copy">
            <p className="eyebrow">For creators</p>
            <h2 className="display display--md">Let&rsquo;s create something together.</h2>
            <Link className="button button--solid" to="/collaborate">Join the conversation</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
