import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Slow-network fallback: videos stay on their poster when the browser asks for data saving or a 2G/3G link.
export function isConstrainedNetwork(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return Boolean(conn?.saveData) || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '3g';
}

export function canHover(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
