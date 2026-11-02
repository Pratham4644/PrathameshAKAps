/**
 * Same stage as Projects: two cards left, two right, the figure stays
 * in the middle. Click a card for the cinematic detail panel.
 */
import { useState } from "react";
import SceneSection from "./SceneSection";
import CinemaDetails from "./CinemaDetails";
import { JOURNEY_ITEMS } from "../data/content";

const STAGE_COUNT = 4;

export default function Experience() {
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(null);
  const staged = showMore ? JOURNEY_ITEMS : JOURNEY_ITEMS.slice(0, STAGE_COUNT);
  const left = [];
  const right = [];
  staged.forEach((item, index) => {
    if (index % 4 < 2) left.push(item);
    else right.push(item);
  });
  const extraCount = JOURNEY_ITEMS.length - STAGE_COUNT;

  return (
    <SceneSection id="experience">
      <div className="projects-stage">
        <header className="projects-head">
          <p className="mono-label">04 — Journey</p>
          <h2>
            The <em className="accent-amber">road</em> so far
          </h2>
        </header>

        <div className="projects-board">
          <div className="projects-col">
            {left.map((item) => (
              <JourneyCard key={item.title} item={item} onSelect={setSelected} />
            ))}
          </div>
          <div className="projects-gap" aria-hidden="true" />
          <div className="projects-col">
            {right.map((item) => (
              <JourneyCard key={item.title} item={item} onSelect={setSelected} />
            ))}
          </div>
        </div>

        {extraCount > 0 && (
          <button
            type="button"
            className="btn btn-ghost projects-more"
            onClick={() => setShowMore((value) => !value)}
          >
            {showMore ? "Show fewer" : `More on the road (${extraCount})`}
          </button>
        )}
      </div>

      {selected && (
        <CinemaDetails item={selected} onClose={() => setSelected(null)} />
      )}
    </SceneSection>
  );
}

function JourneyCard({ item, onSelect }) {
  return (
    <button
      type="button"
      className="project-card"
      onClick={() => onSelect(item)}
    >
      <div>
        <span className="mono-label">{item.label}</span>
        <h3>{item.title}</h3>
        {item.metric && <p className="project-metric">{item.metric}</p>}
      </div>
      <span className="project-card-arrow" aria-hidden="true">→</span>
    </button>
  );
}
