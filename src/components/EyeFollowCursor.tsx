"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const IRIS_MAX_OFFSET = 10;
const PUPIL_MAX_OFFSET = 12;
const EYE_GAP = 90;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getOffset(
  eyeCenterX: number,
  eyeCenterY: number,
  mouseX: number,
  mouseY: number,
  maxOffset: number,
) {
  const dx = mouseX - eyeCenterX;
  const dy = mouseY - eyeCenterY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { x: 0, y: 0 };
  const ratio = Math.min(dist / 300, 1);
  return {
    x: clamp((dx / dist) * maxOffset * ratio, -maxOffset, maxOffset),
    y: clamp((dy / dist) * maxOffset * ratio, -maxOffset, maxOffset),
  };
}

function SingleEye({
  cx,
  cy,
  mouseX,
  mouseY,
  blinking,
}: {
  cx: number;
  cy: number;
  mouseX: number;
  mouseY: number;
  blinking: boolean;
}) {
  const iris = getOffset(cx, cy, mouseX, mouseY, IRIS_MAX_OFFSET);
  const pupil = getOffset(cx, cy, mouseX, mouseY, PUPIL_MAX_OFFSET);

  return (
    <g>
      {/* Outer glow */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={42}
        ry={26}
        fill="none"
        stroke="rgba(92,139,201,0.15)"
        strokeWidth={2}
        filter="url(#eyeGlow)"
      />
      {/* Sclera (white of the eye) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={38}
        ry={22}
        fill="url(#scleraGrad)"
        stroke="rgba(92,139,201,0.3)"
        strokeWidth={1.5}
      />
      {/* Iris */}
      <circle
        cx={cx + iris.x}
        cy={cy + iris.y}
        r={14}
        fill="url(#irisGrad)"
        style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
      />
      {/* Iris detail ring */}
      <circle
        cx={cx + iris.x}
        cy={cy + iris.y}
        r={14}
        fill="none"
        stroke="rgba(92,139,201,0.4)"
        strokeWidth={0.5}
        style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
      />
      {/* Pupil */}
      <circle
        cx={cx + pupil.x}
        cy={cy + pupil.y}
        r={6}
        fill="#0a0f1a"
        style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
      />
      {/* Pupil highlight */}
      <circle
        cx={cx + pupil.x - 3}
        cy={cy + pupil.y - 3}
        r={2.2}
        fill="rgba(255,255,255,0.85)"
        style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
      />
      <circle
        cx={cx + pupil.x + 2}
        cy={cy + pupil.y + 1.5}
        r={1}
        fill="rgba(255,255,255,0.4)"
        style={{ transition: "cx 0.08s ease-out, cy 0.08s ease-out" }}
      />
      {/* Eyelid (blink overlay) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={39}
        ry={23}
        fill="var(--navy-950, #0a0f1a)"
        className={blinking ? "eye-blink-shut" : "eye-blink-open"}
      />
      {/* Upper eyelid shadow */}
      <path
        d={`M${cx - 39} ${cy} Q${cx} ${cy - 28} ${cx + 39} ${cy}`}
        fill="none"
        stroke="rgba(92,139,201,0.2)"
        strokeWidth={1}
      />
      {/* Lower eyelid line */}
      <path
        d={`M${cx - 36} ${cy + 2} Q${cx} ${cy + 24} ${cx + 36} ${cy + 2}`}
        fill="none"
        stroke="rgba(92,139,201,0.12)"
        strokeWidth={0.75}
      />
    </g>
  );
}

export default function EyeFollowCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4000;
      return setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 180);
        timerId = scheduleBlink();
      }, delay);
    };
    let timerId = scheduleBlink();
    return () => clearTimeout(timerId);
  }, []);

  const svgWidth = 220;
  const svgHeight = 80;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const leftEyeX = centerX - EYE_GAP / 2;
  const rightEyeX = centerX + EYE_GAP / 2;

  const rect = containerRef.current?.getBoundingClientRect();
  const offsetX = rect ? rect.left + rect.width / 2 : 0;
  const offsetY = rect ? rect.top + rect.height / 2 : 0;

  const relMouseX = mouse.x - offsetX + centerX;
  const relMouseY = mouse.y - offsetY + centerY;

  return (
    <div
      ref={containerRef}
      className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_30px_rgba(92,139,201,0.3)]"
        aria-hidden
      >
        <defs>
          <radialGradient id="irisGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#8fb4e0" />
            <stop offset="40%" stopColor="#5c8bc9" />
            <stop offset="75%" stopColor="#2d5a9e" />
            <stop offset="100%" stopColor="#1a3a6e" />
          </radialGradient>
          <linearGradient id="scleraGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8faff" />
            <stop offset="100%" stopColor="#e4eaf4" />
          </linearGradient>
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <SingleEye
          cx={leftEyeX}
          cy={centerY}
          mouseX={relMouseX}
          mouseY={relMouseY}
          blinking={blinking}
        />
        <SingleEye
          cx={rightEyeX}
          cy={centerY}
          mouseX={relMouseX}
          mouseY={relMouseY}
          blinking={blinking}
        />
      </svg>
    </div>
  );
}
