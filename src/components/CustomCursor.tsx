"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    let rafId: number;
    const tick = () => {
      const { x: px, y: py } = posRef.current;
      setTrail((prev) => ({
        x: prev.x + (px - prev.x) * 0.15,
        y: prev.y + (py - prev.y) * 0.15,
      }));
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", handleMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const selector = "a, button, [role='button'], input, textarea, [data-cursor-hover]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(selector)) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as Element)?.closest(selector)) setHover(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Outer ring – smooth trail */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`,
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          borderRadius: "50%",
          border: "2px solid rgba(92, 139, 201, 0.6)",
          boxShadow: "0 0 20px rgba(92, 139, 201, 0.25)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
        aria-hidden
      />
      {/* Inner dot – snappy */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "radial-gradient(circle, #5c8bc9 0%, #2d5a9e 100%)",
          boxShadow: "0 0 12px rgba(92, 139, 201, 0.6)",
          transition: "transform 0.05s ease-out",
        }}
        aria-hidden
      />
    </>
  );
}
