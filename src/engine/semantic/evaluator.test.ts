import type { GoogleGenAI } from '@google/genai';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { evaluateSemanticCondition } from './evaluator';

describe('Semantic Evaluator', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true for semantically matching conditions', async () => {
    const mockClient = {
      models: {
        generateContent: vi.fn<(...args: unknown[]) => Promise<{ text: string }>>().mockResolvedValue({
          text: 'true',
        }),
      },
    } as unknown as GoogleGenAI;

    const result = await evaluateSemanticCondition(
      'The user is asking for a list of items',
      'Could you give me a list of your top 5 favorite movies?',
      mockClient,
    );
    expect(result).toBe(true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockClient.models.generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-2.5-flash',
      }),
    );
  });

  it('should return false for semantically non-matching conditions', async () => {
    const mockClient = {
      models: {
        generateContent: vi.fn<(...args: unknown[]) => Promise<{ text: string }>>().mockResolvedValue({
          text: 'false',
        }),
      },
    } as unknown as GoogleGenAI;

    const result = await evaluateSemanticCondition('The user is asking for a list of items', 'Hello world', mockClient);
    expect(result).toBe(false);
  });
});
