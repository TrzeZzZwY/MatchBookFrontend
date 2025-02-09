'use client';

import { useState, useEffect, useRef } from 'react';

export function useAnimateOnScroll() {
  const [hasAnimated, setHasAnimated] = useState<{ [key: string]: boolean }>(
    {},
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated[entry.target.id]) {
            setHasAnimated((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [hasAnimated]);

  return { sectionRefs, hasAnimated };
}
