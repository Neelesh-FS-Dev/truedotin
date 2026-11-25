import { useEffect, useRef, useSyncExternalStore } from 'react';
import { MEDIA, type MediaId } from '../content/media.generated';
import { getActivePreview, setActivePreview, subscribePreview } from '../lib/preview';
import { canHover, isConstrainedNetwork, prefersReducedMotion } from '../lib/motion';

interface PhotoProps {
  id: MediaId;
  alt: string;
  sizes: string;
  position?: string;
  eager?: boolean;
  className?: string;
}

// AVIF with JPEG fallback. Width and height set the intrinsic ratio, so no layout shift occurs.
export function Photo({ id, alt, sizes, position, eager = false, className }: PhotoProps) {
  const m = MEDIA[id];
  const base = `/media/photos/${id}`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1280.avif 1280w`} sizes={sizes} />
      <img
        src={`${base}-1280.jpg`}
        srcSet={`${base}-640.jpg 640w, ${base}-1280.jpg 1280w`}
        sizes={sizes}
        width={m.w}
        height={m.h}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        style={{ objectPosition: position }}
      />
    </picture>
  );
}

interface ReelProps {
  id: MediaId;
  label: string;
  sizes?: string; // layout hint for callers; the video element itself takes no sizes attribute
  autoplayInView?: boolean;
  className?: string;
  showToggle?: boolean;
}

// Muted 15-second preview. Only one reel is active site-wide. The file is requested on first activation.
export function Reel({ id, label, autoplayInView = false, className, showToggle = false }: ReelProps) {
  const m = MEDIA[id];
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const requested = useRef(false);
  const active = useSyncExternalStore(
    subscribePreview,
    () => getActivePreview() === id,
    () => false,
  );

  const src = `/media/video/${id}.mp4`;
  const poster = `/media/video/${id}-poster.jpg`;

  // Activate or pause playback whenever the active reel changes.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    if (active) {
      if (!requested.current) {
        requested.current = true;
        v.src = src;
      }
      v.play().catch(() => {
        /* autoplay refused: the poster and play control remain usable */
      });
    } else {
      v.pause();
    }
  }, [active, src]);

  // Pause when off-screen, and autoplay in-view for hero-style loops when allowed.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (autoplayInView && !prefersReducedMotion() && !isConstrainedNetwork()) setActivePreview(id);
        } else if (getActivePreview() === id) {
          setActivePreview(null);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, autoplayInView]);

  useEffect(() => () => {
    window.clearTimeout(hoverTimer.current);
    if (getActivePreview() === id) setActivePreview(null);
  }, [id]);

  const onEnter = () => {
    if (!canHover() || prefersReducedMotion() || isConstrainedNetwork()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActivePreview(id), 280);
  };
  const onLeave = () => {
    window.clearTimeout(hoverTimer.current);
    if (getActivePreview() === id) setActivePreview(null);
  };

  return (
    <div
      ref={frameRef}
      className={`reel ${className ?? ''}`}
      data-active={active}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ aspectRatio: `${m.w} / ${m.h}` }}
    >
      <video
        ref={videoRef}
        poster={poster}
        muted
        playsInline
        loop
        preload="none"
        aria-label={`Preview: ${label}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {showToggle && (
        <button
          type="button"
          className="reel__toggle"
          aria-pressed={active}
          aria-label={`${active ? 'Pause' : 'Play'} muted preview: ${label}`}
          onClick={() => setActivePreview(active ? null : id)}
        >
          {active ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
}
