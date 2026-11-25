import { Link } from 'react-router';
import { useDocumentMeta } from '../lib/meta';

export default function NotFound() {
  useDocumentMeta('Page not found | True.in', 'This page is not in the True.in archive.');
  return (
    <div className="wrap page page--center">
      <p className="mono eyebrow">404</p>
      <h1 className="display page__title">This page is not in the archive.</h1>
      <p className="page__lede">The link may be out of date. Try the work or the home page.</p>
      <div className="row">
        <Link to="/" className="cta cta--ink">Home</Link>
        <Link to="/work" className="cta cta--outline">Work</Link>
      </div>
    </div>
  );
}
