import { useEffect, useRef } from "react";
import { usePageVisible } from "../hooks/usePageVisible";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isPageVisible = usePageVisible();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || prefersReducedMotion || !isPageVisible) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const target = { x: 0, y: 0 };
    const dotPosition = { x: 0, y: 0 };
    const ringPosition = { x: 0, y: 0 };
    let frameId = 0;
    let isVisible = false;

    const render = () => {
      dotPosition.x += (target.x - dotPosition.x) * 0.45;
      dotPosition.y += (target.y - dotPosition.y) * 0.45;
      ringPosition.x += (target.x - ringPosition.x) * 0.16;
      ringPosition.y += (target.y - ringPosition.y) * 0.16;

      dot.style.transform = `translate3d(${dotPosition.x}px, ${dotPosition.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;

      if (
        Math.abs(target.x - ringPosition.x) > 0.1 ||
        Math.abs(target.y - ringPosition.y) > 0.1
      ) {
        frameId = requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const onPointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        dotPosition.x = target.x;
        dotPosition.y = target.y;
        ringPosition.x = target.x;
        ringPosition.y = target.y;
      }
      if (!frameId) frameId = requestAnimationFrame(render);
    };

    const onPointerLeave = (event) => {
      if (event.relatedTarget) return;
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerout", onPointerLeave);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerout", onPointerLeave);
    };
  }, [isPageVisible, prefersReducedMotion]);

  return (
    <>
      <div ref={ringRef} className="custom-cursor custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
