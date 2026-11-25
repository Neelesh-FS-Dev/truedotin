import type { MediaId } from '../content/media.generated';
import { Photo } from './Media';

const FRAMES: MediaId[] = ['a013', 'a015', 'a021', 'a031', 'a048', 'a062', 'a066', 'a070'];

// Native horizontal scroll (no pinning, no scroll hijacking). The region is focusable for keyboard scrolling.
export function CreatorStrip() {
  return (
    <div className="strip" role="region" aria-label="Creator and guest photographs, scroll horizontally" tabIndex={0}>
      <ul className="strip__track">
        {FRAMES.map((id, i) => (
          <li key={id} className="strip__item">
            <Photo id={id} alt={`Creator and guest photograph, frame ${i + 1}`} sizes="(min-width: 1024px) 26vw, 70vw" />
            <span className="mono">Frame {String(i + 1).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
