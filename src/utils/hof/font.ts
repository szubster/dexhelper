/**
 * Utility to preload fonts before rendering the certificate.
 * By dynamically importing the @fontsource packages, we ensure the fonts are
 * included as dependencies, properly loaded, and bundled by Vite so that html-to-image
 * can consistently render them.
 */

export async function preloadFonts(): Promise<void> {
  // Lazy load font dependencies
  await Promise.all([
    import('@fontsource/outfit/100.css'),
    import('@fontsource/outfit/200.css'),
    import('@fontsource/outfit/300.css'),
    import('@fontsource/outfit/400.css'),
    import('@fontsource/outfit/500.css'),
    import('@fontsource/outfit/600.css'),
    import('@fontsource/outfit/700.css'),
    import('@fontsource/outfit/800.css'),
    import('@fontsource/outfit/900.css'),
    import('@fontsource/jetbrains-mono/100.css'),
    import('@fontsource/jetbrains-mono/200.css'),
    import('@fontsource/jetbrains-mono/300.css'),
    import('@fontsource/jetbrains-mono/400.css'),
    import('@fontsource/jetbrains-mono/500.css'),
    import('@fontsource/jetbrains-mono/600.css'),
    import('@fontsource/jetbrains-mono/700.css'),
    import('@fontsource/jetbrains-mono/800.css'),
    import('@fontsource/press-start-2p'),
  ]);

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }
}
