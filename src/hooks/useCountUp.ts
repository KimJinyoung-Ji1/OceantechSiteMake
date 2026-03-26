'use client';

import { useEffect, useRef, useState } from 'react';
import type React from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  startOnView?: boolean;
  retrigger?: boolean;
}

export function useCountUp({ target, duration = 2000, startOnView = true, retrigger = false }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const [triggerKey, setTriggerKey] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (retrigger) {
            setCount(0);
            setTriggerKey((k) => k + 1);
            setHasStarted(true);
          } else if (!hasStarted) {
            setHasStarted(true);
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, hasStarted, retrigger]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, triggerKey, target, duration]);

  return { count, ref: ref as React.RefObject<HTMLElement> };
}
