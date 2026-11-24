import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

// Smooth scroll is skipped entirely for reduced-motion users; native scrolling stays in place.
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion() || lenis) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    if (tick) gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
    tick = null;
  };
}

// Used by the full-screen menu and dialogs so the page underneath cannot scroll.
export function setScrollLocked(locked: boolean): void {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.classList.toggle("is-locked", locked);
}
