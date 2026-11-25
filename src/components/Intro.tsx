import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { isConstrainedNetwork, prefersReducedMotion } from "../lib/motion";
import { photo } from "../content/media";

const KEY = "truein-intro-seen";

// Plays once per browser session. Skipped for reduced motion and constrained networks.
export function Intro() {
  const [active, setActive] = useState(() => {
    if (sessionStorage.getItem(KEY)) return false;
    return !prefersReducedMotion() && !isConstrainedNetwork();
  });
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    sessionStorage.setItem(KEY, "1");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setActive(false),
      });
      tl.fromTo(".intro__frame", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" })
        .fromTo(".intro__word span", { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "power4.out" }, "-=0.2")
        .to(root.current, { autoAlpha: 0, duration: 0.5, ease: "power2.in", delay: 0.25 });
    }, root);
    return () => ctx.revert();
    // Runs once on mount.
  }, []);

  if (!active) return null;

  const frames = [photo("p11"), photo("p22"), photo("p42")];
  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro__frames">
        {frames.map((f) => (
          <img key={f.id} className="intro__frame" src={f.src} alt="" width={f.width} height={f.height} />
        ))}
      </div>
      <p className="intro__word">
        <span>True.in</span>
      </p>
    </div>
  );
}
