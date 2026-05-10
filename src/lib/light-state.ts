/** Per-tab only (not shared like localStorage), so each new tab starts with lights off. */
const STORAGE_KEY = "dshmahi-lights-on";

/** Navigation `type` stays `"reload"` for the whole document after one refresh — only reset storage once. */
let reloadLightsResetDone = false;

export function readPersistedLightsOn(): boolean {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type === "reload" && !reloadLightsResetDone) {
    reloadLightsResetDone = true;
    window.sessionStorage.removeItem(STORAGE_KEY);
    return false;
  }
  return window.sessionStorage.getItem(STORAGE_KEY) === "true";
}

export function persistLightsOn(on: boolean) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, String(on));
}
