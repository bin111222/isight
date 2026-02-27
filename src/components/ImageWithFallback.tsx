"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & { fallbackSrc: string };

/**
 * Next/Image that switches to fallbackSrc when the primary image fails to load (e.g. 404 on CDN).
 * Use for treatment cards and any CDN image that might be missing.
 */
export default function ImageWithFallback({ src, fallbackSrc, alt, ...rest }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={alt}
      onError={handleError}
      {...rest}
    />
  );
}
