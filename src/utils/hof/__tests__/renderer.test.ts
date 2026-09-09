// @vitest-environment jsdom
import * as htmlToImage from 'html-to-image';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as fontUtils from '../font';
import { generateCertificateImage } from '../renderer';

vi.mock('../font', () => ({
  preloadFonts: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
}));

vi.mock('html-to-image', () => ({
  toPng: vi.fn<() => Promise<string>>().mockResolvedValue('data:image/png;base64,mocked-image-data'),
}));

describe('generateCertificateImage', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw an error if the element is not found', async () => {
    await expect(generateCertificateImage('missing-id')).rejects.toThrow(
      "Element with id 'missing-id' not found in the DOM.",
    );
  });

  it('should call preloadFonts and toPng with the correct element and options', async () => {
    const div = document.createElement('div');
    div.id = 'hof-certificate-hidden-container';
    document.body.appendChild(div);

    const result = await generateCertificateImage();

    expect(fontUtils.preloadFonts).toHaveBeenCalled();
    expect(htmlToImage.toPng).toHaveBeenCalledWith(
      div,
      expect.objectContaining({
        style: {
          opacity: '1',
          transform: 'none',
        },
      }),
    );
    expect(result).toBe('data:image/png;base64,mocked-image-data');
  });
});
