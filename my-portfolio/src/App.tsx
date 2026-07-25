import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import Scene from "./components/Scene";
import InterviewChat from "./components/InterviewChat";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailsPage from "./pages/projectDetails";
import NotFoundPage from "./pages/NotFound";

// Reset scroll to the top on every route change so a detail page never opens
// part-scrolled (which left the title hidden under the fixed navbar).
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
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
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          performance={{ min: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
          }}
        >
          <Scene hoveredName={hoveredName} theme={theme} />
        </Canvas>
      )}
      <Router>
        <ScrollToTop />
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
      </Router>
      <InterviewChat theme={theme} />
    </>
  );
}

export default App;
