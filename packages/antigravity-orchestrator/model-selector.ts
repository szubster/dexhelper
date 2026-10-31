import type { ModelTier } from './types.ts';

export const COMPLEX_PERSONAS = [
  'architect',
  'architect_visionary',
  'tech_lead',
  'tech-lead',
  'coder',
];

/**
 * Checks if a given persona is considered complex (warranting the 'pro' model tier).
 */
export function isComplexPersona(persona: string): boolean {
  if (!persona) return false;
  const normalized = persona.trim().toLowerCase();
  const normalizedUnderscore = normalized.replace(/-/g, '_');
  return COMPLEX_PERSONAS.includes(normalized) || COMPLEX_PERSONAS.includes(normalizedUnderscore);
}

/**
 * Resolves the initial model tier for a given persona.
 * Explicit model choice overrides defaults.
 */
export function resolveInitialModel(persona: string, explicitModel?: ModelTier): ModelTier {
  if (explicitModel) {
    return explicitModel;
  }
  return isComplexPersona(persona) ? 'pro' : 'flash';
}

/**
 * Provides a fallback model tier if the current model tier encounters errors,
 * quota, or capacity constraints.
 */
export function getFallbackModel(currentModel: ModelTier): ModelTier | null {
  if (currentModel === 'pro') {
    return 'flash';
  }
  return null;
}
