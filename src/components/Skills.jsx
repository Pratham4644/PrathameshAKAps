import { SKILL_LEVELS } from "../data/content";
import SectionReveal, { RevealGroup, RevealItem } from "./SectionReveal";

export default function Skills() {
  return (
    <SectionReveal id="skills" className="section section-skills">
      <RevealGroup className="container">
        <RevealItem className="section-header">
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Battle-tested frameworks, neural architectures, and computational toolkits.
          </p>
        </RevealItem>

        <RevealGroup className="skills-levels-grid">
          {SKILL_LEVELS.map((level) => (
            <RevealItem as="section" className="skills-level-card" key={level.name}>
              <h3 className="skills-level-title" style={{ color: level.accent }}>{level.name}</h3>
              <div className="skill-tag-list">
                {level.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </RevealGroup>
    </SectionReveal>
  );
}
