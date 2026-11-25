export const ENQUIRY_CATEGORIES = ['brand', 'creator', 'celebrity', 'event', 'pr', 'other'] as const;
export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<EnquiryCategory, string> = {
  brand: 'Brand enquiry',
  creator: 'Creator collaboration',
  celebrity: 'Celebrity booking enquiry',
  event: 'Event or launch enquiry',
  pr: 'PR enquiry',
  other: 'Other',
};

export interface EnquiryInput {
  category: string;
  name: string;
  organisation: string;
  email: string;
  instagram: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INSTAGRAM = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/;

export function isEnquiryCategory(value: string): value is EnquiryCategory {
  return (ENQUIRY_CATEGORIES as readonly string[]).includes(value);
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!isEnquiryCategory(input.category)) errors.category = 'Choose an enquiry category.';
  if (input.name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL.test(input.email.trim())) errors.email = 'Enter a valid email address.';
  if (input.category === 'creator') {
    if (!INSTAGRAM.test(input.instagram.trim())) {
      errors.instagram = 'Enter a full Instagram profile link, for example https://www.instagram.com/yourname/';
    }
  } else if (input.organisation.trim().length < 2) {
    errors.organisation = 'Enter your business or organisation.';
  }
  const message = input.message.trim();
  if (message.length < 20) errors.message = 'Tell us a little more (at least 20 characters).';
  else if (message.length > 2000) errors.message = 'Keep the message under 2000 characters.';
  return errors;
}

// Plain-text summary a sender can copy into Instagram DM while no submission endpoint exists.
export function buildEnquiryText(input: EnquiryInput): string {
  const label = isEnquiryCategory(input.category) ? CATEGORY_LABELS[input.category] : 'Enquiry';
  const lines = [
    `Enquiry: ${label}`,
    `Name: ${input.name.trim()}`,
    input.organisation.trim() ? `Business or organisation: ${input.organisation.trim()}` : null,
    `Email: ${input.email.trim()}`,
    input.instagram.trim() ? `Instagram: ${input.instagram.trim()}` : null,
    '',
    input.message.trim(),
  ];
  return lines.filter((l): l is string => l !== null).join('\n');
}
