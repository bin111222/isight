"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
/** Same-origin so fallback loads when CDN fails */
const DEFAULT_FALLBACK = "/hero.webp";

type BaseProps = {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

type FillProps = BaseProps & { fill: true; width?: never; height?: never };
type SizeProps = BaseProps & { width: number; height: number; fill?: false };

export type ImageWithFallbackProps = FillProps | SizeProps;

/** Renders Next Image with fallback when primary src fails (e.g. CDN 404). */
export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, fallbackSrc = DEFAULT_FALLBACK, alt = "", className, sizes, priority, unoptimized } = props;
  const [currentSrc, setCurrentSrc] = useState(src);
  const useFallback = currentSrc === fallbackSrc;

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    if (!useFallback) setCurrentSrc(fallbackSrc);
  };

  if (props.fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={props.width}
      height={props.height}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      onError={handleError}
    />
  );
}
