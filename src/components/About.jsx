import { BIO, STATS, SKILL_LEVELS, COLLEGE, BRANCH, YEAR, CGPA, YEAR_RANGE } from "../data/content";
import { use3DTilt } from "../hooks/use3DTilt";
import SectionReveal, { RevealGroup, RevealItem } from "./SectionReveal";

export default function About() {
  const bioTilt = use3DTilt(10, 1100);
  const eduTilt = use3DTilt(10, 1100);

  return (
    <SectionReveal id="about" className="section section-about">
      <RevealGroup className="container">
        <RevealItem className="section-header">
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Bridging cutting-edge Deep Learning research with real-world, high-throughput production systems.
          </p>
        </RevealItem>

        <RevealGroup className="about-grid">
          {/* Left Column: Bio Card + Stats + Education */}
          <RevealItem className="about-left-col">
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
          </RevealItem>

          {/* Right Column: AI Capabilities & Technical Focus */}
          <RevealItem className="about-right-col">
            <div className="card-3d capabilities-card">
              <div className="card-header-simple">
                <span className="tag-neural">TOOLS &amp; TECHNOLOGIES</span>
                <span className="mono-subtext">BY EXPERIENCE</span>
              </div>
              <div className="skill-level-list">
                {SKILL_LEVELS.map((level) => (
                  <div className="skill-level-row" key={level.name}>
                    <h4 className="skill-level-title" style={{ color: level.accent }}>{level.name}</h4>
                    <div className="skill-tag-list">
                      {level.skills.map((skill) => (
                        <span className="skill-tag" key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
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
          </RevealItem>
        </RevealGroup>
      </RevealGroup>
    </SectionReveal>
  );
}
