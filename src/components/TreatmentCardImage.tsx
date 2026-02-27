"use client";

import { useState } from "react";

/**
 * Native img with fallback so CDN URLs (including paths with spaces, e.g.
 * Treatment%20Images/EDOF%20(...)/1.webp) load directly in the browser instead
 * of going through Next/Image, fixing thumbnails on the treatments list page.
 */
export default function TreatmentCardImage({
  src,
  fallbackSrc,
}: {
  src: string;
  fallbackSrc: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={currentSrc}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      loading="lazy"
      decoding="async"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}
