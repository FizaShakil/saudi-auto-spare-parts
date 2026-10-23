"use client";

/**
 * Compact announcement bar above the header.
 *
 * Dismissible for the rest of the browser session. The dismissed flag lives
 * in sessionStorage and is read through `useSyncExternalStore`, so the server
 * always renders the bar and the client reconciles after hydration — no
 * `setState` inside an effect.
 */

import { useSyncExternalStore } from "react";
import { Truck, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { announcement } from "@/content/site";
import { STORAGE_KEYS, readString, writeString } from "@/lib/storage";

const listeners = new Set<() => void>();

function subscribeToDismissal(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readDismissed(): boolean {
  return readString(STORAGE_KEYS.announcement) === "dismissed";
}

function dismissAnnouncement(): void {
  writeString(STORAGE_KEYS.announcement, "dismissed");
  listeners.forEach((listener) => listener());
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    readDismissed,
    () => false,
  );

  if (dismissed) return null;

  return (
    <div className="bg-brand-dark text-white">
      <Container className="relative flex min-h-10 items-center justify-center py-2 pr-12">
        <p className="flex items-center gap-2 text-center text-sm leading-snug text-white/90">
          <Truck className="hidden h-4 w-4 shrink-0 text-brand-light sm:block" aria-hidden="true" />
          <span>{announcement.message}</span>
        </p>

        <button
          type="button"
          onClick={dismissAnnouncement}
          aria-label={announcement.dismissLabel}
          className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
