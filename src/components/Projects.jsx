import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ProjectDetails from "./ProjectDetails";
import SectionReveal, { RevealGroup, RevealItem } from "./SectionReveal";

const FILTERS = ["All", "CV", "RAG/LLM", "IoT/Edge", "Web"];

function ProjectCard({ project, onSelect, reducedMotion }) {
  const coverImage = project.image || project.gallery?.[0]?.src;
  const metric = project.badge || (
    project.result && !project.result.startsWith("TODO:")
      ? project.result
      : "Metric not published"
  );
  const stack = project.stack
    .split(", ")
    .filter((technology) => !technology.startsWith("TODO:"));
  const details = [
    ["Problem", project.problem],
    ["Approach", project.approach],
    ["Result", project.result],
  ];

  return (
    <motion.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
      className="card-3d project-card-3d"
      style={{ "--project-accent": project.accent }}
    >
      <div className="card-glare" aria-hidden="true" />
      {coverImage ? (
        <img
          className="project-image"
          src={coverImage}
          alt={`${project.title} project`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-image project-image-placeholder" aria-hidden="true">
          <span>{project.category}</span>
          <strong>{project.title}</strong>
        </div>
      )}

      <div className="project-card-content">
        <div className="project-card-title-row">
          <div className="project-title-group">
            <span className="project-category">{project.category}</span>
            <h3 className="project-title-text">{project.title}</h3>
          </div>
        </div>
        <p className="project-metric-badge" title={metric}>{metric}</p>

        <dl className="project-proof-details">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value && !value.startsWith("TODO:") ? value : "Details coming soon."}</dd>
            </div>
          ))}
        </dl>

        {stack.length > 0 && (
          <div className="project-tags-cloud" aria-label="Technologies">
            {stack.map((technology) => (
              <span key={technology} className="tech-badge">{technology}</span>
            ))}
          </div>
        )}

        <div className="project-card-footer">
          <div className="project-actions">
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-github-btn">
                  Source ↗
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-github-btn">
                  Demo ↗
                </a>
              )}
            </div>
            <button type="button" className="btn-toggle-details" onClick={() => onSelect(project)}>
              Details
              <span aria-hidden="true"> ↗</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const reducedMotion = useReducedMotion();
  const closeDetails = useCallback(() => setSelectedProject(null), []);
  const matchesFilter = (project) => activeFilter === "All" || project.category === activeFilter;
  const featuredProjects = PROJECTS.filter((project) => project.featured && matchesFilter(project));
  const olderProjects = PROJECTS.filter((project) => !project.featured && matchesFilter(project));
  const visibleProjects = showMoreProjects
    ? [...featuredProjects, ...olderProjects]
    : featuredProjects;

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setShowMoreProjects(false);
  };

  return (
    <SectionReveal id="projects" className="section section-projects">
      <RevealGroup className="container">
        <RevealItem className="section-header">
          <h2 className="section-title">
            Featured <span className="text-gradient">AI Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore projects in computer vision, language models, edge systems, and web apps.
          </p>
        </RevealItem>

        <RevealItem className="project-filters" role="group" aria-label="Filter projects by category">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`project-filter${activeFilter === filter ? " is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => selectFilter(filter)}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="active-project-filter"
                  className="project-filter-indicator"
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                />
              )}
              <span>{filter}</span>
            </button>
          ))}
        </RevealItem>

        <RevealItem className="projects-grid-reveal">
          <motion.div
            layout
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
            className="projects-grid-3d"
          >
            <AnimatePresence mode="sync" initial={false}>
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onSelect={setSelectedProject}
                  reducedMotion={reducedMotion}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </RevealItem>

        {visibleProjects.length === 0 && (
          <RevealItem className="projects-empty-state">
            No featured projects in this category yet.
          </RevealItem>
        )}

        {olderProjects.length > 0 && (
          <RevealItem className="projects-more-row">
            <button
              type="button"
              className="projects-more-button"
              aria-expanded={showMoreProjects}
              onClick={() => setShowMoreProjects((shown) => !shown)}
            >
              {showMoreProjects ? "Show fewer projects" : `More projects (${olderProjects.length})`}
              <span aria-hidden="true">{showMoreProjects ? " ↑" : " ↓"}</span>
            </button>
          </RevealItem>
        )}
      </RevealGroup>

      {selectedProject && (
        <ProjectDetails project={selectedProject} onClose={closeDetails} />
      )}
    </SectionReveal>
  );
}
