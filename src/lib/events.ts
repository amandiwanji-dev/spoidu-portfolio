/** Scrolls to the enquiry form, focuses it and optionally pre-selects a project type. */
const PREFILL_EVENT = 'spoidu:prefill-project-type';

export function requestProject(projectType?: string) {
  scrollToId('contact-form');
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: projectType ?? '' }));
}

export function onProjectPrefill(handler: (type: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail);
  window.addEventListener(PREFILL_EVENT, listener);
  return () => window.removeEventListener(PREFILL_EVENT, listener);
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
