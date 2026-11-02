import SceneSection from "./SceneSection";
import { SKILL_GROUPS } from "../data/content";

const LEVEL_CLASS = {
  daily: "tag-daily",
  project: "tag-project",
  learning: "tag-learning",
};

export default function Skills() {
  return (
    <SceneSection id="skills">
      <article className="scene-copy">
        <p className="mono-label">02 — Skills</p>
        <h2>
          Tools I <em className="accent-amber">think with</em>
        </h2>
        <div className="skill-legend" aria-label="Skill level legend">
          <span className="chip tag-daily">Daily use</span>
          <span className="chip tag-project">Used in projects</span>
          <span className="chip tag-learning">Learning</span>
        </div>
        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <div className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-tags">
                {group.tags.map((tag) => (
                  <span key={tag.name} className={`chip ${LEVEL_CLASS[tag.level]}`}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </SceneSection>
  );
}
