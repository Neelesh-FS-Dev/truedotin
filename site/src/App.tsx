import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";

// Route-level code splitting: each page ships only when visited.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const Services = lazy(() => import("./pages/Services"));
const Creators = lazy(() => import("./pages/Creators"));
const Experiences = lazy(() => import("./pages/Experiences"));
const Contact = lazy(() => import("./pages/Contact"));
const Collaborate = lazy(() => import("./pages/Collaborate"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<WorkDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="creators" element={<Creators />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="contact" element={<Contact />} />
            <Route path="collaborate" element={<Collaborate />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
