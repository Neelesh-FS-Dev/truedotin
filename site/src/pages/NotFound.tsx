import { Link } from "react-router";
import { useDocumentMeta } from "../lib/meta";

export default function NotFound() {
  useDocumentMeta("Page not found — True.in", "The page you were looking for could not be found.");
  return (
    <section className="page-intro">
      <p className="eyebrow">404</p>
      <h1 className="display display--md">This page is not here.</h1>
      <p className="lede"><Link className="text-link" to="/">Back to the homepage</Link></p>
    </section>
  );
}
