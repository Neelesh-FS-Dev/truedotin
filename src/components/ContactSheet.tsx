import { Photo, Reel } from './Media';

// Hero composition: one primary reel, one supporting photograph and one small collage frame, with captions.
export function ContactSheet() {
  return (
    <div className="sheet" role="group" aria-label="Selected campaign frames">
      <figure className="sheet__primary">
        <Reel id="a106" label="Festive party reel, Pune venue, November 2026" sizes="(min-width: 1024px) 46vw, 92vw" autoplayInView />
        <figcaption className="mono">
          <span>01</span> Festive party reel · Events · Nov 2026
        </figcaption>
      </figure>
      <figure className="sheet__secondary">
        <Photo id="a046" alt="Guest in a red dress posing at an evening event" sizes="(min-width: 1024px) 22vw, 44vw" position="50% 30%" />
        <figcaption className="mono">
          <span>02</span> Guest portrait · Events · Jun 2026
        </figcaption>
      </figure>
      <figure className="sheet__tertiary">
        <Photo id="a064" alt="Collage of evening guest photographs with the words Proof that good times happened" sizes="(min-width: 1024px) 16vw, 30vw" />
        <figcaption className="mono">
          <span>03</span> Collage frame · Jun 2026
        </figcaption>
      </figure>
    </div>
  );
}
