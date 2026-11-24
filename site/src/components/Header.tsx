import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo" aria-label="True.in home">True.in</Link>
        <div className="header__right">
          <Link to="/contact" className="header__cta">Let&rsquo;s talk</Link>
          <button ref={trigger} type="button" className="header__menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} returnFocus={trigger} />
    </>
  );
}
