"use client";

import { useCallback, useId } from "react";

type Props = {
  question: string;
  value: number;
  min: number;
  max: number;
  labelLow: string;
  labelHigh: string;
  onChange: (value: number) => void;
};

export default function SliderQuestion({ question, value, min, max, labelLow, labelHigh, onChange }: Props) {
  const id = useId();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl sm:text-2xl font-bold text-white" id={id}>
        {question}
      </h3>
      <div className="px-1">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>{labelLow}</span>
          <span>{labelHigh}</span>
        </div>
        <input
          type="range"
          id={`${id}-slider`}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full h-3 rounded-full appearance-none bg-white/10 accent-clinical-400 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-clinical-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(92,139,201,0.5)] [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-clinical-400 [&::-moz-range-thumb]:border-0"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-labelledby={id}
        />
        <p className="mt-2 text-center text-clinical-300 font-semibold tabular-nums" aria-live="polite">
          {value} / {max}
        </p>
      </div>
    </div>
  );
}
