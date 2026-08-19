"use client";

import { useEffect, useRef, type RefObject } from "react";
import { getImageUrl } from "@/lib/imageUrl";

const SCROLL_FRAMES = 120;
const PRELOAD_RADIUS = 8;
const MAX_CONCURRENT = 3;

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
    let cssW = 0;
    let cssH = 0;
    let wantedFrame = 0;
    let drawnFrame = -1;
    let rafId = 0;
    let cancelled = false;
    let canvasVisible = false;

    const revealCanvas = () => {
      if (canvasVisible) return;
      canvasVisible = true;
      canvas.style.opacity = "1";
    };

    const ensureCtx = () => {
      if (!ctx) {
        ctx = canvas.getContext("2d", { alpha: true });
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
        }
      }
      return ctx;
    };

    const paint = (index: number) => {
      const context = ensureCtx();
      if (!context || !cssW || !cssH) return;

      const tryDraw = (i: number) => {
        const img = frames[i];
        if (!img || !img.complete || !img.naturalWidth) return false;
        if (!drawCover(context, img, cssW, cssH)) return false;
        drawnFrame = i;
        if (wantedFrame > 0 || i > 0) revealCanvas();
        return true;
      };

      if (tryDraw(index)) return;
      // Keep the last drawn pixels — never clear while the next frame is still decoding.
      if (drawnFrame >= 0) return;

      for (let distance = 1; distance < SCROLL_FRAMES; distance += 1) {
        if (index - distance >= 0 && tryDraw(index - distance)) return;
        if (index + distance < SCROLL_FRAMES && tryDraw(index + distance)) return;
      }
    };

    const syncSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const nextW = parent.clientWidth;
      const nextH = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelW = Math.max(1, Math.round(nextW * dpr));
      const pixelH = Math.max(1, Math.round(nextH * dpr));

      const sizeChanged = canvas.width !== pixelW || canvas.height !== pixelH;
      cssW = nextW;
      cssH = nextH;

      if (sizeChanged) {
        canvas.width = pixelW;
        canvas.height = pixelH;
        ctx = null;
        const context = ensureCtx();
        if (context) {
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        drawnFrame = -1;
      }

      paint(wantedFrame);
    };

    const frameFromScroll = () => {
      const scrollDistance = section.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return 0;

      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / scrollDistance, 0), 1);
      return Math.round(progress * (SCROLL_FRAMES - 1));
    };

    const updateFromScroll = () => {
      wantedFrame = frameFromScroll();
      preloadWindow(wantedFrame);
      if (wantedFrame === drawnFrame) return;
      paint(wantedFrame);
    };

    const enqueueWindow = (center: number) => {
      const ordered: number[] = [center];
      for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
        ordered.push(center + offset, center - offset);
      }
      wantedOrder = ordered.filter((frame) => frame >= 0 && frame < SCROLL_FRAMES);
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
      enqueueWindow(center);
      pumpQueue();
    };

    const onScroll = () => {
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
        updateFromScroll();
      });
    };

    preloadWindow(0);
    syncSize();
    updateFromScroll();

    const resizeObserver = new ResizeObserver(onResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
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
