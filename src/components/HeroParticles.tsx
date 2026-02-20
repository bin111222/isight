"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const PARTICLE_COUNT = 42;
const CURSOR_RADIUS = 220;
const CURSOR_STRENGTH = 0.9;
const DAMPING = 0.91;
const CENTER_ATTRACT = 0.0018;
const MIN_RADIUS = 64;
const MAX_RADIUS = 160;
const CONNECT_THRESHOLD = 280;
const LINE_OPACITY = 0.07;
const DRIFT = 0.015;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  hue: number; // 0 = blue, 1 = white
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1e6, y: -1e6 });
  const [ready, setReady] = useState(false);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: lerp(MIN_RADIUS, MAX_RADIUS, Math.random() ** 1.2),
        opacity: lerp(0.06, 0.18, Math.random()),
        hue: Math.random() * 0.4,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationId: number;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const rect = canvas.getBoundingClientRect();
      const newW = Math.round(rect.width * dpr);
      const newH = Math.round(rect.height * dpr);
      if (newW !== w || newH !== h) {
        w = newW;
        h = newH;
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        if (particlesRef.current.length === 0) {
          particlesRef.current = initParticles(rect.width, rect.height);
        }
        setReady(true);
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1e6, y: -1e6 };
    };

    setSize();
    window.addEventListener("resize", setSize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, cw, ch);

      // Connection lines (subtle mesh)
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const d = dist(p1.x, p1.y, p2.x, p2.y);
          if (d < CONNECT_THRESHOLD) {
            const alpha = (1 - d / CONNECT_THRESHOLD) * LINE_OPACITY;
            ctx.strokeStyle = `rgba(92, 139, 201, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Particles (big soft orbs)
      for (const p of particles) {
        const centerX = cw / 2;
        const centerY = ch / 2;

        // Cursor repulsion — push away from mouse so they flow around it and don't cover eyes
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < CURSOR_RADIUS + p.r && d > 1) {
          const force = (1 - d / (CURSOR_RADIUS + p.r)) * CURSOR_STRENGTH;
          const nx = dx / d;
          const ny = dy / d;
          p.vx += nx * force * 2.2;
          p.vy += ny * force * 2.2;
        }

        // Gentle pull toward center (keeps field balanced)
        p.vx += (centerX - p.x) * CENTER_ATTRACT;
        p.vy += (centerY - p.y) * CENTER_ATTRACT;

        // Subtle organic drift (noise-like)
        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounds
        const margin = p.r + 20;
        if (p.x < -margin) p.x = cw + margin;
        if (p.x > cw + margin) p.x = -margin;
        if (p.y < -margin) p.y = ch + margin;
        if (p.y > ch + margin) p.y = -margin;
      }

      // Draw particles on top of lines (big soft glows)
      for (const p of particles) {
        const r = p.r;
        const blue = Math.round(lerp(92, 255, p.hue));
        const green = Math.round(lerp(139, 255, p.hue));
        const red = Math.round(lerp(201, 255, p.hue));

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, r
        );
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${p.opacity * 0.9})`);
        gradient.addColorStop(0.4, `rgba(${red}, ${green}, ${blue}, ${p.opacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${red}, ${green}, ${blue}, ${p.opacity * 0.12})`);
        gradient.addColorStop(1, "rgba(92, 139, 201, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden
      style={{ zIndex: 0 }}
    />
  );
}
