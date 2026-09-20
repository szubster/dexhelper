import { describe, expect, it } from 'vitest';
import { generateWallpaperPhrases } from '../phraseGenerator';

describe('generateWallpaperPhrases', () => {
  it('generates correct phrases for TID 12345', () => {
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

  it('generates correct phrases for TID 0', () => {
    const phrases = generateWallpaperPhrases(0);
    expect(Object.keys(phrases)).toHaveLength(16);
    expect(phrases['Pika']).toBe('RCnBBkFhDBLCBGF');
  });

  it('generates correct phrases for TID 65535', () => {
    const phrases = generateWallpaperPhrases(65535);
    expect(Object.keys(phrases)).toHaveLength(16);
    expect(phrases['Pika']).toBe('ZqBBBkFhDBLCBHn');
  });
});
