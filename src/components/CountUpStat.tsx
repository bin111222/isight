"use client";

import {
  CalendarClock,
  Activity,
  Award,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
} | {
  value: "NABH";
  label: string;
  icon: LucideIcon;
};

const STATS: Stat[] = [
  {
    value: 20,
    suffix: "+",
    label: "Years experience",
    icon: CalendarClock,
  },
  {
    value: 20000,
    suffix: "+",
    label: "Procedures performed",
    icon: Activity,
  },
  { value: "NABH", label: "Accredited", icon: Award },
  { value: 2, suffix: "", label: "Centres in Mumbai", icon: MapPin },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  if (stat.value === "NABH") {
    return (
      <span
        ref={ref}
        className={`stat-value font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"} group-hover:text-clinical-400`}
      >
        NABH
      </span>
    );
  }

  const end = stat.value as number;
  const suffix = (stat as { suffix: string }).suffix ?? "";
  const display = useCountUp(end, { duration: 2000, inView, suffix });
  return (
    <span
      ref={ref}
      className="stat-value font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white transition-colors duration-300 group-hover:text-clinical-400"
    >
      {display}
    </span>
  );
}

export default function CountUpStat() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-8 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:shadow-[0_0_24px_-4px_rgba(92,139,201,0.15)]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-clinical-400/90 transition-colors duration-300 group-hover:bg-clinical-400/20 group-hover:text-clinical-400">
              <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
            </div>
            <p className="min-h-[1.25em] flex items-center justify-center">
              <AnimatedNumber stat={stat} />
            </p>
            <p className="mt-2 text-sm font-medium text-white/60 transition-colors duration-300 group-hover:text-white/85">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
