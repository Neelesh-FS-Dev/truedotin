import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Capabilities from './pages/Capabilities';
import Creators from './pages/Creators';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Routes are bundled eagerly on purpose. Lazy route chunks showed a fallback on first paint, and the
// swap to the real page caused a 0.92 CLS on home and work in Lighthouse. Page code adds about 10 KB gzip.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="capabilities" element={<Capabilities />} />
        <Route path="creators" element={<Creators />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
