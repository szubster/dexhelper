import { describe, expect, it } from 'vitest';
import { getHeatmapColorClass, getSeverity } from './heatmap';

describe('Heatmap Node Styling Utils', () => {
  const mockThresholds = {
    low: 10,
    medium: 50,
    high: 80,
    critical: 95,
  };

  describe('getSeverity', () => {
    it('returns critical when value is at or above critical threshold', () => {
      expect(getSeverity({ value: 95, thresholds: mockThresholds })).toBe('critical');
      expect(getSeverity({ value: 100, thresholds: mockThresholds })).toBe('critical');
    });

    it('returns high when value is at or above high threshold', () => {
      expect(getSeverity({ value: 80, thresholds: mockThresholds })).toBe('high');
      expect(getSeverity({ value: 94, thresholds: mockThresholds })).toBe('high');
    });

    it('returns medium when value is at or above medium threshold', () => {
      expect(getSeverity({ value: 50, thresholds: mockThresholds })).toBe('medium');
      expect(getSeverity({ value: 79, thresholds: mockThresholds })).toBe('medium');
    });

    it('returns low when value is at or above low threshold', () => {
      expect(getSeverity({ value: 10, thresholds: mockThresholds })).toBe('low');
      expect(getSeverity({ value: 49, thresholds: mockThresholds })).toBe('low');
    });

    it('returns none when value is below low threshold', () => {
      expect(getSeverity({ value: 9, thresholds: mockThresholds })).toBe('none');
      expect(getSeverity({ value: 0, thresholds: mockThresholds })).toBe('none');
    });
  });

  describe('getHeatmapColorClass', () => {
    it('returns correct classes for critical severity', () => {
      expect(getHeatmapColorClass('critical')).toBe('bg-red-900 border-red-500 text-red-100');
    });

    it('returns correct classes for high severity', () => {
      expect(getHeatmapColorClass('high')).toBe('bg-orange-900 border-orange-500 text-orange-100');
    });

    it('returns correct classes for medium severity', () => {
      expect(getHeatmapColorClass('medium')).toBe('bg-yellow-900 border-yellow-500 text-yellow-100');
    });

    it('returns correct classes for low severity', () => {
      expect(getHeatmapColorClass('low')).toBe('bg-blue-900 border-blue-500 text-blue-100');
    });

    it('returns correct classes for none severity', () => {
      expect(getHeatmapColorClass('none')).toBe('bg-slate-900 border-slate-700 text-slate-300');
    });
  });
});
