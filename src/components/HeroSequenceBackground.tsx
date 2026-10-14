"use client";

import { useEffect, useRef, type RefObject } from "react";
import { getImageUrl } from "@/lib/imageUrl";

const SCROLL_FRAMES = 120;
const PRELOAD_RADIUS = 12;
const MAX_CONCURRENT = 3;
/** Backing store cap. CSS stretches this to the viewport, which is much cheaper than a 2x retina canvas. */
const MAX_CANVAS_WIDTH = 1280;

const SEQUENCE_URLS = Array.from({ length: SCROLL_FRAMES }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return getImageUrl(`/homesequence2/ezgif-frame-${frame}.jpg`);
});

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return false;

  const scale = Math.max(width / iw, height / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
  return true;
}

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export default function HeroSequenceBackground({ sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const frames: (HTMLImageElement | undefined)[] = new Array(SCROLL_FRAMES);
    const loaded = new Set<number>();
    const inflight = new Map<number, HTMLImageElement>();
    let wantedOrder: number[] = [];
    let ctx: CanvasRenderingContext2D | null = null;
    let bitmapW = 0;
    let bitmapH = 0;
    let docTop = 0;
    let scrollSpan = 1;
    let wantedFrame = 0;
    let drawnFrame = -1;
    let rafId = 0;
    let cancelled = false;
    let canvasVisible = false;
    let fullPreload = false;
    let heroVisible = true;

    const revealCanvas = () => {
      if (canvasVisible) return;
      canvasVisible = true;
      canvas.style.opacity = "1";
      const poster = canvas.previousElementSibling;
      if (poster instanceof HTMLElement) poster.style.visibility = "hidden";
    };

    const ensureCtx = () => {
      if (!ctx) {
        ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "low";
        }
      }
      return ctx;
    };

    const paint = (index: number) => {
      const context = ensureCtx();
      if (!context || !bitmapW || !bitmapH) return;

      const tryDraw = (i: number) => {
        const img = frames[i];
        if (!img || !img.complete || !img.naturalWidth) return false;
        if (!drawCover(context, img, bitmapW, bitmapH)) return false;
        drawnFrame = i;
        if (wantedFrame > 0 || i > 0) revealCanvas();
        return true;
      };

      if (tryDraw(index)) return;
      if (drawnFrame >= 0) return;

      for (let distance = 1; distance < SCROLL_FRAMES; distance += 1) {
        if (index - distance >= 0 && tryDraw(index - distance)) return;
        if (index + distance < SCROLL_FRAMES && tryDraw(index + distance)) return;
      }
    };

    const measure = () => {
      docTop = section.getBoundingClientRect().top + window.scrollY;
      scrollSpan = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    const syncSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const layoutW = parent.clientWidth;
      const layoutH = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const pixelW = Math.max(1, Math.min(MAX_CANVAS_WIDTH, Math.round(layoutW * dpr)));
      const pixelH = Math.max(1, Math.round(layoutH * (pixelW / Math.max(layoutW, 1))));

      const sizeChanged = canvas.width !== pixelW || canvas.height !== pixelH;
      bitmapW = pixelW;
      bitmapH = pixelH;

      if (sizeChanged) {
        canvas.width = pixelW;
        canvas.height = pixelH;
        ctx = null;
        drawnFrame = -1;
      }

      measure();
      paint(wantedFrame);
    };

    const frameFromScroll = () => {
      const progress = Math.min(Math.max((window.scrollY - docTop) / scrollSpan, 0), 1);
      return Math.round(progress * (SCROLL_FRAMES - 1));
    };

    const buildOrder = (center: number, radius: number) => {
      const ordered: number[] = [center];
      const limit = radius < 0 ? SCROLL_FRAMES : radius;
      for (let offset = 1; offset <= limit; offset += 1) {
        if (center + offset < SCROLL_FRAMES) ordered.push(center + offset);
        if (center - offset >= 0) ordered.push(center - offset);
      }
      return ordered;
    };

    const pumpQueue = () => {
      for (const index of wantedOrder) {
        if (inflight.size >= MAX_CONCURRENT) break;
        if (loaded.has(index) || inflight.has(index)) continue;

        const img = new window.Image();
        inflight.set(index, img);
        img.decoding = "async";
        img.src = SEQUENCE_URLS[index];

        const onReady = () => {
          if (cancelled) return;
          inflight.delete(index);
          loaded.add(index);
          frames[index] = img;
          if (index === wantedFrame || drawnFrame < 0) {
            paint(wantedFrame);
          }
          pumpQueue();
        };

        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().then(onReady).catch(onReady);
          } else {
            onReady();
          }
        };
        img.onerror = () => {
          inflight.delete(index);
          if (!cancelled) pumpQueue();
        };

        if (img.complete && img.naturalWidth) onReady();
      }
    };

    const preloadWindow = (center: number) => {
      wantedOrder = buildOrder(center, fullPreload ? -1 : PRELOAD_RADIUS);
      pumpQueue();
    };

    const updateFromScroll = () => {
      if (!heroVisible) return;
      const next = frameFromScroll();
      if (next === wantedFrame && drawnFrame === wantedFrame) return;
      wantedFrame = next;
      preloadWindow(wantedFrame);
      paint(wantedFrame);
    };

    let sequenceArmed = false;

    const armSequence = () => {
      if (sequenceArmed) return;
      sequenceArmed = true;
      preloadWindow(wantedFrame);
      updateFromScroll();
    };

    const onScroll = () => {
      if (!sequenceArmed) {
        if (Math.abs(window.scrollY - docTop) < 8) return;
        armSequence();
      }
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateFromScroll();
      });
    };

    const onResize = () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        syncSize();
        if (sequenceArmed) updateFromScroll();
        else paint(0);
      });
    };

    wantedOrder = buildOrder(0, 0);
    pumpQueue();
    syncSize();
    paint(0);

    const startFullPreload = () => {
      if (cancelled || fullPreload) return;
      fullPreload = true;
      preloadWindow(wantedFrame);
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(startFullPreload, { timeout: 1200 })
        : window.setTimeout(startFullPreload, 400);

    const resizeObserver = new ResizeObserver(onResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry?.isIntersecting ?? true;
        if (heroVisible && sequenceArmed) updateFromScroll();
      },
      { rootMargin: "200px 0px" },
    );
    visibilityObserver.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (typeof idleId === "number" && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sectionRef]);

  return (
    <>
      <img
        src={SEQUENCE_URLS[0]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        aria-hidden
        decoding="async"
        fetchPriority="high"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-0"
        aria-hidden
      />
    </>
  );
}
