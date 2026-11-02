/**
 * Four compact cards sit on the left and right so the figure stays in the
 * middle of the photo. Extra projects drop into the same two columns later.
 * A click opens a wide cinematic panel instead of covering the whole page.
 */
import { useMemo, useState } from "react";
import SceneSection from "./SceneSection";
import ProjectDetails from "./ProjectDetails";
import { visibleProjects } from "../data/content";

const FILTERS = ["All", "CV", "RAG/LLM", "IoT/Edge", "Web"];
const STAGE_COUNT = 4;

function realText(value) {
  return value && !String(value).startsWith("TODO:") ? value : "";
}

function shortTitle(title) {
  return title.split("—")[0].trim();
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showMore, setShowMore] = useState(false);
  const [selected, setSelected] = useState(null);
  const projects = visibleProjects();

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
  }, [projects, filter]);

  const staged = showMore ? filtered : filtered.slice(0, STAGE_COUNT);
  const left = [];
  const right = [];
  staged.forEach((project, index) => {
    if (index % 4 < 2) left.push(project);
    else right.push(project);
  });
  const extraCount = filtered.length - STAGE_COUNT;

  return (
    <SceneSection id="projects">
      <div className="projects-stage">
        <header className="projects-head">
          <p className="mono-label">03 — Work</p>
          <h2>
            Things I&apos;ve <em className="accent-cyan">built</em>
          </h2>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                className="chip project-filter"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item === "CV" ? "Computer Vision" : item}
              </button>
            ))}
          </div>
        </header>

        <div className="projects-board">
          <div className="projects-col">
            {left.map((project) => (
              <ProjectCard key={project.title} project={project} onSelect={setSelected} />
            ))}
          </div>
          <div className="projects-gap" aria-hidden="true" />
          <div className="projects-col">
            {right.map((project) => (
              <ProjectCard key={project.title} project={project} onSelect={setSelected} />
            ))}
          </div>
        </div>

        {extraCount > 0 && (
          <button
            type="button"
            className="btn btn-ghost projects-more"
            onClick={() => setShowMore((value) => !value)}
          >
            {showMore ? "Show fewer" : `More projects (${extraCount})`}
          </button>
        )}
      </div>

      {selected && (
        <ProjectDetails project={selected} onClose={() => setSelected(null)} />
      )}
    </SceneSection>
  );
}

function ProjectCard({ project, onSelect }) {
  const metric = realText(project.badge) || realText(project.result);

  return (
    <button
      type="button"
      className="project-card"
      onClick={() => onSelect(project)}
    >
      <div>
        <span className="mono-label">{project.category}</span>
        <h3>{shortTitle(project.title)}</h3>
        {metric && <p className="project-metric">{metric}</p>}
      </div>
      <span className="project-card-arrow" aria-hidden="true">→</span>
    </button>
  );
}
