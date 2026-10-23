"use client";

/**
 * Dark green site footer: brand block, link columns, contact details,
 * placeholder notices and legal registrations.
 *
 * Placeholder destinations (About, Careers, Wholesale) raise an honest toast
 * instead of navigating to a dead anchor.
 */

import { Mail, MessageCircle, Phone } from "lucide-react";

import { Wordmark } from "@/components/layout/Wordmark";
import { Container } from "@/components/ui/Container";
import { demoNotices } from "@/content/copy";
import {
  brand,
  contact,
  footerLinks,
  legal,
  paymentMethods,
  socialLinks,
} from "@/content/site";
import { useStore } from "@/lib/store";

interface FooterLink {
  label: string;
  href: string | null;
}

const shopLinks = footerLinks.shop as readonly FooterLink[];
const helpLinks = footerLinks.help as readonly FooterLink[];
const companyLinks = footerLinks.company as readonly FooterLink[];

export function SiteFooter() {
  const { notify } = useStore();

  /** Renders an anchor for real targets and a demo notice for placeholders. */
  const renderLink = ({ label, href }: FooterLink) => {
    if (href === null) {
      return (
        <button
          key={label}
          type="button"
          onClick={() => notify(demoNotices.placeholderLink)}
          className="py-1.5 text-left text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          {label}
        </button>
      );
    }

    return (
      <a
        key={label}
        href={href}
        className="py-1.5 text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        {label}
      </a>
    );
  };

  return (
    <footer className="bg-brand-dark text-white">
      <Container className="pb-8 pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand + contact */}
          <div className="lg:col-span-5 lg:pr-8">
            <Wordmark tone="light" size="lg" />

            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              {brand.description}
            </p>

            <div id="contact" className="mt-7 scroll-mt-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-light">
                Contact
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.emailHref}
                    className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    WhatsApp {contact.whatsappLabel}
                  </a>
                </li>
              </ul>
              <p className="mt-3 text-xs text-white/50">
                {contact.placeholderNote}
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <button
                    type="button"
                    onClick={() => notify(demoNotices.placeholderLink)}
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {social.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <nav aria-labelledby="footer-shop">
              <h2
                id="footer-shop"
                className="text-xs font-semibold uppercase tracking-wider text-white"
              >
                Shop
              </h2>
              <ul className="mt-3 flex flex-col">{shopLinks.map(renderLink)}</ul>
            </nav>

            <nav aria-labelledby="footer-help">
              <h2
                id="footer-help"
                className="text-xs font-semibold uppercase tracking-wider text-white"
              >
                Help
              </h2>
              <ul className="mt-3 flex flex-col">{helpLinks.map(renderLink)}</ul>
            </nav>

            <nav aria-labelledby="footer-company" className="col-span-2 sm:col-span-1">
              <h2
                id="footer-company"
                className="text-xs font-semibold uppercase tracking-wider text-white"
              >
                Company
              </h2>
              <ul className="mt-3 flex flex-col">{companyLinks.map(renderLink)}</ul>
            </nav>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-sm font-medium text-white/80">
            Accepted payments
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-md border border-white/20 px-2.5 py-1.5 text-xs text-white/70"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-white/60">{legal.copyright}</p>
            <p className="text-xs text-white/45">{legal.imageCredits}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/60">
            <span>{legal.commercialRegistration}</span>
            <span>{legal.vatRegistration}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
