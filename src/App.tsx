import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import SimpleLayout from "./components/SimpleLayout";
import ScrollToTop from "./components/ScrollToTop";
import { trackPageView } from "./lib/analytics";

const Home = lazy(() => import("./pages/SimpleHome"));
const About = lazy(() => import("./pages/SimpleAbout"));
const Services = lazy(() => import("./pages/SimpleServices"));
const Contacts = lazy(() => import("./pages/SimpleContacts"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/cs" replace />} />
          <Route path="/:lang" element={<SimpleLayout />}>
            <Route
              index
              element={
                <Suspense fallback={null}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Home />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={null}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <About />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={null}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Services />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path="contacts"
              element={
                <Suspense fallback={null}>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Contacts />
                  </motion.div>
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/cs" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
