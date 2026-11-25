import { useEffect } from 'react';
import { Link } from 'react-router';
import { CampaignFigure, type Variant } from '../components/CampaignFigure';
import { ContactSheet } from '../components/ContactSheet';
import { CreatorStrip } from '../components/CreatorStrip';
import { ServiceIndex } from '../components/ServiceIndex';
import { Reel } from '../components/Media';
import { CAMPAIGN_BY_SLUG } from '../content/campaigns';
import { CAPABILITIES } from '../content/capabilities';
import { useDocumentMeta } from '../lib/meta';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

// Campaign-led portfolio. Each slot has its own composition, so the archive does not read as a uniform grid.
const PORTFOLIO: Array<{ slug: string; variant: Variant; wide?: boolean }> = [
  { slug: 'premiere-night-pune', variant: 'pair' },
  { slug: 'moodboard-sessions', variant: 'contact' },
  { slug: 'venue-reels-october', variant: 'reels', wide: true },
  { slug: 'tasting-table-may', variant: 'wide' },
  { slug: 'kesariya-event', variant: 'poster' },
  { slug: 'creator-voice-november', variant: 'feature' },
];

export default function Home() {
  useDocumentMeta('True.in: Culture in motion', 'Influencer marketing, celebrity collaborations, brand events, launches and PR. A private creator-led agency concept.');

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero__line > span', { yPercent: 110, duration: 0.9, ease: 'power3.out', stagger: 0.09 });
      gsap.from('.hero__meta', { opacity: 0, y: 12, duration: 0.8, delay: 0.55, ease: 'power2.out' });
      gsap.from('.sheet > *', { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power3.inOut', stagger: 0.12, delay: 0.2 });
      gsap.to('.sheet__primary', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="mono eyebrow hero__meta">Influencer marketing · Celebrity · Brand events · PR</p>
          <h1 id="hero-title" className="display hero__title">
            <span className="hero__line"><span>Culture moves.</span></span>
            <span className="hero__line"><span>We make brands</span></span>
            <span className="hero__line"><span>part of it.</span></span>
          </h1>
          <p className="hero__lede hero__meta">
            Influencer marketing, celebrity collaborations, brand experiences and PR, connecting brands with the people who bring their stories to life.
          </p>
          <div className="row hero__meta">
            <Link to="/work" className="cta cta--ink">Explore our work</Link>
            <Link to="/contact" className="cta cta--outline">Start a conversation</Link>
          </div>
          <p className="hero__meta"><Link to="/work?format=reels" className="text-link">Watch the reels</Link></p>
        </div>
        <div className="hero__media">
          <ContactSheet />
        </div>
      </section>

      <section className="cap-strip-wrap" aria-labelledby="cap-strip-title">
        <div className="wrap">
          <h2 id="cap-strip-title" className="mono eyebrow">What we do</h2>
          <ol className="cap-strip">
            {CAPABILITIES.map((c) => (
              <li key={c.id}>
                <Link to={`/capabilities#${c.id}`}>
                  <span className="mono">{c.index}</span>
                  <span className="cap-strip__label">{c.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="work-title">
        <header className="section__head" data-reveal>
          <p className="mono eyebrow"><span className="index-chip">02</span> Selected campaigns</p>
          <h2 id="work-title" className="display section__title">Seen in culture.</h2>
          <p className="section__lede">A curated slice of creator, hospitality, event and lifestyle media. Titles describe what is visible. No outcomes or client relationships are implied.</p>
        </header>
        <div className="portfolio">
          {PORTFOLIO.map(({ slug, variant, wide }) => {
            const campaign = CAMPAIGN_BY_SLUG.get(slug);
            return campaign ? <CampaignFigure key={slug} campaign={campaign} variant={variant} className={wide ? 'entry--full' : ''} /> : null;
          })}
        </div>
        <p className="section__more"><Link to="/work" className="cta cta--ink">View all work</Link></p>
      </section>

      <section className="section section--ink" aria-labelledby="creator-title">
        <div className="wrap">
          <header className="section__head section__head--light" data-reveal>
            <p className="mono eyebrow"><span className="index-chip">03</span> Creator culture</p>
            <h2 id="creator-title" className="display section__title">Good stories need the right people.</h2>
            <p className="section__lede">Group photographs, candid moments and creator-led sessions from the archive. The people shown are not presented as represented talent.</p>
          </header>
          <CreatorStrip />
          <p className="section__more"><Link to="/contact?type=creator" className="cta cta--lime">Collaborate with us</Link></p>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="services-title">
        <header className="section__head" data-reveal>
          <p className="mono eyebrow"><span className="index-chip">04</span> Capabilities</p>
          <h2 id="services-title" className="display section__title">Made for the way culture moves.</h2>
        </header>
        <ServiceIndex />
      </section>

      <section className="experience" aria-labelledby="experience-title">
        <div className="experience__media">
          <Reel id="a104" label="Audience footage, Pune, October 2026" sizes="100vw" autoplayInView className="experience__reel" />
          <div className="experience__overlay wrap">
            <p className="mono eyebrow">05 · Live experiences</p>
            <h2 id="experience-title" className="display experience__title">Beyond the feed.</h2>
            <p className="experience__caption mono">Event coverage, Pune · October 2026 · crowd footage, muted</p>
          </div>
        </div>
      </section>

      <section className="split" aria-label="Two ways to work with True.in">
        <article className="split__brand" data-reveal>
          <p className="mono eyebrow">For brands</p>
          <h2 className="display split__title">Looking to tell your brand&apos;s story?</h2>
          <p>Brand campaigns built around creators, hospitality, events and public moments.</p>
          <Link to="/contact?type=brand" className="cta cta--lime">Start a brand conversation</Link>
        </article>
        <article className="split__creator" data-reveal>
          <p className="mono eyebrow">For creators</p>
          <h2 className="display split__title split__title--alt">Let&apos;s create something together.</h2>
          <p>Share your profile and the kind of collaborations you are open to. No collaboration or rate is guaranteed.</p>
          <Link to="/contact?type=creator" className="cta cta--ink">Collaborate as a creator</Link>
        </article>
      </section>
    </>
  );
}
