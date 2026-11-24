import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

type Props = {
  src: string;
  poster: string;
  label: string;
  // Autoplays muted only while on screen; reduced-motion users keep the poster.
  autoPlay?: boolean;
  // Native controls for the full showreel dialog.
  controls?: boolean;
  // Desktop hover preview: plays on pointer enter, pauses on leave. Touch users open the page instead.
  hoverPreview?: boolean;
  mobileSrc?: string;
  className?: string;
  // Called once the first frame is decoded, so a poster underneath can be hidden.
  onReady?: () => void;
};

export function ClipVideo({ src, poster, label, autoPlay = false, controls = false, hoverPreview = false, mobileSrc, className, onReady }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const motionOk = !prefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay || !motionOk) return;
    let io: IntersectionObserver | undefined;
    // Start observing only after the page has loaded, so video bytes never compete with the first paint.
    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.25 },
      );
      io.observe(video);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      io?.disconnect();
    };
  }, [autoPlay, motionOk]);

  const onEnter = () => {
    if (!hoverPreview || !motionOk) return;
    const video = ref.current;
    if (!video) return;
    if (video.preload === "none") video.preload = "auto";
    void video.play().catch(() => {});
  };
  const onLeave = () => {
    if (!hoverPreview) return;
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const narrow = mobileSrc !== undefined && window.matchMedia("(max-width: 768px)").matches;
  const sourceSrc = narrow && mobileSrc ? mobileSrc : src;
  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      preload="none"
      muted
      playsInline
      loop={!controls}
      controls={controls}
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onLoadedData={onReady}
    >
      <source src={sourceSrc} type="video/mp4" />
    </video>
  );
}
