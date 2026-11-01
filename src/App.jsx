import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import { useReducedMotion } from "./hooks/useReducedMotion";

const CanvasExperience = lazy(() => import("./components/CanvasExperience"));

function CanvasLoader({ progress = 0 }) {
  return (
    <div className="canvas-loader" role="status" aria-live="polite">
      <span className="canvas-loader-label">INITIALIZING NEURAL SCENE</span>
      <span className="canvas-loader-progress">loading model... {progress}%</span>
      <span className="canvas-loader-track"><span style={{ width: `${progress}%` }} /></span>
    </div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [canvasProgress, setCanvasProgress] = useState(0);
  const [showCanvasLoader, setShowCanvasLoader] = useState(true);
  const loaderTimeout = useRef(0);

  const onCanvasReady = useCallback(() => {
    setCanvasProgress(100);
    loaderTimeout.current = window.setTimeout(() => setShowCanvasLoader(false), 350);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) setShowCanvasLoader(false);
  }, [prefersReducedMotion]);

  useEffect(() => () => window.clearTimeout(loaderTimeout.current), []);

  return (
    <>
      <CustomCursor />
      {prefersReducedMotion ? (
        <div className="neural-static-fallback" aria-hidden="true" />
      ) : (
        <>
          <Suspense fallback={<CanvasLoader />}>
            <CanvasExperience
              onReady={onCanvasReady}
              reducedMotion={prefersReducedMotion}
            />
          </Suspense>
          {showCanvasLoader && <CanvasLoader progress={canvasProgress} />}
        </>
      )}
      <div className="app-content">
        <a className="skip-to-content" href="#main-content">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
