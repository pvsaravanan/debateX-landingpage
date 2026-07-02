"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
  { target: 5, label: "Deliberation Rounds", prefix: "", suffix: "" },
  { target: 8, label: "LLMs in Council", prefix: "", suffix: "" },
  { target: 4, label: "Cognitive Roles", prefix: "", suffix: "" },
  { target: 0.01, label: "Avg Cost Per Query", prefix: "<$", suffix: "", isDecimal: true },
];

function AnimatedNumber({ target, prefix, suffix, isDecimal, shouldAnimate }) {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 1800;
    const startTime = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      if (isDecimal) {
        setCurrent(+(easedProgress * target).toFixed(2));
      } else {
        setCurrent(Math.round(easedProgress * target));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldAnimate, target, isDecimal]);

  const display = isDecimal ? current.toFixed(2) : current;

  return (
    <span className="stat-number">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function AnimatedStats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-strip" ref={sectionRef} style={{ borderTop: '0.5px solid var(--bg-border-hi)', borderBottom: 'none', padding: '48px 0' }}>
      <div className="stats-container">
        {statsData.map((stat, idx) => (
          <div key={idx}>
            <div className="stat-item reveal revealed" style={{ transitionDelay: `${idx * 150}ms` }}>
              <AnimatedNumber
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
                shouldAnimate={isVisible}
              />
              <span className="stat-label">{stat.label}</span>
            </div>
            {idx < statsData.length - 1 && <div className="stat-divider"></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
