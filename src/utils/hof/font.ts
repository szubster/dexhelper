/**
 * Utility to preload and embed fonts before rendering the certificate.
 * Since html-to-image might not properly capture web fonts if they aren't fully loaded
 * or embedded, we fetch the fonts, encode them as base64 data URIs, and inject them
 * into a <style> block, along with waiting for document.fonts.ready.
 */

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
];

/**
 * Preloads all document fonts and injects embedded fonts for html-to-image.
 */
export async function preloadFonts(): Promise<void> {
  if (typeof document === 'undefined') {
    return;
  }

  // Inject embedded @font-face rules
  try {
    const cssText = await fetchAndEmbedFonts();
    const styleId = 'embedded-hof-fonts';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cssText;
      document.head.appendChild(style);
    }
  } catch (error) {
    console.error('Failed to embed fonts for HOF certificate:', error);
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

async function fetchAndEmbedFonts(): Promise<string> {
  let finalCss = '';

  for (const url of FONT_URLS) {
    const res = await fetch(url);
    if (!res.ok) continue;
    const css = await res.text();

    // Extract all url() declarations
    const fontUrlRegex = /url\((https:\/\/[^)]+)\)/g;
    let match: RegExpExecArray | null = null;
    let processedCss = css;

    // biome-ignore lint/suspicious/noAssignInExpressions: standard regex loop
    while ((match = fontUrlRegex.exec(css)) !== null) {
      const fontUrl = match[1];
      if (!fontUrl) continue;
      try {
        const fontRes = await fetch(fontUrl);
        if (fontRes.ok) {
          const blob = await fontRes.blob();
          const base64 = await blobToBase64(blob);
          processedCss = processedCss.replace(fontUrl, base64);
        }
      } catch (e) {
        console.warn(`Failed to fetch font at ${fontUrl}`, e);
      }
    }
    finalCss += `${processedCss}\n`;
  }

  return finalCss;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to string'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
