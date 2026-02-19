"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

type NewsBrickGalleryProps = {
  images: readonly string[];
  altPrefix: string;
  columns?: string;
};

export default function NewsBrickGallery({
  images,
  altPrefix,
  columns = "columns-2 sm:columns-3 md:columns-4 lg:columns-5",
}: NewsBrickGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setSelected(null);
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_ZOOM, s + ZOOM_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(MIN_ZOOM, s - ZOOM_STEP);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    },
    [zoomIn, zoomOut]
  );

  // Prevent wheel from scrolling page when over modal (passive: false)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !selected) return;
    const fn = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [selected, zoomIn, zoomOut]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }, [scale, pan.x, pan.y]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || scale <= 1) return;
      setPan({
        x: dragStart.current.panX + e.clientX - dragStart.current.x,
        y: dragStart.current.panY + e.clientY - dragStart.current.y,
      });
    },
    [isDragging, scale]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div className={`${columns} gap-3 sm:gap-4`}>
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group block w-full break-inside-avoid mb-3 sm:mb-4 rounded-xl overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_2px_12px_-4px_rgba(10,15,26,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(10,15,26,0.15)] hover:ring-clinical-200/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2 text-left"
          >
            <span className="block w-full overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="View article"
        >
          <div
            className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div
            ref={containerRef}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-navy-900 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom controls */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1.5 rounded-xl bg-navy-950/80 border border-white/10 shadow-lg">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN_ZOOM}
                className="p-2 rounded-lg text-white hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="min-w-[3rem] text-center text-sm font-medium text-white tabular-nums">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX_ZOOM}
                className="p-2 rounded-lg text-white hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <div className="w-px h-5 bg-white/20 mx-0.5" />
              <button
                type="button"
                onClick={resetZoom}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Image area — pannable when zoomed */}
            <div
              className="flex-1 flex items-center justify-center min-h-[280px] overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              style={{ cursor: scale > 1 && isDragging ? "grabbing" : scale > 1 ? "grab" : "default" }}
            >
              <div
                className="transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                }}
              >
                <img
                  src={selected}
                  alt={altPrefix}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain pointer-events-none"
                  draggable={false}
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </>
  );
}
