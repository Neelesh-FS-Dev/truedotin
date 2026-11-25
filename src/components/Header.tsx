import { Link, NavLink } from "react-router";
import { navLinks } from "../content/site";

// Visible primary navigation on every viewport. Mobile wraps the links under the logo; no hidden menu.
export function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo" aria-label="True.in, home">True.in</Link>
      <nav className="site-nav" aria-label="Primary">
        <ul>
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className="site-nav__link">{l.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link to="/contact" className="button button--solid site-header__cta">Let&rsquo;s talk</Link>
    </header>
  );
}
