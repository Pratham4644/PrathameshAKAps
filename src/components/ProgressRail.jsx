import { SCENES } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ProgressRail({ activeScene }) {
  const prefersReducedMotion = useReducedMotion();

  const goTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { immediate: prefersReducedMotion });
      return;
    }
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="progress-rail" aria-label="Section progress">
      {SCENES.map((scene) => (
        <button
          key={scene.id}
          type="button"
          className={`progress-dot${activeScene === scene.n ? " is-active" : ""}`}
          aria-label={`Go to ${scene.id}`}
          aria-current={activeScene === scene.n ? "true" : undefined}
          onClick={() => goTo(scene.id)}
        />
      ))}
      <span className="mono-label progress-count">
        {String(activeScene).padStart(2, "0")} / 06
      </span>
    </div>
  );
}
