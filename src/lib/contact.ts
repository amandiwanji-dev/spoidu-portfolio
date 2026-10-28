import { siteConfig } from '../data/siteConfig';

export interface InquiryValues {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  details: string;
}

export type DeliveryMode = 'formspree' | 'web3forms' | 'mailto' | 'none';

export function deliveryMode(): DeliveryMode {
  const { form, contact } = siteConfig;
  if (form.formspreeId) return 'formspree';
  if (form.web3formsKey) return 'web3forms';
  if (contact.email) return 'mailto';
  return 'none';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(values: InquiryValues) {
  const errors: Partial<Record<keyof InquiryValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!values.email.trim()) errors.email = 'I’ll need an email address to reply to.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address doesn’t look quite right.';
  if (!values.projectType) errors.projectType = 'Choose the type of project.';
  if (values.details.trim().length < 20)
    errors.details = 'A few more details would help — a sentence or two about the idea, timeline or deliverables.';
  return errors;
}

function subject(values: InquiryValues) {
  return `New ${values.projectType || 'project'} enquiry from ${values.name.trim()}`;
}

function summary(values: InquiryValues) {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.company ? `Company / brand: ${values.company}` : null,
    `Project type: ${values.projectType}`,
    values.budget ? `Approximate budget: ${values.budget}` : null,
    '',
    values.details,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export function mailtoHref(values?: InquiryValues) {
  const to = siteConfig.contact.email;
  if (!values) return `mailto:${to}`;
  const params = new URLSearchParams({ subject: subject(values), body: summary(values) });
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Sends the enquiry through the configured form service. Throws on failure. */
export async function sendInquiry(values: InquiryValues) {
  const mode = deliveryMode();
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    projectType: values.projectType,
    budget: values.budget,
    message: values.details.trim(),
  };

  let response: Response;
  if (mode === 'formspree') {
    response = await fetch(`https://formspree.io/f/${siteConfig.form.formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, _subject: subject(values), _replyto: payload.email }),
    });
  } else if (mode === 'web3forms') {
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        access_key: siteConfig.form.web3formsKey,
        subject: subject(values),
        from_name: `${siteConfig.brand.name} website`,
      }),
    });
  } else {
    throw new Error('No form service configured');
  }

  if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
}
