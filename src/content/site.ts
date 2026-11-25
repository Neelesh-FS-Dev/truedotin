// Editable site configuration. Anything not verified stays null or is labelled as a proposal.
export const SITE = {
  name: 'True.in',
  instagramUrl: 'https://www.instagram.com/truedotin/',
  // Listed on the Instagram profile as a community invitation. This is not a business WhatsApp number.
  whatsappCommunityUrl: 'https://chat.whatsapp.com/FRvx1afW2s2AI7XmJbHkAY',
  // No verified business email or phone exists yet. Enquiries cannot be submitted from this preview.
  businessEmail: null as string | null,
  businessPhone: null as string | null,
  tagline: 'Telling the story of brands through creators.',
  positioning: 'Influencer marketing, celebrity collaborations, brand events, launches and public relations.',
  conceptNotice:
    'Independent creative website concept by Codevirel Studio. This is not an officially commissioned True.in website. Media is shown for proposal purposes only and remains subject to rights confirmation.',
} as const;

export const NAV = [
  { to: '/work', label: 'Work' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/creators', label: 'Creators' },
  { to: '/about', label: 'About' },
] as const;
