import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isSafeRedirectUrl, redirectPage, reloadPage } from '../window';

describe('window utils', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('isSafeRedirectUrl', () => {
    it('allows valid relative URLs', () => {
      expect(isSafeRedirectUrl('/cdn-cgi/access/login')).toBe(true);
      expect(isSafeRedirectUrl('/dashboard?page=1')).toBe(true);
      expect(isSafeRedirectUrl('/settings')).toBe(true);
    });

    it('rejects protocol-relative URLs (open redirect vector)', () => {
      expect(isSafeRedirectUrl('//evil.com')).toBe(false);
      expect(isSafeRedirectUrl('//google.com/path')).toBe(false);
    });

    it('rejects backslash bypass vectors (open redirect vector)', () => {
      expect(isSafeRedirectUrl('/\\evil.com')).toBe(false);
      expect(isSafeRedirectUrl('/\\/evil.com')).toBe(false);
      expect(isSafeRedirectUrl('\\\\evil.com')).toBe(false);
    });

    it('rejects external absolute URLs', () => {
      expect(isSafeRedirectUrl('https://evil.com')).toBe(false);
      expect(isSafeRedirectUrl('http://attacker.org/phishing')).toBe(false);
      expect(isSafeRedirectUrl('javascript:alert(1)')).toBe(false);
    });

    it('allows same-origin absolute URLs when window is defined', () => {
      const locationMock = { origin: 'http://localhost:3000' };
      vi.stubGlobal('window', {
        location: locationMock,
      });

      expect(isSafeRedirectUrl('http://localhost:3000/safe-page')).toBe(true);

      vi.unstubAllGlobals();
    });

    it('handles empty inputs', () => {
      expect(isSafeRedirectUrl('')).toBe(false);
    });
  });

  describe('redirectPage', () => {
    it('redirects to safe relative URL', () => {
      const locationMock = { href: '', origin: 'http://localhost:3000' };
      vi.stubGlobal('window', {
        location: locationMock,
      });

      redirectPage('/cdn-cgi/access/login');
      expect(locationMock.href).toBe('/cdn-cgi/access/login');

      vi.unstubAllGlobals();
    });

    it('falls back to "/" for unsafe redirect attempts', () => {
      const locationMock = { href: '', origin: 'http://localhost:3000' };
      vi.stubGlobal('window', {
        location: locationMock,
      });

      redirectPage('https://evil.com');
      expect(locationMock.href).toBe('/');

      redirectPage('//malicious-site.com');
      expect(locationMock.href).toBe('/');

      vi.unstubAllGlobals();
    });
  });

  describe('reloadPage', () => {
    it('calls window.location.reload', () => {
      const reloadMock = vi.fn<() => void>();
      vi.stubGlobal('window', {
        location: { reload: reloadMock },
      });

      reloadPage();
      expect(reloadMock).toHaveBeenCalled();

      vi.unstubAllGlobals();
    });
  });
});
