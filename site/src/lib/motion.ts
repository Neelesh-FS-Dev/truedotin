export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Skip decorative intro and autoplay on data-saver or very slow connections.
export function isConstrainedNetwork(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return Boolean(conn?.saveData) || /2g|3g/.test(conn?.effectiveType ?? "");
}
