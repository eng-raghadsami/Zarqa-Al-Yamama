import { useEffect, useRef, useState } from "react";

export type UseCountUpOptions = {
  duration?: number;
  decimals?: number;
  enabled?: boolean;
  threshold?: number;
};

export function useCountUp(
  target: number,
  {
    duration = 1800,
    decimals = 0,
    enabled = true,
    threshold = 0.2,
  }: UseCountUpOptions = {},
) {
  const [value, setValue] = useState(enabled ? 0 : target);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, target, threshold]);

  useEffect(() => {
    if (!enabled) return;
    if (!hasStarted) return;

    let startTime: number | null = null;
    let rafId = 0;
    const factor = 10 ** decimals;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(eased * target * factor) / factor;
      setValue(next);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [hasStarted, target, duration, decimals, enabled]);

  return { value, ref, hasStarted };
}
