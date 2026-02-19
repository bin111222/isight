import { getImageUrl } from "@/lib/imageUrl";

/**
 * Image paths for clinic, gallery, awards, and news (media) assets.
 * All files from public/clinic, public/gallery, public/awards, public/news.
 */

const CLINIC_FILES = [
  "DSC04995.webp", "DSC04997.webp", "DSC04998.webp", "DSC05004.webp", "DSC05006.webp",
  "DSC05035.webp", "DSC05102.webp", "DSC05109.webp", "DSC05185.webp", "DSC05211.webp",
  "DSC05220.webp", "DSC05221.webp", "DSC05223.webp", "DSC05229.webp", "DSC05237.webp",
  "DSC05258.webp", "DSC05260.webp", "DSC05273.webp", "DSC05277.webp", "DSC05289.webp",
  "DSC05314.webp", "DSC05325.webp", "DSC05345.webp", "DSC05353.webp", "DSC05382.webp",
  "DSC05397.webp", "DSC05428.webp", "DSC05437.webp", "DSC05443.webp", "DSC05447.webp",
  "DSC05448.webp", "DSC05464.webp", "DSC05485.webp", "DSC05490.webp", "DSC05638.webp",
  "DSC05642.webp", "DSC05644.webp", "DSC05645.webp", "DSC05647.webp", "DSC05653.webp",
] as const;

const GALLERY_FILES = [
  { src: "/gallery/ot.webp", alt: "Dr. Nikhil Nasta in the operating theatre, iSight Eye Care" },
  { src: "/gallery/portrait.webp", alt: "Professional portrait of Dr. Nikhil Nasta" },
  { src: "/gallery/tedx.webp", alt: "Dr. Nikhil Nasta at TEDx" },
] as const;

const AWARDS_FILES = [
  "awards1.webp", "awards2.webp", "awards3.webp", "awards4.webp", "awards5.webp",
  "awards6.webp", "awards7.webp", "awards8.webp", "awards9.webp", "awards10.webp",
  "awards11.webp", "awards12.webp",
] as const;

const NEWS_FILES = [
  "articles1.webp", "articles2.webp", "articles3.webp", "articles4.webp", "articles5.webp",
  "articles6.webp", "articles7.webp", "articles8.webp", "articles9.webp", "articles10.webp",
  "articles11.webp", "articles12.webp", "articles13.webp", "articles14.webp", "articles15.webp",
  "articles16.webp", "articles17.webp", "articles18.webp", "articles19.webp", "articles20.webp",
  "articles21.webp", "articles22.webp", "articles23.webp", "articles24.webp", "articles25.webp",
  "articles26.webp", "articles27.webp", "articles28.webp", "articles29.webp",
] as const;

export const CLINIC_IMAGES = CLINIC_FILES.map((f) => getImageUrl(`/clinic/${f}`));
export const GALLERY_IMAGES = GALLERY_FILES.map(({ src, alt }) => ({ src: getImageUrl(src), alt }));
export const AWARDS_IMAGES = AWARDS_FILES.map((f) => getImageUrl(`/awards/${f}`));
export const NEWS_IMAGES = NEWS_FILES.map((f) => getImageUrl(`/news/${f}`));
