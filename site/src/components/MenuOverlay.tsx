import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, NavLink } from "react-router";
import { navLinks, site } from "../content/site";
import { photo, type Photo } from "../content/media";
import { setScrollLocked } from "../lib/scroll";
import { Photo as PhotoImg } from "./Photo";

type Props = { open: boolean; onClose: () => void; returnFocus: RefObject<HTMLButtonElement | null> };

const previews: Record<string, Photo> = {
  "/work": photo("p11"),
  "/services": photo("p44"),
  "/experiences": photo("p22"),
  "/creators": photo("p07"),
  "/about": photo("p33"),
  "/contact": photo("p41"),
};

// Full-screen navigation: focus is trapped inside, Escape closes, scroll is locked, focus returns to the trigger.
export function MenuOverlay({ open, onClose, returnFocus }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Photo>(previews["/work"]);

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const focusable = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      returnFocus.current?.focus();
    };
  }, [open, onClose, returnFocus]);

  return (
    <div className={`menu ${open ? "is-open" : ""}`} ref={panel} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open}>
      <div className="menu__media" aria-hidden="true">
        <PhotoImg photo={preview} sizes="40vw" className="menu__photo" />
      </div>
      <nav className="menu__nav" aria-label="Main">
        <ul>
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} onClick={onClose} onMouseEnter={() => previews[l.to] && setPreview(previews[l.to])} onFocus={() => previews[l.to] && setPreview(previews[l.to])}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu__foot">
        <div className="menu__ctas">
          <Link to="/contact" onClick={onClose} className="button button--solid">Start a project</Link>
          <Link to="/collaborate" onClick={onClose} className="button button--ghost">Creator collaborations</Link>
        </div>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="menu__social">
          Instagram {site.instagramHandle}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
