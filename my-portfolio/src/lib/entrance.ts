/**
 * Hand-off point between the menu and the next page's entrance choreography.
 *
 * The menu commits the route early, behind its still-solid panel, so the
 * expensive mount never drops a visible frame (see Header.goFromMenu). Left
 * alone, that also means the page's entrance animations start playing while
 * the panel still covers them, and the visitor is revealed into the second
 * half of a choreography that began without them. Before navigating, the menu
 * records here WHEN the entrance may begin; the route transition reads it and
 * provides it to the page, whose animated primitives hold until then and then
 * play in full, exactly as they would on a fresh load.
 *
 * A module-level store rather than context, because the writer (Header) and
 * the reader (RouteTransition in App) sit in unrelated branches of the tree.
 *
 * Reading is deliberately non-destructive: StrictMode invokes render-phase
 * code twice in development, and a read-and-reset would hand the real value
 * to the throwaway invocation and zero to the one that commits. A stale
 * timestamp needs no cleanup because holds are computed as max(0, at - now),
 * so any moment already in the past simply means "no hold".
 */

let entranceAt = 0;

/** Called by the menu: the next route's entrance begins msFromNow from now. */
export function scheduleEntranceHold(msFromNow: number): void {
  entranceAt = performance.now() + msFromNow;
}

/**
 * The timestamp (performance.now() based) the arriving page's entrance should
 * start at. Zero or a past moment both mean "start immediately", which is
 * what reloads and ordinary navigations get.
 */
export function readEntranceAt(): number {
  return entranceAt;
}
