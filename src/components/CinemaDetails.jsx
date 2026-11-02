/**
 * Shared cinematic overlay used by Projects and Experience.
 * Letterbox bars dim the photo; a wide panel holds the full story.
 */
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export default function CinemaDetails({ item, onClose }) {
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
          aria-label="Close details"
        >
          ×
        </button>
        {item.label && <p className="mono-label">{item.label}</p>}
        <h2 id={titleId}>{item.title}</h2>
        {item.description && <p className="project-dialog-description">{item.description}</p>}
        {item.facts?.length > 0 && (
          <dl className="cinema-facts">
            {item.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {item.list?.length > 0 && (
          <section className="project-dialog-section">
            <h3>Highlights</h3>
            <ul>
              {item.list.map((entry) => <li key={entry}>{entry}</li>)}
            </ul>
          </section>
        )}
        {item.tags?.length > 0 && (
          <div className="project-tags-cloud">
            {item.tags.map((tag) => (
              <span key={tag} className="tech-badge">{tag}</span>
            ))}
          </div>
        )}
        {item.links?.length > 0 && (
          <div className="project-dialog-actions">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={link.primary ? "btn btn-primary" : "btn btn-ghost"}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}
