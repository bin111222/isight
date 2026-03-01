"use client";

import { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";

const DEFAULT_FALLBACK = getImageUrl("/hero.webp");

type BaseProps = {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type FillProps = BaseProps & { fill: true; width?: never; height?: never };
type SizeProps = BaseProps & { width: number; height: number; fill?: false };

export type ImageWithFallbackProps = FillProps | SizeProps;

/** Renders Next Image with fallback when primary src fails (e.g. CDN 404). */
export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, fallbackSrc = DEFAULT_FALLBACK, alt = "", className, sizes, priority } = props;
  const [currentSrc, setCurrentSrc] = useState(src);
  const useFallback = currentSrc === fallbackSrc;

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
      onError={handleError}
    />
  );
}
