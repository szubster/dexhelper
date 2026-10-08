import { expect, test } from '@playwright/test';
import { generateWallpaperPhrases } from '../../src/engine/gen3/wallpaper/phraseGenerator';

test.describe('Gen 3 Wallpaper Phrase Generator E2E', () => {
  test('should generate correct phrases for a known trainer ID', () => {
    const phrases = generateWallpaperPhrases(12345);
    expect(Object.keys(phrases)).toHaveLength(16);
    expect(phrases['Pika']).toBe('pJhBBkFhDBLCBGT');
    expect(phrases['Smeargle']).toBe('dJQBBNDVCBGBVDR');
    expect(phrases['Pikachu']).toBe('qJnBBnFhBBBBBDT');
    expect(phrases['Zubat']).toBe('sJhBBqFhFBQCVJT');
    expect(phrases['Pikachu2']).toBe('mJVBBfFhBBBBBGS');
    expect(phrases['Lotad']).toBe('fJnBBQDhHBcDVBR');
    expect(phrases['Pikachu3']).toBe('qJcBBnFhBBBBBJT');
    expect(phrases['Seviper']).toBe('bKBBBJCBKBnFVGQ');
    expect(phrases['Spinda']).toBe('nJGBBhFhJBhFBDT');
    expect(phrases['Slakoth']).toBe('nJhBBhCVLCBGBDT');
    expect(phrases['Pikachu4']).toBe('dJQBBNDVBBBBBBR');
    expect(phrases['Wurmple']).toBe('qKhBBnBLGBVDBGT');
    expect(phrases['Pikachu5']).toBe('pJLBBkFhBBBBBLT');
    expect(phrases['Pikachu6']).toBe('gJBBBSFBBBBBBNR');
    expect(phrases['Pikachu7']).toBe('fJVBBQDhBBBBBQR');
    expect(phrases['Pikachu8']).toBe('sJBBBqFVBBBBBST');
  });
});
