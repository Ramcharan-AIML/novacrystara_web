"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView] where `inView` flips to true the first time
 * the element enters the viewport and stays true thereafter.
 */
export function useInViewOnce<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "-100px" }
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      options
    );
    io.observe(node);
    return () => io.disconnect();
  }, [inView, options]);

  return [ref, inView];
}
