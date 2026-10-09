import { useEffect, useRef } from "react";
import { BIO, STATS, SKILL_GROUPS_ABOUT, COLLEGE, BRANCH, YEAR, CGPA, YEAR_RANGE } from "../data/content";
import { use3DTilt } from "../hooks/use3DTilt";

function SkillBar({ name, percent, accent }) {
  const barRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) fill.style.width = `${percent}%`;
      }
    }, { threshold: 0.2 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div className="skill-bar-item" ref={barRef}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" style={{ color: accent }}>{percent}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-fill" style={{ background: accent, width: 0 }} />
      </div>
    </div>
  );
}

export default function About() {
  const bioTilt = use3DTilt(10, 1100);
  const eduTilt = use3DTilt(10, 1100);

  return (
    <section id="about" className="section section-about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Bridging cutting-edge Deep Learning research with real-world, high-throughput production systems.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Bio Card + Stats + Education */}
          <div className="about-left-col">
            <div
              ref={bioTilt.ref}
              onMouseMove={bioTilt.onMouseMove}
              onMouseEnter={bioTilt.onMouseEnter}
              onMouseLeave={bioTilt.onMouseLeave}
              className="card-3d bio-card"
            >
              <div className="card-glare" />
              <div className="card-header-simple">
                <span className="tag-neural">NEURAL ARCHITECT &amp; ENGINEER</span>
                <span className="location-tag">Sangli, Maharashtra</span>
              </div>
              <p className="bio-paragraph">{BIO}</p>
            </div>

            {/* Stats Counter with 3D Hover */}
            <div className="stats-grid-3d">
              {STATS.map((s) => (
                <div key={s.label} className="stat-pill-3d">
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-caption">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Education Card with 3D Tilt */}
            <div
              ref={eduTilt.ref}
              onMouseMove={eduTilt.onMouseMove}
              onMouseEnter={eduTilt.onMouseEnter}
              onMouseLeave={eduTilt.onMouseLeave}
              className="card-3d edu-card-3d"
            >
              <div className="card-glare" />
              <div className="edu-icon-bubble">🎓</div>
              <div className="edu-details">
                <div className="edu-header-row">
                  <h3 className="edu-college-name">{COLLEGE}</h3>
                  <span className="cgpa-pill">CGPA {CGPA}</span>
                </div>
                <p className="edu-branch-name">{BRANCH}</p>
                <div className="edu-tags-row">
                  <span className="edu-chip">{YEAR}</span>
                  <span className="edu-chip">{YEAR_RANGE}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Capabilities & Technical Focus */}
          <div className="about-right-col">
            <div className="card-3d capabilities-card">
              <div className="card-header-simple">
                <span className="tag-neural">CORE AI / ML PROFICIENCY</span>
                <span className="mono-subtext">TELEMETRY_GAUGE</span>
              </div>
              <div className="skill-bars-list">
                {SKILL_GROUPS_ABOUT.map((sg) => (
                  <SkillBar key={sg.name} {...sg} />
                ))}
              </div>

              <div className="ai-principles-box">
                <h4 className="principles-title">ENGINEERING PHILOSOPHY</h4>
                <ul className="principles-list">
                  <li>
                    <span className="bullet-cyan">▸</span>
                    <strong>Zero-Lag Inference:</strong> Quantization (INT8/FP16) &amp; ONNX optimization.
                  </li>
                  <li>
                    <span className="bullet-cyan">▸</span>
                    <strong>Robust Pipelines:</strong> End-to-end reproducibility, clean MLOps tracking.
                  </li>
                  <li>
                    <span className="bullet-cyan">▸</span>
                    <strong>Multimodal Synergy:</strong> Blending Vision, Audio, and LLMs seamlessly.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
