import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Masthead } from './Masthead';
import { Footer } from './Footer';
import { startSmoothScroll, scrollToTop } from '../lib/scroll';

export function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => startSmoothScroll(), []);

  // On route change: jump to top (unless a hash is present), then move focus to the page for keyboard users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!location.hash) scrollToTop();
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
