import SceneSection from "./SceneSection";
import { ABOUT_GLANCE, ABOUT_PARAS } from "../data/content";

export default function About() {
  return (
    <SceneSection id="about">
      <article className="scene-copy">
        <p className="mono-label">01 — About</p>
        <h2>
          I build systems that see, read and <em className="accent-cyan">run offline</em>.
        </h2>
        <div className="about-copy">
          {ABOUT_PARAS.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="glance-grid" aria-label="At a glance">
          {ABOUT_GLANCE.map((item) => (
            <div className="glance-item" key={item.label}>
              <span className="mono-label">{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </article>
    </SceneSection>
  );
}
