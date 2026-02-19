"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

type Stat = {
  value: number;
  suffix: string;
  label: string;
} | {
  value: "NABH";
  label: string;
};

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 20000, suffix: "+", label: "Procedures performed" },
  { value: "NABH", label: "Accredited" },
  { value: 2, suffix: "", label: "Centres in Mumbai" },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  if (stat.value === "NABH") {
    return (
      <span
        ref={ref}
        className={`stat-value text-3xl sm:text-4xl lg:text-5xl transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
      >
        NABH
      </span>
    );
  }

  const end = stat.value as number;
  const suffix = (stat as { suffix: string }).suffix ?? "";
  const display = useCountUp(end, { duration: 2000, inView, suffix });
  return (
    <span ref={ref} className="stat-value text-3xl sm:text-4xl lg:text-5xl">
      {display}
    </span>
  );
}

export default function CountUpStat() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center group">
          <p className="min-h-[1.2em]">
            <AnimatedNumber stat={stat} />
          </p>
          <p className="mt-2 text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
