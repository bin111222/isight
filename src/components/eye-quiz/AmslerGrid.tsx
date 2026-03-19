"use client";

import { useCallback, useRef, useState } from "react";

type Props = {
  instruction: string;
  question: string;
  onResult: (hasAbnormality: boolean) => void;
};

const GRID_SIZE = 9; // 9x9 grid of cells
const CELL_PX = 28;

export default function AmslerGrid({ instruction, question, onResult }: Props) {
  const [marked, setMarked] = useState<{ x: number; y: number }[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleSvgClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const cellX = Math.floor(x * GRID_SIZE);
      const cellY = Math.floor(y * GRID_SIZE);
      if (cellX >= 0 && cellX < GRID_SIZE && cellY >= 0 && cellY < GRID_SIZE) {
        setMarked((prev) => {
          const key = `${cellX},${cellY}`;
          const exists = prev.some((p) => `${p.x},${p.y}` === key);
          if (exists) return prev.filter((p) => `${p.x},${p.y}` !== key);
          return [...prev, { x: cellX, y: cellY }];
        });
      }
    },
    []
  );

  return (
    <div className="animate-fade-in space-y-6">
      <p className="text-white/80 text-sm leading-relaxed">{instruction}</p>
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-2xl bg-white border border-white/20 p-4 shadow-xl">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
            width={GRID_SIZE * CELL_PX}
            height={GRID_SIZE * CELL_PX}
            className="cursor-crosshair select-none"
            onClick={handleSvgClick}
            aria-label="Amsler grid — tap any area that looks wavy, blurry, or missing"
          >
            <defs>
              <pattern id="amsler-cells" width="1" height="1" patternUnits="userSpaceOnUse">
                {Array.from({ length: GRID_SIZE + 1 }, (_, i) => (
                  <g key={i}>
                    <line
                      x1={i}
                      y1={0}
                      x2={i}
                      y2={GRID_SIZE}
                      stroke="rgba(15,23,41,0.9)"
                      strokeWidth="0.08"
                    />
                    <line
                      x1={0}
                      y1={i}
                      x2={GRID_SIZE}
                      y2={i}
                      stroke="rgba(15,23,41,0.9)"
                      strokeWidth="0.08"
                    />
                  </g>
                ))}
              </pattern>
            </defs>
            <rect width={GRID_SIZE} height={GRID_SIZE} fill="white" />
            <rect width={GRID_SIZE} height={GRID_SIZE} fill="url(#amsler-cells)" />
            <circle cx={GRID_SIZE / 2} cy={GRID_SIZE / 2} r={0.15} fill="#0f1729" />
            {marked.map((p, i) => (
              <circle
                key={i}
                cx={p.x + 0.5}
                cy={p.y + 0.5}
                r={0.35}
                fill="rgba(45,90,158,0.6)"
                stroke="#2d5a9e"
                strokeWidth="0.1"
              />
            ))}
          </svg>
          <p className="mt-3 text-center text-navy-800 text-xs">
            Tap on the grid to mark any area that looks wavy, blurry, or missing.
          </p>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white mb-3">{question}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => onResult(false)}
              className="btn btn-md btn-outline bg-white/5"
            >
              All lines look normal
            </button>
            <button
              type="button"
              onClick={() => onResult(true)}
              className="btn btn-md btn-primary"
            >
              I see a problem (wavy, blur, or missing area)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
