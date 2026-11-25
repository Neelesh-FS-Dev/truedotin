import { MEDIA } from '../content/media.generated';
import type { Campaign, Category } from '../content/campaigns';

export const FILTERS = ['All', 'Creators', 'Hospitality', 'Events', 'Lifestyle', 'Destinations'] as const;
export type Filter = (typeof FILTERS)[number];

export function isFilter(value: string | null): value is Filter {
  return value !== null && (FILTERS as readonly string[]).includes(value);
}

export function containsVideo(c: Campaign): boolean {
  return c.media.some((id) => MEDIA[id].kind === 'video');
}

export function filterCampaigns(list: readonly Campaign[], filter: Filter, reelsOnly: boolean): Campaign[] {
  return list.filter((c) => (filter === 'All' || c.category === (filter as Category)) && (!reelsOnly || containsVideo(c)));
}
