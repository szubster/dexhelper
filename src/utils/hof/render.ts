import { toBlob } from 'html-to-image';
import { preloadFonts } from './font';

/**
 * Renders an HTML element (e.g., a React component ref) into a high-resolution PNG Blob.
 * This explicitly ensures fonts are preloaded before triggering the html-to-image render.
 *
 * @param element The HTML element to render.
 * @returns A promise that resolves to a Blob containing the PNG image.
 */
export async function renderCertificate(element: HTMLElement): Promise<Blob | null> {
  // Preload custom fonts so they are available when rendering
  await preloadFonts();

  // We recommend using high pixel ratio (e.g. 2 or 3) for high-resolution images.
  // Using pixelRatio: 2 provides a crisp image suitable for download/social sharing.
  return toBlob(element, { pixelRatio: 2 });
}
