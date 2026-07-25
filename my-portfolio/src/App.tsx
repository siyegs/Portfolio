import {
  useState,
  useEffect,
  useLayoutEffect,
  lazy,
  Suspense,
  type ReactNode,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import InterviewChat from "./components/InterviewChat";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailsPage from "./pages/projectDetails";
import NotFoundPage from "./pages/NotFound";

const BackgroundScene = lazy(() => import("./components/BackgroundScene"));

/**
 * Reset scroll to the top on every route change, before the browser paints.
 *
 * useEffect runs after paint, so the new page was showing for one frame at the
 * old scroll offset and then snapped: the jolt that made navigation feel like
 * it arrived forcefully. useLayoutEffect puts the reset ahead of that paint,
 * so the page is simply already at the top.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Eases each route in on arrival.
 *
 * Keying on the pathname remounts the wrapper per navigation, which the route
 * change does anyway. There is deliberately no exit animation: waiting for one
 * would hold the old page on screen and make every link feel slower, and the
 * arrival ease alone is what removes the hard cut.
 *
 * The short delay exists for the menu path: the index overlay leaves as a
 * 0.55s curtain lift, and without the delay the page's entrance was half
 * spent before the curtain uncovered it, which read as hurried. Delaying the
 * start and running longer keeps the page still settling as it is revealed;
 * on bare navigations (no overlay) the delay is small enough to read as
 * intent rather than lag.
 */
function RouteTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  /* The blob field is atmosphere, not content. It costs a continuous GPU loop
     behind every page, which is the first thing to make the cursor, the
     marquees and the hover plate stutter, so it is only rendered where there
     is headroom for it: wide viewports, motion allowed. Everything below that
     falls back to the flat canvas, the grain and the vignette. */
  const wideViewport = useMediaQuery({ minWidth: 1024 });
  const reducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });
  const showScene = wideViewport && !reducedMotion;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      {showScene && (
        <Suspense fallback={null}>
          <BackgroundScene theme={theme} hoveredName={hoveredName} />
        </Suspense>
      )}
      <Router>
        <ScrollToTop />
        <RouteTransition>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  setHoveredName={setHoveredName}
                  hoveredName={hoveredName}
                />
              }
            />
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  hoveredName={hoveredName}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  hoveredName={hoveredName}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  hoveredName={hoveredName}
                />
              }
            />
            <Route
              path="/projects/:slugTextId"
              element={
                <ProjectDetailsPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  hoveredName={hoveredName}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFoundPage
                  theme={theme}
                  toggleTheme={toggleTheme}
                  hoveredName={hoveredName}
                />
              }
            />
          </Routes>
        </RouteTransition>
      </Router>
      <InterviewChat theme={theme} />
    </>
  );
}

export default App;
