import { Link } from "react-router";
import { navLinks, site } from "../content/site";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark" aria-hidden="true">True.in</p>
      <div className="footer__grid">
        <nav aria-label="Footer">
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
            <li><Link to="/collaborate">Creator collaborations</Link></li>
          </ul>
        </nav>
        <div>
          <p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram {site.instagramHandle}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="footer__note">
            Business contact: <span>to be confirmed by True.in</span>
          </p>
        </div>
        <p className="footer__note footer__disclaimer">
          An independent creative concept. Not an official True.in website, and no commercial relationship with True.in is implied. People shown in the imagery are not represented by True.in.
        </p>
      </div>
    </footer>
  );
}
