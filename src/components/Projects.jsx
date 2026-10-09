import { useState } from "react";
import { PROJECTS } from "../data/content";
import { use3DTilt } from "../hooks/use3DTilt";

const GH_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const tilt = use3DTilt(10, 1100);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={tilt.onMouseEnter}
      onMouseLeave={tilt.onMouseLeave}
      className="card-3d project-card-3d"
    >
      <div className="card-glare" />
      <div className="project-accent-glow" style={{ background: project.accent }} />

      <div className="project-card-header">
        <div className="project-title-group">
          <h3 className="project-title-text">{project.title}</h3>
          {project.badge && (
            <span className="project-badge-tag" style={{ color: project.accent, borderColor: project.accent }}>
              {project.badge}
            </span>
          )}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-github-btn"
          title="View Source on GitHub"
        >
          {GH_ICON}
          <span>Source</span>
        </a>
      </div>

      <div className="project-tags-cloud">
        {project.stack.split(", ").map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      <p className={`project-summary-text ${expanded ? "is-expanded" : ""}`}>
        {project.description}
      </p>

      {project.snippet && (
        <div className="project-code-preview">
          <div className="code-preview-bar">
            <span className="code-dot dot-red" />
            <span className="code-dot dot-yellow" />
            <span className="code-dot dot-green" />
            <span className="code-lang-label">pipeline.py</span>
          </div>
          <pre className="code-pre">
            <code>{project.snippet.trim()}</code>
          </pre>
        </div>
      )}

      <div className="project-card-footer">
        <button
          className="btn-toggle-details"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse Details ↑" : "Inspect Architecture ↓"}
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Featured <span className="text-gradient">AI Projects</span>
          </h2>
          <p className="section-subtitle">
            Autonomous perception systems, LLM agents, and high-efficiency neural models.
          </p>
        </div>

        <div className="projects-grid-3d">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
