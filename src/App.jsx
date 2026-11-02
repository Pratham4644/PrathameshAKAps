/**
 * The page is six stacked photographs. Each section owns one photo.
 * Lenis only smooths the scroll — there is no WebGL canvas anymore.
 */
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import ProgressRail from "./components/ProgressRail";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import SceneBackdrop from "./components/SceneBackdrop";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { SCENES } from "./data/content";

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState(1);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const lenis = new Lenis({ autoRaf: true });
    window.__lenis = lenis;
    return () => {
      if (window.__lenis === lenis) window.__lenis = undefined;
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const sections = SCENES.map((scene) => document.getElementById(scene.id)).filter(Boolean);
    const onScroll = () => {
      const focus = window.innerHeight * 0.4;
      const current = sections.find((section) => {
        const box = section.getBoundingClientRect();
        return box.top <= focus && box.bottom > focus;
      });
      if (current) {
        const scene = SCENES.find((item) => item.id === current.id);
        if (scene) setActiveScene(scene.n);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      {!prefersReducedMotion && <SceneBackdrop activeScene={activeScene} />}
      <a className="skip-to-content" href="#main-content">Skip to content</a>
      <Navbar activeScene={activeScene} />
      <ProgressRail activeScene={activeScene} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
