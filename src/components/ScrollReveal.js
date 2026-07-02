"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", stagger = false, threshold = 0.15 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Immediately reveal all children
      const els = containerRef.current?.querySelectorAll(".reveal");
      els?.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    const els = containerRef.current?.querySelectorAll(".reveal");
    els?.forEach((el, i) => {
      if (stagger) {
        el.style.transitionDelay = `${i * 80}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stagger, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
