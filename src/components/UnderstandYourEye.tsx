"use client";

import Image from "next/image";
import { useState } from "react";
import { getEyePartImage, getEyeDiagramBase } from "@/lib/eyeDiagramImages";

export type EyePart = {
  id: string;
  name: string;
  cx: number;
  cy: number;
  r: number;
  what: string;
  conditions: string;
  care: string;
  path?: string;
};

const EYE_PARTS_DATA: EyePart[] = [
  {
    id: "cornea",
    name: "Cornea",
    cx: 50,
    cy: 42,
    r: 12,
    what: "The cornea is the clear, dome-shaped front surface of your eye. It acts like a window, bending light as it enters and helping your eye focus.",
    conditions: "Infections, keratoconus (thinning and bulging), dystrophies, and injuries can affect the cornea.",
    care: "Treatments range from medicated drops and cross-linking to corneal transplant (DMEK, DSAEK) when needed. We use precise microsurgical techniques to restore clarity.",
  },
  {
    id: "lens",
    name: "Lens",
    cx: 50,
    cy: 50,
    r: 10,
    what: "The lens sits behind the iris and works with the cornea to focus light onto the retina. It can change shape to help you focus on near and far objects.",
    conditions: "Cataract—clouding of the lens with age—is the most common condition. It can cause blurry vision, glare, and difficulty with night driving.",
    care: "Cataract surgery removes the cloudy lens and replaces it with a clear artificial lens (IOL). We offer no-patch, no-stitch, no-injection surgery with premium lens options including multifocal and toric IOLs.",
  },
  {
    id: "retina",
    name: "Retina",
    cx: 50,
    cy: 72,
    r: 14,
    what: "The retina is the light-sensitive layer at the back of the eye. It converts light into signals that travel through the optic nerve to your brain, where they become the images you see.",
    conditions: "Diabetic retinopathy, retinal detachment, age-related macular degeneration (ARMD), and macular holes can threaten central or peripheral vision.",
    care: "We offer laser treatment, intravitreal injections for ARMD and diabetic macular edema, and advanced retinal surgery using our Turbovit system to repair detachments and other conditions.",
  },
  {
    id: "optic-nerve",
    name: "Optic nerve",
    cx: 50,
    cy: 88,
    r: 8,
    what: "The optic nerve carries visual signals from the retina to the brain. It is often described as the cable that connects the eye to the brain.",
    conditions: "Glaucoma—damage to the optic nerve, often linked to high eye pressure—is a leading cause of irreversible vision loss. It can progress with few symptoms until later stages.",
    care: "We manage glaucoma with regular monitoring, prescription eye drops, laser procedures (e.g. SLT), and surgery when needed. Early detection and treatment help protect your vision.",
  },
];

export default function UnderstandYourEye() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const selectedData = selectedPart ? EYE_PARTS_DATA.find((p) => p.id === selectedPart) : null;
  const baseImage = getEyeDiagramBase();
  const hasBaseImage = Boolean(baseImage);

  return (
    <section className="bg-navy-900 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-clinical-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-center">
          Understand Your Eye
        </h2>
        <p className="mt-3 text-white/70 text-center max-w-xl mx-auto">
          {hasBaseImage
            ? "Choose a part to learn what it does, what can go wrong, and how we help."
            : "Click or hover a part of the eye to learn what it does, what can go wrong, and how we help."}
        </p>

        {/* Pills: choose part first, above the panels */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {EYE_PARTS_DATA.map((part) => {
            const isSelected = selectedPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => setSelectedPart(isSelected ? null : part.id)}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-clinical-500 text-white border-2 border-clinical-400 shadow-[0_0_24px_rgba(92,139,201,0.35)]"
                    : "bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:border-white/20"
                }`}
              >
                {part.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
          {/* Diagram card: strict 3:2, image fills entire box */}
          <div className="relative w-full max-w-[420px] lg:w-[420px] aspect-[3/2] flex-shrink-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl understand-eye-card">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-clinical-500/5 to-transparent pointer-events-none z-[1]" />
            {hasBaseImage ? (
              <Image
                src={baseImage}
                alt="Cross-section of the human eye"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-w-[280px] text-clinical-400/90 relative z-10"
                aria-hidden
              >
                <defs>
                  <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(92,139,201,0.5)" />
                    <stop offset="100%" stopColor="rgba(45,90,158,0.7)" />
                  </linearGradient>
                  <filter id="eyePartGlowStrong" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="rgba(92,139,201,0.5)" floodOpacity="1" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="url(#eyeGrad)" strokeWidth="1.8" className="opacity-70" />
                {EYE_PARTS_DATA.map((part) => {
                  const isSelected = selectedPart === part.id;
                  return (
                    <g
                      key={part.id}
                      onMouseEnter={() => setSelectedPart(part.id)}
                      onMouseLeave={() => setSelectedPart(null)}
                      onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                      className="cursor-pointer outline-none"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPart(selectedPart === part.id ? null : part.id);
                        }
                      }}
                      role="button"
                      aria-pressed={isSelected}
                      aria-label={`Learn about ${part.name}`}
                    >
                      {part.path ? (
                        <path d={part.path} fill="currentColor" className={`eye-part transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-40"} ${isSelected ? "[filter:url(#eyePartGlowStrong)]" : ""}`} />
                      ) : (
                        <circle cx={part.cx} cy={part.cy} r={part.r} fill="currentColor" className={`eye-part transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-40"} ${isSelected ? "[filter:url(#eyePartGlowStrong)]" : ""}`} />
                      )}
                      <title>{part.name}</title>
                    </g>
                  );
                })}
              </svg>
              </div>
            )}
          </div>

          {/* Info panel: same height as left (items-stretch), content fills box; lower 2 paras use remaining space */}
          <div className="flex-1 w-full min-w-0 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col min-h-0 understand-eye-panel">
            {selectedData ? (
              <div key={selectedData.id} className="animate-fade-in flex flex-col h-full min-h-0">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start flex-shrink-0">
                  {getEyePartImage(selectedData.id) ? (
                    <div className="relative w-full max-w-[280px] lg:w-[280px] lg:min-w-[280px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[3/2]">
                      <Image
                        src={getEyePartImage(selectedData.id)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 280px"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0 flex-shrink-0">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {selectedData.name}
                    </h3>
                    <p className="mt-2 text-white/90 leading-relaxed text-sm sm:text-base">
                      {selectedData.what}
                    </p>
                  </div>
                </div>
                {/* Lower 2 paragraphs fill the remaining height */}
                <div className="mt-4 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 content-start overflow-y-auto">
                  <div className="pl-4 border-l-2 border-clinical-400/50">
                    <p className="text-xs font-semibold text-clinical-300 uppercase tracking-wider">
                      Common conditions
                    </p>
                    <p className="mt-1.5 text-white/85 leading-relaxed text-sm sm:text-base">
                      {selectedData.conditions}
                    </p>
                  </div>
                  <div className="pl-4 border-l-2 border-clinical-400/50">
                    <p className="text-xs font-semibold text-clinical-300 uppercase tracking-wider">
                      How we help
                    </p>
                    <p className="mt-1.5 text-white/85 leading-relaxed text-sm sm:text-base">
                      {selectedData.care}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50 py-8 flex-1 flex items-center justify-center">
                <div>
                  <p className="text-lg">
                    {hasBaseImage ? "Choose a part above to read about it." : "Select a part of the eye to read about it."}
                  </p>
                  {!hasBaseImage && <p className="mt-2 text-sm">Click or hover each region in the diagram.</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
