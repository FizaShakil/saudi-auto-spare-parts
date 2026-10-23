/**
 * One-shot request bus for the "Popular makes" shortcuts.
 *
 * The store used to hold a `pendingMake` value that the finder consumed in an
 * effect. A tiny pub/sub avoids that render loop: the finder subscribes once
 * and applies the request inside the callback, which is an event — not a
 * render-phase update.
 */

type MakeListener = (make: string) => void;

const listeners = new Set<MakeListener>();

/** Subscribe to make requests. Returns an unsubscribe function. */
export function subscribeToMakeRequest(listener: MakeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Ask the vehicle finder to preselect a make and scroll itself into view. */
export function emitMakeRequest(make: string): void {
  listeners.forEach((listener) => listener(make));
}
