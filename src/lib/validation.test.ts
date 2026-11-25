import { describe, expect, it } from 'vitest';
import { buildEnquiryText, validateEnquiry, type EnquiryInput } from './validation';

const base: EnquiryInput = {
  category: 'brand',
  name: 'Asha',
  organisation: 'Example Cafe',
  email: 'asha@example.com',
  instagram: '',
  message: 'We are planning a launch event in Pune next quarter.',
};

describe('validateEnquiry', () => {
  it('accepts a complete brand enquiry', () => {
    expect(validateEnquiry(base)).toEqual({});
  });

  it('requires an Instagram profile link for creators and not an organisation', () => {
    const errors = validateEnquiry({ ...base, category: 'creator', organisation: '', instagram: 'not a link' });
    expect(errors.instagram).toBeDefined();
    expect(errors.organisation).toBeUndefined();
    expect(validateEnquiry({ ...base, category: 'creator', organisation: '', instagram: 'https://www.instagram.com/example_1/' }).instagram).toBeUndefined();
  });

  it('reports every invalid field at once', () => {
    const errors = validateEnquiry({ ...base, category: 'nope', name: 'A', email: 'bad', message: 'short' });
    expect(Object.keys(errors).sort()).toEqual(['category', 'email', 'message', 'name']);
  });

  it('builds a copyable summary without empty optional lines', () => {
    const text = buildEnquiryText(base);
    expect(text.startsWith('Enquiry: Brand enquiry')).toBe(true);
    expect(text).not.toContain('Instagram:');
  });
});
