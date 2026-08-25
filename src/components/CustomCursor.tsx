"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor. Uses DOM transforms (not React state per frame)
 * so mousemove does not thrash re-renders / INP on desktop.
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    setMounted(true);
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      const { x: px, y: py } = posRef.current;
      const trail = trailRef.current;
      trail.x += (px - trail.x) * 0.15;
      trail.y += (py - trail.y) * 0.15;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const selector = "a, button, [role='button'], input, textarea, [data-cursor-hover]";
    const applyHover = (next: boolean) => {
      if (hoverRef.current === next) return;
      hoverRef.current = next;
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.width = next ? "56px" : "32px";
      ring.style.height = next ? "56px" : "32px";
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(selector)) applyHover(true);
    };
    const onOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as Element)?.closest(selector)) applyHover(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: "translate(-100px, -100px) translate(-50%, -50%)",
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "2px solid rgba(92, 139, 201, 0.6)",
          boxShadow: "0 0 20px rgba(92, 139, 201, 0.25)",
          transition: "width 0.2s ease, height 0.2s ease",
          willChange: "transform",
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: "translate(-100px, -100px) translate(-50%, -50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(92, 139, 201, 0.95)",
          willChange: "transform",
        }}
        aria-hidden
      />
    </>
  );
}
