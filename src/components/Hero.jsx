import { useEffect, useState } from "react";
import SceneSection from "./SceneSection";
import { SOCIAL_ICONS } from "./SocialIcons";
import {
  BIO,
  FULL_NAME,
  HERO_PROOF,
  LOCATION,
  RESUME_URL,
  ROTATING_LINES,
  SOCIAL_LINKS,
} from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [firstName, lastName] = FULL_NAME.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = window.setInterval(
      () => setLineIndex((index) => (index + 1) % ROTATING_LINES.length),
      3000
    );
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <SceneSection id="hero">
      <div className="hero-copy">
        <p className="mono-label">AI/ML ENGINEER — {LOCATION.toUpperCase()}</p>
        <h1>
          {firstName}
          <br />
          <em className="accent-cyan">{lastName}</em>
        </h1>
        <p className="rotating-line" aria-live="polite">
          {ROTATING_LINES[prefersReducedMotion ? 0 : lineIndex]}
        </p>
        <p>{BIO}</p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              const target = document.getElementById("projects");
              if (window.__lenis && target) {
                window.__lenis.scrollTo(target, { immediate: prefersReducedMotion });
              } else {
                target?.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                });
              }
            }}
          >
            View projects
          </a>
          <a className="btn btn-ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
        <div className="proof-row">
          {HERO_PROOF.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
        <div className="hero-socials">
          {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
            <a key={name} href={url} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label={name}>
              {SOCIAL_ICONS[name]}
            </a>
          ))}
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue-line" />
          <span className="mono-label">Scroll</span>
        </div>
      </div>
    </SceneSection>
  );
}
