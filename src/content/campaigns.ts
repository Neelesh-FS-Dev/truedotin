import type { MediaId } from './media.generated';

// Campaign archive. Titles and descriptions describe what is visible in the media.
// No client, outcome, reach or campaign result is implied. Media is third-party-rights pending.
export type Category = 'Creators' | 'Hospitality' | 'Events' | 'Lifestyle' | 'Destinations';

export interface Campaign {
  slug: string;
  title: string;
  category: Category;
  date: string;
  description: string;
  media: MediaId[];
}

const range = (from: number, to: number): MediaId[] =>
  Array.from({ length: to - from + 1 }, (_, i) => `a${String(from + i).padStart(3, '0')}` as MediaId);

export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'premiere-night-pune',
    title: 'Film promotion event, Pune',
    category: 'Events',
    date: 'August 2025',
    description: 'Public event coverage from a film promotion in Pune: a branded backdrop, guest arrivals and audience moments.',
    media: [...range(2, 6), 'a001'],
  },
  {
    slug: 'moodboard-sessions',
    title: 'Creator mood-board sessions',
    category: 'Creators',
    date: 'January 2026',
    description: 'Creators build mood boards around café tables in a group format. Shown here as the full contact sheet of one session.',
    media: range(7, 21),
  },
  {
    slug: 'tasting-table-may',
    title: 'Restaurant tasting, May',
    category: 'Hospitality',
    date: 'May 2026',
    description: 'Venue portraits and a live food-preparation reel from a restaurant visit.',
    media: ['a022', 'a023', 'a024', 'a025'],
  },
  {
    slug: 'table-visits-may',
    title: 'Small-group café visits',
    category: 'Creators',
    date: 'May 2026',
    description: 'Small groups at a Pune café and bar: candid collages and table moments.',
    media: range(26, 33),
  },
  {
    slug: 'dinner-stories-may',
    title: 'Dinner stories',
    category: 'Lifestyle',
    date: 'May 2026',
    description: 'Styled dinner stills with overlay copy, shot across a single evening.',
    media: range(34, 44),
  },
  {
    slug: 'evening-guests-june-1',
    title: 'Evening guests, June (I)',
    category: 'Events',
    date: 'June 2026',
    description: 'Guest candids from an evening in Pune, framed as paired portraits and small groups.',
    media: range(45, 53),
  },
  {
    slug: 'evening-guests-june-2',
    title: 'Evening guests, June (II)',
    category: 'Events',
    date: 'June 2026',
    description: 'Guest candids and group portraits from a second evening in June.',
    media: range(54, 63),
  },
  {
    slug: 'evening-guests-june-3',
    title: 'Proof that good times happened',
    category: 'Events',
    date: 'June 2026',
    description: 'Guest candids from a June evening, edited into collage frames with overlay copy.',
    media: [...range(64, 72)],
  },
  {
    slug: 'dancefloor-reels-june',
    title: 'Dance-floor reels',
    category: 'Events',
    date: 'June 2026',
    description: 'Vertical reels of a crowd and a dance floor during an evening event.',
    media: ['a075', 'a076'],
  },
  {
    slug: 'staycation-reels',
    title: 'Staycation and destination reels',
    category: 'Destinations',
    date: 'July to August 2026',
    description: 'Short vertical reels from day trips and staycations around Pune, including on-screen captions and dining stops.',
    media: ['a077', 'a078', 'a079', 'a081', 'a082'],
  },
  {
    slug: 'themed-restaurant-reels',
    title: 'Themed restaurant reels',
    category: 'Hospitality',
    date: 'September 2026',
    description: 'Vertical reels of a themed restaurant and café interiors in Pune, with on-screen captions.',
    media: range(83, 87),
  },
  {
    slug: 'creator-portraits-themed-restaurant',
    title: 'Creator portraits at a themed restaurant',
    category: 'Creators',
    date: 'September 2026',
    description: 'A portrait set shot in the interiors of a themed restaurant, with a food detail to close the sequence.',
    media: range(88, 93),
  },
  {
    slug: 'venue-reels-october',
    title: 'Venue reels, October',
    category: 'Hospitality',
    date: 'October 2026',
    description: 'Café and restaurant reels across October: glasshouse dining rooms, outdoor terraces and themed interiors.',
    media: ['a094', 'a095', 'a096', 'a097', 'a099'],
  },
  {
    slug: 'kesariya-event',
    title: 'Event promotion: Kesariya, October',
    category: 'Events',
    date: 'October 2026',
    description: 'Event promotion poster and a promotional reel for a Pune evening event. Third-party promotional material.',
    media: ['a098', 'a100'],
  },
  {
    slug: 'glasshouse-pizza-october',
    title: 'Glasshouse café and pizza',
    category: 'Hospitality',
    date: 'October 2026',
    description: 'A glasshouse café interior and a pizza reel, shot as a short hospitality sequence.',
    media: ['a102', 'a103', 'a107'],
  },
  {
    slug: 'audience-footage-october',
    title: 'Audience footage, October',
    category: 'Events',
    date: 'October 2026',
    description: 'Crowd footage from a public event in Pune, used as a full-width audience frame.',
    media: ['a104'],
  },
  {
    slug: 'creator-voice-november',
    title: 'Creator voice reels',
    category: 'Creators',
    date: 'November 2026',
    description: 'Creator-to-camera reels with spoken captions, shot in a café and at a Pune venue.',
    media: ['a105', 'a108'],
  },
  {
    slug: 'festive-party-november',
    title: 'Festive party reel',
    category: 'Events',
    date: 'November 2026',
    description: 'A festive-season party reel with neon graphics, recorded at a Pune venue.',
    media: ['a106'],
  },
  {
    slug: 'event-announcement-december',
    title: 'Event announcement, 12 December',
    category: 'Events',
    date: 'Announced November 2026',
    description: 'Promotional poster for a public appearance in Pune on a listed date in December. An upcoming event, not a completed one.',
    media: ['a110'],
  },
];

export const CAMPAIGN_BY_SLUG = new Map(CAMPAIGNS.map((c) => [c.slug, c] as const));
