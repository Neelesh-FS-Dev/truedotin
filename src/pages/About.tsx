import { Link } from 'react-router';
import { Photo } from '../components/Media';
import { CAPABILITIES } from '../content/capabilities';
import { SITE } from '../content/site';
import { useDocumentMeta } from '../lib/meta';

export default function About() {
  useDocumentMeta('About | True.in', 'True.in tells the story of brands through creators, across influencer marketing, celebrity collaborations, brand events, launches and PR.');
  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <p className="mono eyebrow">About</p>
          <h1 className="display page__title">{SITE.tagline}</h1>
        </header>
        <div className="about">
          <div className="about__text">
            <p className="about__lead">Brands are told through people. A product becomes a story when someone the audience trusts brings it into a room, a feed or a conversation.</p>
            <p>True.in works in that space: connecting brands with creators, public figures and audiences, and building the events and moments that give those stories somewhere to happen.</p>
            <p>The archive on this site is drawn from creator sessions, restaurant and café visits, evening events and lifestyle shoots, many of them in Pune. It is shown here to demonstrate the kind of material the work produces.</p>
          </div>
          <Photo id="a056" alt="Guests posing together at an evening event" sizes="(min-width: 1024px) 34vw, 90vw" />
        </div>
      </div>

      <section className="section wrap" aria-labelledby="areas-title">
        <header className="section__head">
          <p className="mono eyebrow">Service areas</p>
          <h2 id="areas-title" className="display section__title">Five areas, one storytelling approach.</h2>
        </header>
        <ul className="areas">
          {CAPABILITIES.map((c) => (
            <li key={c.id}>
              <span className="mono">{c.index}</span>
              <Link to={`/capabilities#${c.id}`}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="people-title">
        <p className="mono eyebrow">A note on people</p>
        <h2 id="people-title" className="display section__title section__title--sm">People in the photographs are not staff or represented talent.</h2>
        <p className="section__lede">Imagery shows guests and creators at sessions and events covered in the archive. Nobody pictured is described here as an employee, founder or exclusive creator, and no team biography or company history is claimed.</p>
      </section>
    </div>
  );
}
