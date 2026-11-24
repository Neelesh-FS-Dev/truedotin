// Central registry of exported media. IDs match public/media (see docs/ASSET_INVENTORY.md).
import sizes from "./media.generated.json";

export type Photo = {
  id: string;
  kind: "photo" | "poster";
  alt: string;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  avifSrcSet: string;
  avifSrc: string;
};

export type Clip = {
  id: string;
  src: string;
  poster: string;
  alt: string;
};

const base = "/media";
const sizeMap = sizes as Record<string, { width: number; height: number }>;

const photoAlt: Record<string, string> = {
  event: "Guests and creators posing at an evening event with a branded backdrop.",
  creator: "Creators at a restaurant table during a collage session, with mood boards and printed photographs.",
  evening: "Guests at a restaurant table in warm evening light, sharing a meal and photographs.",
  portrait: "Portrait of a creator in a courtyard setting with blue patterned tiles and a mural.",
  poster: "Event poster for a live appearance, with artwork and event details.",
};

function categoryFor(n: number) {
  if (n <= 5) return "event";
  if (n <= 20) return "creator";
  if (n <= 40) return "evening";
  if (n <= 46) return "portrait";
  return "poster";
}

function makePhoto(n: number): Photo {
  const id = `p${String(n).padStart(2, "0")}`;
  const size = sizeMap[id] ?? { width: 1280, height: 1600 };
  const category = categoryFor(n);
  return {
    id,
    kind: category === "poster" ? "poster" : "photo",
    alt: `${photoAlt[category]} (image ${n})`,
    width: size.width,
    height: size.height,
    src: `${base}/photos/${id}-1280.jpg`,
    srcSet: `${base}/photos/${id}-640.jpg 640w, ${base}/photos/${id}-1280.jpg 1280w`,
    avifSrc: `${base}/photos/${id}-1280.avif`,
    avifSrcSet: `${base}/photos/${id}-640.avif 640w, ${base}/photos/${id}-1280.avif 1280w`,
  };
}

// All 48 source photos are exported. Rights status is recorded per collection in work.ts.
const photos = Array.from({ length: 48 }, (_, i) => makePhoto(i + 1));
const photoById = new Map(photos.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const p = photoById.get(id);
  if (!p) throw new Error(`Unknown photo ${id}`);
  return p;
}

export function photosIn(from: number, to: number): Photo[] {
  return photos.filter((p) => {
    const n = Number(p.id.slice(1));
    return n >= from && n <= to;
  });
}

const clipAlt: Record<string, string> = {
  venue: "Short vertical film of food, drinks and interiors at a restaurant or café.",
  nightlife: "Vertical film of a night-time party with crowds and coloured lights.",
  creator: "Creator speaking to camera in a warm interior.",
  event: "Event footage: a crowd and performance under stage lights.",
  showroom: "Brand showroom footage: a car on display with a close view of its grille and badge.",
};

export function clip(id: string, kind: keyof typeof clipAlt = "venue"): Clip {
  return {
    id,
    src: `${base}/video/${id}.mp4`,
    poster: `${base}/video/${id}-poster.jpg`,
    alt: clipAlt[kind],
  };
}

export const heroReel = {
  src: `${base}/video/hero-reel.mp4`,
  mobileSrc: `${base}/video/hero-reel-mobile.mp4`,
  poster: `${base}/video/hero-poster.jpg`,
};

const venueIds = ["v02","v03","v04","v05","v06","v07","v08","v09","v10","v11","v12","v13","v14","v15","v16","v21","v22"];
export const venueClips = venueIds.map((id) => clip(id, "venue"));
export const nightlifeClips = [clip("v01", "nightlife"), clip("v20", "nightlife")];
export const creatorClip = clip("v19", "creator");
