/**
 * Asynchronously prefetches generation-specific msgpack files using `<link rel="prefetch">` tags.
 * This function injects the links into the document head to instruct the browser
 * to fetch these resources during idle time.
 */
export function prefetchMsgpack(): void {
  // Prevent execution in non-browser environments (e.g., SSR or tests without jsdom)
  if (typeof document === 'undefined') return;

  const baseUrl = import.meta.env.BASE_URL || '/';

  const filesToPrefetch = ['data/pokedata-gen1.msgpack', 'data/pokedata-gen2.msgpack', 'data/pokedata-gen3.msgpack'];

  filesToPrefetch.forEach((file) => {
    const fullPath = `${baseUrl}${file}`;

    // Check if the link already exists to avoid duplicates
    const existingLink = document.head.querySelector(`link[rel="prefetch"][href="${fullPath}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = fullPath;
      link.as = 'fetch';
      link.crossOrigin = 'anonymous'; // Ensure CORS matches how we fetch it
      document.head.appendChild(link);
    }
  });
}
