import { toBlob } from 'html-to-image';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { preloadFonts } from './font';
import { renderCertificate } from './render';

// Mock the dependencies
vi.mock('html-to-image', () => ({
  toBlob: vi.fn<() => Promise<Blob | null>>(),
}));

vi.mock('./font', () => ({
  preloadFonts: vi.fn<() => Promise<void>>(),
}));

describe('renderCertificate', () => {
  let mockElement: HTMLElement;
  let mockBlob: Blob;

  beforeEach(() => {
    vi.clearAllMocks();
    mockElement = {} as HTMLElement;
    mockBlob = new Blob(['mock image data'], { type: 'image/png' });

    (preloadFonts as Mock).mockResolvedValue(undefined);
    (toBlob as Mock).mockResolvedValue(mockBlob);
  });

  it('preloads fonts and renders the element to a blob with pixelRatio 2', async () => {
    const result = await renderCertificate(mockElement);

    expect(preloadFonts).toHaveBeenCalledTimes(1);
    expect(toBlob).toHaveBeenCalledTimes(1);
    expect(toBlob).toHaveBeenCalledWith(mockElement, { pixelRatio: 2 });
    expect(result).toBe(mockBlob);
  });

  it('propagates errors from preloadFonts', async () => {
    const error = new Error('Font loading failed');
    (preloadFonts as Mock).mockRejectedValue(error);

    await expect(renderCertificate(mockElement)).rejects.toThrow('Font loading failed');
    expect(toBlob).not.toHaveBeenCalled();
  });

  it('propagates errors from toBlob', async () => {
    const error = new Error('Rendering failed');
    (toBlob as Mock).mockRejectedValue(error);

    await expect(renderCertificate(mockElement)).rejects.toThrow('Rendering failed');
  });
});
