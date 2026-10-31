import { describe, it, expect } from 'vitest';
import {
  isComplexPersona,
  resolveInitialModel,
  getFallbackModel,
} from './model-selector.ts';

describe('Model Selector', () => {
  describe('isComplexPersona', () => {
    it('identifies coder, architect, tech-lead, and variants as complex personas', () => {
      expect(isComplexPersona('coder')).toBe(true);
      expect(isComplexPersona('architect')).toBe(true);
      expect(isComplexPersona('tech_lead')).toBe(true);
      expect(isComplexPersona('tech-lead')).toBe(true);
      expect(isComplexPersona('architect_visionary')).toBe(true);
    });

    it('returns false for standard/non-complex personas', () => {
      expect(isComplexPersona('researcher')).toBe(false);
      expect(isComplexPersona('product_manager')).toBe(false);
      expect(isComplexPersona('epic_planner')).toBe(false);
      expect(isComplexPersona('story_owner')).toBe(false);
      expect(isComplexPersona('qa')).toBe(false);
      expect(isComplexPersona('tpm')).toBe(false);
      expect(isComplexPersona('auditor')).toBe(false);
      expect(isComplexPersona('curator')).toBe(false);
      expect(isComplexPersona('human')).toBe(false);
    });

    it('handles empty or undefined inputs gracefully', () => {
      expect(isComplexPersona('')).toBe(false);
    });
  });

  describe('resolveInitialModel', () => {
    it('selects pro for complex personas', () => {
      expect(resolveInitialModel('coder')).toBe('pro');
      expect(resolveInitialModel('architect')).toBe('pro');
      expect(resolveInitialModel('tech_lead')).toBe('pro');
      expect(resolveInitialModel('tech-lead')).toBe('pro');
    });

    it('selects flash for non-complex personas', () => {
      expect(resolveInitialModel('researcher')).toBe('flash');
      expect(resolveInitialModel('product_manager')).toBe('flash');
      expect(resolveInitialModel('human')).toBe('flash');
    });

    it('honors explicit model override over default heuristics', () => {
      expect(resolveInitialModel('coder', 'flash')).toBe('flash');
      expect(resolveInitialModel('researcher', 'pro')).toBe('pro');
      expect(resolveInitialModel('coder', 'flash_lite')).toBe('flash_lite');
    });
  });

  describe('getFallbackModel', () => {
    it('falls back from pro to flash', () => {
      expect(getFallbackModel('pro')).toBe('flash');
    });

    it('returns null when current model is flash or flash_lite (no further fallback)', () => {
      expect(getFallbackModel('flash')).toBeNull();
      expect(getFallbackModel('flash_lite')).toBeNull();
    });
  });
});
