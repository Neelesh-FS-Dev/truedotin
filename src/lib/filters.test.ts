import { describe, expect, it } from 'vitest';
import { CAMPAIGNS } from '../content/campaigns';
import { containsVideo, filterCampaigns, isFilter } from './filters';

describe('filterCampaigns', () => {
  it('returns everything for All and every campaign has a category in the filter list', () => {
    expect(filterCampaigns(CAMPAIGNS, 'All', false)).toHaveLength(CAMPAIGNS.length);
  });

  it('only returns campaigns of the chosen category', () => {
    const creators = filterCampaigns(CAMPAIGNS, 'Creators', false);
    expect(creators.length).toBeGreaterThan(0);
    expect(creators.every((c) => c.category === 'Creators')).toBe(true);
  });

  it('reels-only keeps campaigns that contain video', () => {
    const reels = filterCampaigns(CAMPAIGNS, 'All', true);
    expect(reels.length).toBeGreaterThan(0);
    expect(reels.every(containsVideo)).toBe(true);
  });

  it('rejects unknown filter values from the URL', () => {
    expect(isFilter('Events')).toBe(true);
    expect(isFilter('Launches')).toBe(false);
    expect(isFilter(null)).toBe(false);
  });
});
