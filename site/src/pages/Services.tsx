import { Link } from "react-router";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { photo } from "../content/media";
import { services } from "../content/site";
import { useDocumentMeta } from "../lib/meta";

export default function Services() {
  useDocumentMeta("Services — True.in", "Influencer marketing, celebrity collaborations, brand events, launches and activations, and public relations.");
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Services</p>
        <h1 className="display">Five ways to tell a brand story through people.</h1>
      </section>
      {services.map((s, i) => (
        <section key={s.no} className={`service service--${i % 2 ? "reverse" : "normal"}`} aria-labelledby={`svc-title-${s.no}`}>
          <Reveal className="service__media">
            <Photo photo={photo(s.photo)} sizes="(max-width: 768px) 92vw, 50vw" />
          </Reveal>
          <div className="service__copy">
            <p className="service__no">{s.no}</p>
            <h2 id={`svc-title-${s.no}`} className="h2">{s.title}</h2>
            <p>{s.body}</p>
            <p className="service__links">
              <Link className="text-link" to={`/work/${s.related}`}>Related work</Link>
              <Link className="button button--ghost" to="/contact">Enquire about this service</Link>
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
