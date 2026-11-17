/**
 * `n` points of the app's 402-point screen, inside a `.stage .ui` (see globals.css): the little
 * app screens on the page are drawn in the app's own sizes and scale with their stage.
 */
export const u = (n: number) => `calc(var(--u) * ${n})`;

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
