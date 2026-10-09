import { useRef, useCallback } from "react";

export function use3DTilt(maxTilt = 12, perspective = 1000) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const card = ref.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    },
    [maxTilt, perspective]
  );

  const handleMouseEnter = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transition = "transform 0.15s ease-out, box-shadow 0.25s ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease-out";
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
  }, [perspective]);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}
