"use client";

import { useEffect, useState } from "react";
import { getBlogImageUrl } from "@/lib/blogImageUrl";

const LOCAL_FALLBACK = "/hero.webp";

/**
 * Blog listing card image: tries ImageKit `blog/{imageSlug or postSlug}.webp`,
 * then a local hero if the CDN asset is missing (common for new posts).
 */
export default function BlogPostCardThumbnail({
  postSlug,
  imageSlug,
  alt,
  readingMin,
}: {
  postSlug: string;
  imageSlug?: string;
  alt: string;
  readingMin: number;
}) {
  const cdnKey = imageSlug?.trim() || postSlug;
  const primary = getBlogImageUrl(cdnKey);
  const [src, setSrc] = useState(primary);

  useEffect(() => {
    setSrc(getBlogImageUrl(imageSlug?.trim() || postSlug));
  }, [postSlug, imageSlug]);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => {
          setSrc((prev) => (prev === LOCAL_FALLBACK ? prev : LOCAL_FALLBACK));
        }}
      />
      <div className="absolute bottom-2 right-2 rounded bg-navy-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        {readingMin} min read
      </div>
    </div>
  );
}
