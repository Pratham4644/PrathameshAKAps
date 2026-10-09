import { useEffect, useRef, useState } from "react";
import { FULL_NAME, ROLE_TITLES, BIO, SOCIAL_LINKS, RESUME_URL } from "../data/content";
import ThreeNeuralScene from "./ThreeNeuralScene";
import { use3DTilt } from "../hooks/use3DTilt";

const SOCIAL_ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  LeetCode: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  ),
  Kaggle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.331z" />
    </svg>
  ),
};

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  // 3D Tilt hook on the interactive telemetry card
  const tiltCard = use3DTilt(14, 1200);

  useEffect(() => {
    const currentRole = ROLE_TITLES[roleIdx];
    const speed = isDeleting ? 35 : 70;
    const pause = isDeleting ? 250 : displayed.length === currentRole.length ? 2200 : speed;
    timeoutRef.current = setTimeout(() => {
      if (!isDeleting && displayed.length < currentRole.length) {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      } else if (!isDeleting && displayed.length === currentRole.length) {
        setIsDeleting(true);
      } else if (isDeleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else if (isDeleting && displayed.length === 0) {
        setIsDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLE_TITLES.length);
      }
    }, pause);
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, roleIdx]);

  const firstName = FULL_NAME.split(" ")[0];
  const lastName = FULL_NAME.split(" ").slice(1).join(" ");

  return (
    <section id="hero" className="hero-section">
      {/* 3D WebGL Neural Scene */}
      <ThreeNeuralScene />
      <div className="hero-radial-vignette" />

      <div className="hero-container">
        {/* Left Column: Big Bold Typography & CTAs */}
        <div className="hero-left">
          <div className="hero-status-pill">
            <span className="status-indicator-dot" />
            <span>AVAILABLE FOR AI / ML ROLES</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-first">{firstName}</span>{" "}
            <span className="hero-title-last">{lastName}</span>
          </h1>

          <div className="hero-typing-box">
            <span className="typing-prompt">&gt;</span>
            <span className="typing-text">{displayed}</span>
            <span className="typing-cursor"></span>
          </div>

          <p className="hero-description">{BIO}</p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="btn-3d btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Explore Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d btn-glass"
            >
              <span>Download CV</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          </div>

          <div className="hero-social-strip">
            <span className="social-label">CONNECT:</span>
            <div className="social-icons-group">
              {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-3d"
                  title={name}
                  aria-label={name}
                >
                  {SOCIAL_ICONS[name]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic AI Telemetry Card */}
        <div className="hero-right">
          <div
            ref={tiltCard.ref}
            onMouseMove={tiltCard.onMouseMove}
            onMouseEnter={tiltCard.onMouseEnter}
            onMouseLeave={tiltCard.onMouseLeave}
            className="hero-telemetry-card"
          >
            <div className="card-glare" />
            <div className="card-top-bar">
              <div className="card-window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="card-system-id">neural_core_v3.2 // LIVE</span>
            </div>

            <div className="card-body">
              <div className="telemetry-stat-row">
                <div className="stat-label">FOCUS ARCHITECTURES</div>
                <div className="stat-value text-cyan">Transformers • CNN • LLMs • Diffusion</div>
              </div>

              <div className="telemetry-stat-row">
                <div className="stat-label">TOP PERFORMANCE METRIC</div>
                <div className="stat-value text-emerald">98.4% Classification Accuracy</div>
              </div>

              <div className="telemetry-grid-2col">
                <div className="telemetry-box">
                  <span className="telemetry-num">15+</span>
                  <span className="telemetry-caption">AI Systems Built</span>
                </div>
                <div className="telemetry-box">
                  <span className="telemetry-num">&lt;45ms</span>
                  <span className="telemetry-caption">Avg Inference Latency</span>
                </div>
              </div>

              <div className="telemetry-signal-track">
                <div className="signal-header">
                  <span>TRAINING LOSS CONVERGENCE</span>
                  <span className="signal-val">0.0124 (Optimal)</span>
                </div>
                <div className="signal-bar">
                  <div className="signal-fill" style={{ width: "94%" }} />
                </div>
              </div>

              <div className="card-footer-badge">
                <span className="pulse-beacon" />
                <span>PYTORCH • TENSORFLOW • HUGGINGFACE • OPENCV</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-indicator-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="scroll-mouse">
          <span className="scroll-wheel" />
        </span>
        <span className="scroll-text">EXPLORE</span>
      </a>
    </section>
  );
}
