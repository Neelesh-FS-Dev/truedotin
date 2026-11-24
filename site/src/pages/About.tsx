import { Link } from "react-router";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { photo } from "../content/media";
import { site } from "../content/site";
import { useDocumentMeta } from "../lib/meta";

export default function About() {
  useDocumentMeta("About — True.in", "True.in tells brand stories through creators, hosts and real experiences. A creative manifesto, not a corporate profile.");
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">About</p>
        <h1 className="display">Good stories deserve real voices.</h1>
      </section>
      <section className="prose-wide">
        <Reveal>
          <p className="body-lg">{site.positioning} That idea sits behind everything True.in makes: a brand is only as believable as the people who talk about it.</p>
        </Reveal>
        <Reveal>
          <p>Our feed is where the work becomes visible. Creator sessions with collages and conversation. Dinners and launch nights in restaurants and cafés. Portraits that are composed carefully but feel unposed. Short vertical films shot in rooms people actually visit.</p>
        </Reveal>
      </section>
      <section className="about-grid">
        <Reveal><Photo photo={photo("p13")} sizes="(max-width: 768px) 92vw, 40vw" /></Reveal>
        <div className="about-grid__copy">
          <Reveal><h2 className="h2">What we believe</h2></Reveal>
          <Reveal><p>Creators are not a channel. They are the authors of what a brand becomes in front of an audience, so the brief starts with their voice, not a template.</p></Reveal>
          <Reveal><p>Experiences matter because people remember being in the room. We design for the table, the photograph and the evening, and then share it honestly.</p></Reveal>
          <Reveal><p>Authenticity is a discipline, not a style. We would rather show a real night out than a staged one, and we say clearly when something is a collaboration.</p></Reveal>
        </div>
      </section>
      <section className="prose-wide">
        <Reveal>
          <h2 className="h2">Where we work</h2>
          <p>The sourced content features restaurants, cafés, bars and social events, with a strong presence in Pune venues. Other locations will be listed once confirmed.</p>
        </Reveal>
        <Reveal>
          <p className="section-foot">
            <Link className="text-link" to="/work">See the work</Link> &nbsp;·&nbsp; <Link className="text-link" to="/services">Services</Link> &nbsp;·&nbsp; <Link className="text-link" to="/contact">Start a project</Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
