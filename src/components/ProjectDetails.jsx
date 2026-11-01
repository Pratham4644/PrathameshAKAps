import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

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
  const hasContent = (value) => value && !value.startsWith("TODO:");
  const stack = project.stack
    .split(", ")
    .filter((technology) => !technology.startsWith("TODO:"));

  return createPortal(
    <div
      className="project-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="project-dialog"
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
        <span className="project-category">{project.category}</span>
        <h2 id={titleId}>{project.title}</h2>
        {hasContent(project.description) && (
          <p className="project-dialog-description">{project.description}</p>
        )}

        <dl className="project-proof-details">
          {[
            ["Problem", project.problem],
            ["Approach", project.approach],
            ["Result", project.result],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{hasContent(value) ? value : "Details coming soon."}</dd>
            </div>
          ))}
        </dl>

        <section className="project-dialog-section" aria-labelledby={`${titleId}-architecture`}>
          <h3 id={`${titleId}-architecture`}>Architecture</h3>
          <ul>
            {project.architecture?.length ? (
              project.architecture.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>Architecture details coming soon.</li>
            )}
          </ul>
        </section>

        <section className="project-dialog-section" aria-labelledby={`${titleId}-gallery`}>
          <h3 id={`${titleId}-gallery`}>Screenshots</h3>
          {gallery.length ? (
            <div className="project-gallery">
              {gallery.map((image) => (
                <figure key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt || `${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                  />
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : (
            <p>Screenshots coming soon.</p>
          )}
        </section>

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
        )}
      </section>
    </div>,
    document.body
  );
}
