/**
 * One full-screen photograph per page.
 * The photo is a CSS background (not WebGL). It stays pinned while a long
 * section like Projects scrolls, so the figure does not jump around.
 */
import { SCENES } from "../data/content";

function sceneAsset(fileName) {
  return `${import.meta.env.BASE_URL}scenes/${fileName}`;
}

function getScene(id) {
  return SCENES.find((scene) => scene.id === id);
}

export default function SceneSection({ id, children, className = "" }) {
  const scene = getScene(id);
  if (!scene) return null;

  const imageUrl = sceneAsset(scene.image);
  const [tx, ty] = scene.figureTarget;

  return (
    <section
      id={id}
      data-scene={scene.n}
      className={`scene-section side-${scene.side} ${className}`.trim()}
      style={{
        "--scene-image": `url("${imageUrl}")`,
        "--scene-pos": `${tx * 100}% ${ty * 100}%`,
      }}
    >
      <div className="scene-sticky" aria-hidden="true">
        <div className="scene-photo" />
        <div className="scene-overlay" />
      </div>
      <p className="visually-hidden">{scene.description}</p>
      <div className="scene-grid">
        <div className="scene-content">{children}</div>
      </div>
    </section>
  );
}
