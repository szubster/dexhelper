import { toPng } from 'html-to-image';
import { preloadFonts } from './font';

export async function generateCertificateImage(elementId = 'hof-certificate-hidden-container'): Promise<string> {
  await preloadFonts();

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found in the DOM.`);
  }

  return toPng(element, {
    cacheBust: true,
    style: {
      opacity: '1',
      transform: 'none',
    },
  });
}
