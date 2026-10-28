import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode, type SelectHTMLAttributes } from 'react';
import { siteConfig } from '../data/siteConfig';
import { deliveryMode, mailtoHref, sendInquiry, validate, type InquiryValues } from '../lib/contact';
import { onProjectPrefill, requestProject } from '../lib/events';
import { EASE_FILM, fadeUp, lineUp, stagger, viewport } from '../lib/motion';
import { Availability } from './ui/Availability';
import { Button } from './ui/Button';
import { DevHint } from './ui/DevHint';
import { Reveal } from './ui/Reveal';

const EMPTY: InquiryValues = { name: '', email: '', company: '', projectType: '', budget: '', details: '' };
type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

function handleFromUrl(url: string) {
  const segment = url.replace(/\/+$/, '').split('/').pop();
  return segment ? `@${segment.replace(/^@/, '')}` : url;
}

export function Contact() {
  const { contact } = siteConfig;
  const headline = ['Let’s make', 'something', 'unforgettable.'];

  const details: { label: string; value: ReactNode; href?: string; external?: boolean }[] = [];
  if (contact.email) details.push({ label: 'Email', value: contact.email, href: mailtoHref() });
  if (contact.instagram) details.push({ label: 'Instagram', value: handleFromUrl(contact.instagram), href: contact.instagram, external: true });
  if (contact.linkedin) details.push({ label: 'LinkedIn', value: 'View profile', href: contact.linkedin, external: true });
  if (contact.whatsapp)
    details.push({ label: 'WhatsApp', value: 'Send a message', href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`, external: true });
  details.push({ label: 'Location', value: siteConfig.location });
  details.push({ label: 'Status', value: <Availability className="text-[11px]" /> });

  const missing = (['email', 'instagram', 'linkedin', 'whatsapp'] as const).filter((key) => !contact[key]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-16 overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="container-x">
        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(0.1)}>
          <motion.p variants={fadeUp} className="label mb-8 flex items-center gap-3">
            <span className="text-accent">07</span>
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            Have a project in mind?
          </motion.p>
          <h2
            id="contact-title"
            className="font-display text-[clamp(2.4rem,9.4vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em]"
          >
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.02em] pt-[0.06em]">
                <motion.span variants={lineUp} className="block">
                  {i === headline.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="text-accent">{line.slice(-1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>

        <Reveal className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
          <p className="max-w-md text-lg leading-relaxed text-muted lg:col-span-5">
            Have a campaign, brand film, social edit or creative idea in mind? Let’s talk about how we can bring it to life.
          </p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:col-span-7 lg:justify-self-end">
            <Button variant="accent" onClick={() => requestProject()}>
              Start a project
            </Button>
            {contact.email && (
              <a href={mailtoHref()} className="link-underline self-start font-display text-base text-fg sm:self-auto md:text-lg">
                {contact.email}
              </a>
            )}
          </div>
        </Reveal>

        <div className="mt-20 grid gap-14 border-t border-line pt-14 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <h3 className="label">Contact details</h3>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {details.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-6 py-4">
                  <dt className="label">{item.label}</dt>
                  <dd className="min-w-0 text-right text-sm text-fg">
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="group inline-flex items-center gap-1.5 break-all hover:text-accent"
                      >
                        <span className="link-underline">{item.value}</span>
                        {item.external && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {missing.length > 0 && (
              <DevHint className="mt-4">
                Not shown until set in src/data/siteConfig.ts → contact: {missing.join(', ')}
              </DevHint>
            )}
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InquiryForm() {
  const mode = deliveryMode();
  const { form, contact } = siteConfig;
  const [values, setValues] = useState<InquiryValues>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  // "Start a project" and the service cards jump here, optionally choosing a project type.
  useEffect(
    () =>
      onProjectPrefill((type) => {
        if (type && form.projectTypes.includes(type)) setValues((v) => ({ ...v, projectType: type }));
        window.setTimeout(() => document.getElementById('inq-name')?.focus({ preventScroll: true }), 500);
      }),
    [form.projectTypes],
  );

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validate(next));
    if (status === 'error') setStatus('idle');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`inq-${firstInvalid}`)?.focus();
      return;
    }
    // Likely a bot: hidden field filled in, or submitted inhumanly fast. Pretend it worked.
    if (honeypot.current?.value || Date.now() - startedAt.current < 2500) {
      setStatus('success');
      return;
    }
    if (mode === 'mailto') {
      window.location.href = mailtoHref(values);
      setStatus('mailto');
      return;
    }
    if (mode === 'none') return;

    setStatus('sending');
    try {
      await sendInquiry(values);
      setStatus('success');
      setValues(EMPTY);
      setAttempted(false);
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    startedAt.current = Date.now();
    window.setTimeout(() => document.getElementById('inq-name')?.focus(), 50);
  };

  return (
    <div id="contact-form" className="scroll-mt-28 rounded-lg border border-line bg-ink-800 p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' || status === 'mailto' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_FILM }}
            className="flex min-h-[420px] flex-col items-start justify-center"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink">
              <Check aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-8 font-display text-3xl font-bold uppercase tracking-[-0.03em] md:text-4xl">
              {status === 'success' ? 'Message received.' : 'Almost there.'}
            </h3>
            <p className="mt-4 max-w-md text-muted">
              {status === 'success' ? (
                'Thanks for reaching out — I’ll read through the details and get back to you soon.'
              ) : (
                <>
                  Your email app should have opened with the message ready — just press send. If nothing opened, write to{' '}
                  <a href={mailtoHref(values)} className="link-underline text-fg">
                    {contact.email}
                  </a>
                  .
                </>
              )}
            </p>
            <button type="button" onClick={reset} className="link-underline mt-8 font-display text-xs font-semibold uppercase tracking-[0.14em]">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            aria-describedby="form-delivery-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.03em] md:text-3xl">Project enquiry</h3>
              <p className="label hidden sm:block">* Required</p>
            </div>

            <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field id="name" label="Name" required error={errors.name}>
                <input id="inq-name" name="name" type="text" autoComplete="name" value={values.name} onChange={update} {...aria('name', errors.name)} className="field" />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <input id="inq-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={update} {...aria('email', errors.email)} className="field" />
              </Field>
              <Field id="company" label="Company or brand">
                <input id="inq-company" name="company" type="text" autoComplete="organization" value={values.company} onChange={update} className="field" />
              </Field>
              <Field id="projectType" label="Type of project" required error={errors.projectType}>
                <Select id="inq-projectType" name="projectType" value={values.projectType} onChange={update} placeholder="Select a type" options={form.projectTypes} {...aria('projectType', errors.projectType)} />
              </Field>
              <Field id="budget" label="Approximate budget" className="sm:col-span-2">
                <Select id="inq-budget" name="budget" value={values.budget} onChange={update} placeholder="Select a range" options={form.budgetOptions} />
              </Field>
              <Field id="details" label="Project details" required error={errors.details} className="sm:col-span-2">
                <textarea
                  id="inq-details"
                  name="details"
                  rows={5}
                  value={values.details}
                  onChange={update}
                  placeholder="What are you making, who is it for, and when do you need it?"
                  {...aria('details', errors.details)}
                  className="field resize-y"
                />
              </Field>
            </div>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="inq-website">Website</label>
              <input ref={honeypot} id="inq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div aria-live="polite">
              {status === 'error' && (
                <p className="mt-8 flex items-start gap-3 rounded-md border border-red-400/30 bg-red-400/[0.06] p-4 text-sm text-red-200">
                  <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Something went wrong and your message wasn’t sent. Please try again
                    {contact.email ? (
                      <>
                        {' '}or email{' '}
                        <a href={mailtoHref(values)} className="underline underline-offset-2">
                          {contact.email}
                        </a>
                      </>
                    ) : null}
                    .
                  </span>
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="accent" disabled={mode === 'none' || status === 'sending'} aria-disabled={mode === 'none'}>
                {status === 'sending' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Sending
                  </span>
                ) : mode === 'mailto' ? (
                  'Send via email'
                ) : (
                  'Send enquiry'
                )}
              </Button>
              <p id="form-delivery-note" className="max-w-xs text-xs leading-relaxed text-faint sm:text-right">
                {mode === 'mailto' && 'This opens your email app with your message ready to send.'}
                {mode === 'none' && 'Online enquiries are not available just yet.'}
                {(mode === 'formspree' || mode === 'web3forms') && 'Your details are only used to reply to your enquiry.'}
              </p>
            </div>
            {mode === 'none' && (
              <DevHint className="mt-4">
                Form is not connected. Set VITE_FORMSPREE_ID or VITE_WEB3FORMS_ACCESS_KEY in .env, or at least contact.email in
                src/data/siteConfig.ts. See README → Contact form.
              </DevHint>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function aria(field: string, error?: string) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `inq-${field}-error` : undefined,
  };
}

function Field({
  id,
  label,
  required,
  error,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`inq-${id}`} className="label mb-2 block">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`inq-${id}-error`} className="mt-2 flex items-start gap-1.5 text-xs text-red-300">
          <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  options,
  placeholder,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { value: string; placeholder: string; options: readonly string[] }) {
  return (
    <div className="relative">
      <select {...props} className={`field appearance-none pr-10 ${props.value ? '' : 'text-faint'}`}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-fg">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
