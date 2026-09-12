import { toBlob, toPng } from 'html-to-image';
import { preloadFonts } from './font';

export async function renderCertificateToBlob(elementId: string): Promise<Blob | null> {
  const element = document.getElementById(elementId);
  if (!element) {
    return null;
  }
  await preloadFonts();
  return toBlob(element, { cacheBust: true });
}

export async function renderCertificateToDataUrl(elementId: string): Promise<string | null> {
  const element = document.getElementById(elementId);
  if (!element) {
    return null;
  }
  await preloadFonts();
  return toPng(element, { cacheBust: true });
}
