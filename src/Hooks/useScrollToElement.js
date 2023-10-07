import { useEffect } from "react";

export const useScrollToElement = (element, state) => {
  useEffect(() => {
    const elementOffset = document.getElementById(element).offsetTop;
    if (window.scrollY < elementOffset && state) {
      window.scrollTo({ top: elementOffset, left: 0, behavior: "smooth" });
    }
  }, [state]);
};
