import type { EnquiryCategory } from '../lib/validation';
import type { MediaId } from './media.generated';

export interface Capability {
  id: string;
  index: string;
  title: string;
  summary: string;
  purpose: string;
  need: string; // a proposed framing of the customer need, not a verified claim
  media: MediaId;
  enquiry: EnquiryCategory;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'influencer-marketing',
    index: '01',
    title: 'Influencer marketing',
    summary: 'Brand stories told through the creators audiences already follow.',
    purpose: 'Matching a brand with creators whose audience and voice fit the story being told.',
    need: 'A brand that wants a credible, in-feed presence rather than an interruption.',
    media: 'a017',
    enquiry: 'brand',
  },
  {
    id: 'celebrity-collaborations',
    index: '02',
    title: 'Celebrity collaborations',
    summary: 'Public appearances and promotional collaborations with recognisable names.',
    purpose: 'Arranging celebrity participation in promotional and public-facing moments.',
    need: 'A brand or event that wants a recognised face in a public or social moment.',
    media: 'a002',
    enquiry: 'celebrity',
  },
  {
    id: 'brand-events',
    index: '03',
    title: 'Brand events',
    summary: 'Guest evenings, activations and public events that people talk about afterwards.',
    purpose: 'Planning on-ground moments that give creators and guests something to share.',
    need: 'A venue or brand that wants guests in the room and content coming out of it.',
    media: 'a056',
    enquiry: 'event',
  },
  {
    id: 'launches',
    index: '04',
    title: 'Launches',
    summary: 'Launch moments with creators, press and public audiences.',
    purpose: 'Building the public moment around a launch, from invitation to coverage.',
    need: 'A product or venue opening that needs attention in the first week.',
    media: 'a110',
    enquiry: 'event',
  },
  {
    id: 'public-relations',
    index: '05',
    title: 'Public relations',
    summary: 'Positioning a brand through people, events and public conversation.',
    purpose: 'Shaping how a brand is described in public through people and events.',
    need: 'A brand that needs a clear public narrative, not only a campaign burst.',
    media: 'a064',
    enquiry: 'pr',
  },
];
