import { useState } from "react";
import { SKILLS_GROUPS } from "../data/content";

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = SKILLS_GROUPS[activeGroup];

  return (
    <section id="skills" className="section section-skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Battle-tested frameworks, neural architectures, and computational toolkits.
          </p>
        </div>

        {/* 3D Segmented Switcher */}
        <div className="skills-tabs-wrap">
          <div className="skills-tabs-container">
            {SKILLS_GROUPS.map((g, i) => (
              <button
                key={g.name}
                className={`skill-tab-btn ${activeGroup === i ? "is-active" : ""}`}
                onClick={() => setActiveGroup(i)}
              >
                <span>{g.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Elevated Skill Cards Grid */}
        <div className="skills-grid-3d">
          {group.skills.map(([name, pct]) => (
            <div key={name} className="skill-card-3d">
              <div className="skill-card-top">
                <span className="skill-name-text">{name}</span>
                <span className="skill-pct-badge" style={{ color: group.accent }}>
                  {pct}%
                </span>
              </div>
              <div className="skill-progress-track">
                <div
                  className="skill-progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, #00f2fe, ${group.accent})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Clean Proficiency Legend */}
        <div className="skills-legend-bar">
          <div className="legend-chip">
            <span className="legend-dot dot-cyan" />
            <span>Foundational Mastery</span>
          </div>
          <div className="legend-chip">
            <span className="legend-dot dot-violet" />
            <span>Production Deployed</span>
          </div>
          <div className="legend-chip">
            <span className="legend-dot dot-emerald" />
            <span>Fine-Tuning &amp; Research</span>
          </div>
        </div>
      </div>
    </section>
  );
}
