/**
 * Floating WhatsApp contact button.
 *
 * The number comes from `src/content/site.ts` and is a PLACEHOLDER — replace
 * it with the client's real business number before launch. The icon is a
 * generic messaging glyph drawn for this demo rather than a licensed logo.
 */

import { contact } from "@/content/site";

export function WhatsAppButton() {
  const href = `https://wa.me/${contact.whatsapp}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp (placeholder number)"
      title="WhatsApp - placeholder number"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[90] grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-float transition-all hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px sm:right-6"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Speech bubble */}
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.8 20.3l1.4-4.2A8.4 8.4 0 1 1 20.5 11.6Z" />
        {/* Handset */}
        <path
          d="M9 8.7c.2-.5.5-.6.8-.6h.7c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.5.5c-.1.2-.2.3 0 .6.4.7 1 1.3 1.7 1.7.3.2.4.1.6 0l.5-.5c.2-.1.4-.2.6-.1l1.4.6c.2.1.3.3.3.5v.7c0 .4-.2.7-.6.8-.6.3-1.3.4-2 .3-1.7-.3-3.3-1.2-4.5-2.4-1.2-1.2-2-2.7-2.3-4.4-.1-.6 0-1.3.2-1.9Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </a>
  );
}
