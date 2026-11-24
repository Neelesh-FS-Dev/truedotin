// Content collections, not client campaigns. No brand, client or outcome is claimed here.
// status "draft" entries are kept out of the public site until names, roles and permissions are verified.
import { photosIn, venueClips, nightlifeClips, creatorClip, type Clip, type Photo } from "./media";

export type Collection = {
  slug: string;
  title: string;
  category: "Creator sessions" | "Hospitality" | "Portraits" | "Reels";
  summary: string;
  cover: { kind: "photo"; photo: Photo } | { kind: "video"; clip: Clip };
  photos: Photo[];
  clips: Clip[];
  status: "published" | "draft";
  period: string;
};

const sessionPhotos = photosIn(6, 20);
const eveningPhotos = photosIn(21, 40);
const portraitPhotos = photosIn(41, 46);

export const collections: Collection[] = [
  {
    slug: "creator-sessions",
    title: "Creator sessions",
    category: "Creator sessions",
    summary: "Collage sessions and long-table conversations with creators, photographed as they happened. The people shown are not represented by True.in.",
    cover: { kind: "photo", photo: sessionPhotos[0] },
    photos: sessionPhotos,
    clips: [],
    status: "published",
    period: "2025 — 2026",
  },
  {
    slug: "evenings-out",
    title: "Evenings out",
    category: "Hospitality",
    summary: "Restaurant and bar evenings with creators, from the @truedotin feed. Candid frames, warm light and the details of a night out.",
    cover: { kind: "photo", photo: eveningPhotos[1] },
    photos: eveningPhotos,
    clips: [],
    status: "published",
    period: "2026",
  },
  {
    slug: "portrait-sessions",
    title: "Portrait sessions",
    category: "Portraits",
    summary: "Portrait sessions set in a courtyard with patterned tiles and a painted mural. Simple framing, natural posing.",
    cover: { kind: "photo", photo: portraitPhotos[0] },
    photos: portraitPhotos,
    clips: [],
    status: "published",
    period: "2026",
  },
  {
    slug: "venue-reels",
    title: "Venue reels",
    category: "Reels",
    summary: "Short vertical films for restaurants, cafés and bars: food, drinks, interiors and the mood of each room. Venue names appear in on-screen text in some clips.",
    cover: { kind: "video", clip: venueClips[0] },
    photos: [],
    clips: venueClips,
    status: "published",
    period: "2025 — 2026",
  },
  {
    slug: "nightlife-reels",
    title: "Nightlife & creator reels",
    category: "Reels",
    summary: "Party and night-out reels, plus a creator speaking to camera. Built for vertical feeds and muted playback.",
    cover: { kind: "video", clip: nightlifeClips[0] },
    photos: [],
    clips: [...nightlifeClips, creatorClip],
    status: "published",
    period: "2025 — 2026",
  },
];

export const publishedCollections = collections.filter((c) => c.status === "published");

export function collectionBySlug(slug: string): Collection | undefined {
  return publishedCollections.find((c) => c.slug === slug);
}
