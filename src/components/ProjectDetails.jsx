/**
 * Cinematic project view: letterbox bars and a wide panel rise over the
 * photo so you can read the full story without leaving the scene.
 */
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

const hasContent = (value) => value && !String(value).startsWith("TODO:");

export default function ProjectDetails({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const gallery = project.gallery?.length
    ? project.gallery
    : project.image
      ? [{ src: project.image, alt: `${project.title} screenshot` }]
      : [];
  const stack = String(project.stack || "")
    .split(",")
    .map((technology) => technology.trim())
    .filter((technology) => technology && !technology.startsWith("TODO:"));
  const facts = [
    ["Problem", project.problem],
    ["Approach", project.approach],
    ["Result", project.result],
  ].filter(([, value]) => hasContent(value));

  return createPortal(
    <div
      className="cinema-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cinema-letterbox cinema-letterbox-top" aria-hidden="true" />
      <div className="cinema-letterbox cinema-letterbox-bottom" aria-hidden="true" />
      <section
        ref={dialogRef}
        className="cinema-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="project-dialog-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <p className="mono-label">{project.category}</p>
        <h2 id={titleId}>{project.title}</h2>
        {hasContent(project.description) && (
          <p className="project-dialog-description">{project.description}</p>
        )}
        {facts.length > 0 && (
          <dl className="cinema-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {project.architecture?.length > 0 && (
          <section className="project-dialog-section" aria-labelledby={`${titleId}-architecture`}>
            <h3 id={`${titleId}-architecture`}>Architecture</h3>
            <ul>
              {project.architecture.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}
        {gallery.length > 0 && (
          <section className="project-dialog-section" aria-labelledby={`${titleId}-gallery`}>
            <h3 id={`${titleId}-gallery`}>Screenshots</h3>
            <div className="project-gallery">
              {gallery.map((image) => (
                <figure key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt || `${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}
        {stack.length > 0 && (
          <div className="project-tags-cloud">
            {stack.map((technology) => (
              <span key={technology} className="tech-badge">{technology}</span>
            ))}
          </div>
        )}
        {(project.github || project.demo) && (
          <div className="project-dialog-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Source
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Demo
              </a>
            )}
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}
