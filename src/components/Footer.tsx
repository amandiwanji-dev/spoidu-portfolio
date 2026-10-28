import { ArrowUp } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { scrollToId } from '../lib/events';
import { Logo } from './Logo';

export function Footer() {
  const { contact, footer, role } = siteConfig;
  const socials = [
    contact.instagram && { label: 'Instagram', href: contact.instagram },
    contact.linkedin && { label: 'LinkedIn', href: contact.linkedin },
    contact.whatsapp && { label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line">
      <div className="container-x">
        <div aria-hidden="true" className="select-none pt-12 md:pt-16">
          <Logo className="block text-center text-[clamp(4.5rem,24vw,22rem)] leading-[0.8] text-fg/[0.06]" />
        </div>

        {socials.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-line pt-8 md:mt-10">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="label link-underline text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 grid items-center gap-4 border-t border-line py-8 text-center md:grid-cols-3 md:text-left">
          <p className="label text-fg">{footer.copyright}</p>
          <p className="label md:text-center">{role}</p>
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="label group inline-flex items-center justify-center gap-2 text-fg md:justify-self-end"
          >
            <span className="link-underline">Back to top</span>
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
        <p className="label pb-8 text-center text-faint">{footer.closingLine}</p>
      </div>
    </footer>
  );
}
