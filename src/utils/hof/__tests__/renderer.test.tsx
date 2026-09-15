import * as htmlToImage from 'html-to-image';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as fontLoader from '../font';
import { renderCertificateToBlob, renderCertificateToDataUrl } from '../renderer';

vi.mock('html-to-image', () => ({
  toBlob: vi.fn<(...args: unknown[]) => Promise<Blob | null>>(),
  toPng: vi.fn<(...args: unknown[]) => Promise<string>>(),
}));

vi.mock('../font', () => ({
  preloadFonts: vi.fn<() => Promise<void>>(),
}));

describe('Hall of Fame Certificate Renderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null if element is not found', async () => {
    // If not in browser, we can't test document
    if (typeof document === 'undefined') return;

    document.body.innerHTML = '';
    const result = await renderCertificateToBlob('missing-id');
    expect(result).toBeNull();
  });

  it('preloads fonts and renders to blob', async () => {
    if (typeof document === 'undefined') return;
    document.body.innerHTML = '';

    const div = document.createElement('div');
    div.id = 'test-id';
    document.body.appendChild(div);

    const mockBlob = new Blob(['test']);
    vi.mocked(htmlToImage.toBlob).mockResolvedValue(mockBlob);

    const result = await renderCertificateToBlob('test-id');

    expect(fontLoader.preloadFonts).toHaveBeenCalled();
    expect(htmlToImage.toBlob).toHaveBeenCalledWith(div, expect.any(Object));
    expect(result).toBe(mockBlob);
  });

  it('preloads fonts and renders to data URL', async () => {
    if (typeof document === 'undefined') return;
    document.body.innerHTML = '';

    const div = document.createElement('div');
    div.id = 'test-id';
    document.body.appendChild(div);

    const mockDataUrl = 'data:image/png;base64,test';
    vi.mocked(htmlToImage.toPng).mockResolvedValue(mockDataUrl);

    const result = await renderCertificateToDataUrl('test-id');

    expect(fontLoader.preloadFonts).toHaveBeenCalled();
    expect(htmlToImage.toPng).toHaveBeenCalledWith(div, expect.any(Object));
    expect(result).toBe(mockDataUrl);
  });
});
