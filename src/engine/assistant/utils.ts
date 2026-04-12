/** Safely extract a numeric ID from a PokéAPI resource URL */
export function parseIdFromUrl(url: string): number {
  return parseInt(url.split('/').slice(-2, -1)[0] ?? '0', 10);
}
