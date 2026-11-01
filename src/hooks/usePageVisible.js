import { useEffect, useState } from "react";

export function usePageVisible() {
  const [isPageVisible, setIsPageVisible] = useState(
    () => document.visibilityState === "visible"
  );

  useEffect(() => {
    const updateVisibility = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return isPageVisible;
}
