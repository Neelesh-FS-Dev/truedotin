import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { NAV, SITE } from '../content/site';
import { lockScroll, unlockScroll } from '../lib/scroll';

export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label={`${SITE.name} home`}>
      <span className="wordmark__mark" aria-hidden="true" />
      <span className="wordmark__text">True<span>.in</span></span>
    </Link>
  );
}

export function Masthead() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Compact state changes only paint properties, never the header height, so content does not shift.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu after navigation.
  useEffect(() => setOpen(false), [location.pathname]);

  // Escape closes; Tab is trapped inside the open dialog; focus returns to the toggle on close.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const panel = panelRef.current;
    const focusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusable()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="masthead" data-compact={compact} data-open={open}>
      <div className="wrap masthead__row">
        <Wordmark />
        <nav className="masthead__nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="masthead__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/contact" className="cta cta--lime masthead__cta">
          Let&apos;s talk
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="menu-toggle__bars" />
        </button>
      </div>
      <div id="mobile-nav" ref={panelRef} className="mobile-nav" role="dialog" aria-modal="true" aria-label="Site navigation" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="mobile-nav__link" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/contact" className="cta cta--lime mobile-nav__cta" onClick={() => setOpen(false)}>
          Let&apos;s talk
        </Link>
        <p className="mobile-nav__note mono">Escape closes the menu.</p>
      </div>
    </header>
  );
}
