/**
 * Wrapper for window.location.reload to allow easier mocking in tests.
 */
export const reloadPage = () => {
  window.location.reload();
};

/**
 * Validates whether a target URL is safe for redirection (prevents Open Redirect vulnerabilities).
 * Allows relative paths starting with '/' (excluding '//' scheme-relative URLs) or same-origin URLs.
 */
export const isSafeRedirectUrl = (url: string): boolean => {
  if (!url) return false;

  // Reject URLs containing backslashes or whitespace
  if (url.includes('\\') || /\s/.test(url)) {
    return false;
  }

  // Allow relative URLs starting with '/' but reject '//' (protocol-relative URLs)
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }

  try {
    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    const parsed = new URL(url, baseOrigin);
    return (
      typeof window !== 'undefined' &&
      parsed.origin === window.location.origin &&
      (parsed.protocol === 'http:' || parsed.protocol === 'https:')
    );
  } catch {
    return false;
  }
};

/**
 * Wrapper for window.location.href assignment to allow easier mocking in tests.
 * Sanitizes target URL to prevent Open Redirects (CWE-601).
 */
export const redirectPage = (url: string) => {
  const safeUrl = isSafeRedirectUrl(url) ? url : '/';
  window.location.href = safeUrl;
};
