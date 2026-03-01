"use client";

import { useState } from "react";

const FALLBACK = "/hero.webp";

/**
 * Native img with onError fallback. Use instead of Next/Image on the doctor page
 * so CDN and same-origin images load directly and fallback works reliably.
 */
export default function DoctorPageImage({
  src,
  fallbackSrc = FALLBACK,
  alt = "",
  className,
  fill,
  width,
  height,
  sizes,
  loading = "lazy",
  fetchPriority,
}: {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const fillClass = fill ? "absolute inset-0 h-full w-full object-cover" : "";
  const combinedClass = [className, fillClass].filter(Boolean).join(" ").trim() || undefined;

  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={currentSrc}
      alt={alt}
      className={combinedClass}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );

  if (fill) {
    return <span className="absolute inset-0 block">{img}</span>;
  }

  return img;
}
