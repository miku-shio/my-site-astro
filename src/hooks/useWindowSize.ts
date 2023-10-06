import { useEffect, useState } from "react";

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    let resizeTimer: ReturnType<typeof setTimeout> | false = false;
    let currentWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (currentWidth == window.innerWidth) return;
      if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        currentWidth = window.innerWidth;
        updateSize();
      }, 200);
    });

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
