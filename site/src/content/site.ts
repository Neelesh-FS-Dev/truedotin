// Single source for brand facts and destinations. Only verified facts belong here.
export const site = {
  name: "True.in",
  instagram: "https://www.instagram.com/truedotin/",
  instagramHandle: "@truedotin",
  // Business contact is not yet verified. Leave null until True.in confirms a destination.
  enquiryEmail: null as string | null,
  // Forms only send when an endpoint is configured. Until then they run as a clearly labelled demo.
  formEndpoint: null as string | null,
  positioning: "Telling the story of brands through creators.",
};

export const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/experiences", label: "Experiences" },
  { to: "/creators", label: "Creators" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    no: "01",
    title: "Influencer Marketing",
    body: "Creator-led storytelling: we find the people whose audiences already trust them, and build content around how they actually live and eat and go out.",
    photo: "p11",
    related: "creator-sessions",
  },
  {
    no: "02",
    title: "Celebrity Collaborations",
    body: "Celebrity-led brand moments, planned around the person and the audience they bring. Examples will be shown here once client permission is in place.",
    photo: "p44",
    related: "portrait-sessions",
  },
  {
    no: "03",
    title: "Brand Events",
    body: "Gatherings where creators and guests make the brand part of the evening: sessions, dinners and social nights captured for the feed.",
    photo: "p24",
    related: "evenings-out",
  },
  {
    no: "04",
    title: "Launches & Activations",
    body: "Introducing a venue, product or brand to an audience through a launch night, a pop-up session or a creator takeover.",
    photo: "p33",
    related: "venue-reels",
  },
  {
    no: "05",
    title: "Public Relations",
    body: "Positioning a brand's story through the creators and press who will tell it, with the framing set before anyone posts.",
    photo: "p37",
    related: "nightlife-reels",
  },
] as const;

export const workflow = [
  { no: "01", title: "Discover", body: "Understand the brand, the audience and what the brand wants people to feel." },
  { no: "02", title: "Connect", body: "Identify creators whose voice fits the brand, not just the reach." },
  { no: "03", title: "Create", body: "Develop the concept, the shoot plan and the storytelling for each creator." },
  { no: "04", title: "Activate", body: "Run the content, the events or the launch across creator and brand channels." },
  { no: "05", title: "Evaluate", body: "Review what happened and carry the learnings into the next campaign." },
] as const;
