import { Link } from "react-router";
import { Photo } from "../components/Photo";
import { ClipVideo } from "../components/ClipVideo";
import { Reveal } from "../components/Reveal";
import { nightlifeClips, photo, photosIn } from "../content/media";
import { useDocumentMeta } from "../lib/meta";

export default function Experiences() {
  useDocumentMeta("Experiences — True.in", "Brand events, creator dinners, launch nights and social evenings documented by True.in.");
  const evenings = photosIn(21, 30);
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Experiences</p>
        <h1 className="display">Beyond the screen. Into the experience.</h1>
        <p className="lede">Launch nights, creator dinners and social evenings. Each one is photographed and filmed in the room, then shared with care.</p>
      </section>
      <section className="experience-feature">
        <Reveal className="experience-feature__media">
          <Photo photo={photo("p21")} sizes="(max-width: 768px) 92vw, 55vw" />
        </Reveal>
        <Reveal className="experience-feature__copy">
          <h2 className="h2">Evenings with creators</h2>
          <p>Dinners and social nights at restaurants and bars, with the creators and guests who make them. The photographs are candid, not staged for a brochure.</p>
          <Link className="text-link" to="/work/evenings-out">See the evenings collection</Link>
        </Reveal>
      </section>
      <section className="experience-strip" aria-label="Evening photographs">
        {evenings.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.05} className={`experience-strip__cell experience-strip__cell--${i % 3}`}>
            <Photo photo={p} sizes="(max-width: 768px) 46vw, 30vw" />
          </Reveal>
        ))}
      </section>
      <section className="experience-films" aria-labelledby="films-title">
        <h2 id="films-title" className="h2">Nights in motion</h2>
        <div className="experience-films__grid">
          {nightlifeClips.map((v) => (
            <figure key={v.id}>
              <ClipVideo src={v.src} poster={v.poster} label={v.alt} controls className="experience-films__video" />
            </figure>
          ))}
        </div>
        <p className="section-foot"><Link className="text-link" to="/work/nightlife-reels">All nightlife and creator reels</Link></p>
      </section>
    </>
  );
}
