import { beforeEach, describe, expect, it, vi } from 'vitest';
import { evaluateSemanticCondition } from './evaluator';

describe('evaluateSemanticCondition', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>());
    vi.stubEnv('JULES_API_KEY', 'test-key');
  });

  it('throws an error if API key is missing', async () => {
    vi.unstubAllEnvs();
    await expect(evaluateSemanticCondition('condition', 'prompt', '')).rejects.toThrow(
      'JULES_API_KEY is required for semantic evaluation.',
    );
  });

  it('returns evaluation result on success', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn<() => Promise<unknown>>().mockResolvedValue({
        candidates: [
          {
            content: {
              parts: [{ text: JSON.stringify({ isEquivalent: true, reasoning: 'Matches.' }) }],
            },
          },
        ],
      }),
    };

    // Use a type assertion that bypasses the warning, or omit 'as any'
    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    const result = await evaluateSemanticCondition('is greeting', 'hello');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=test-key',
      ),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    expect(result).toEqual({ isEquivalent: true, reasoning: 'Matches.' });
  });

  it('throws an error if the API request fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    };

    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    await expect(evaluateSemanticCondition('condition', 'prompt')).rejects.toThrow(
      'LLM API request failed with status 500',
    );
  });

  it('throws an error if parsing JSON response fails', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn<() => Promise<unknown>>().mockResolvedValue({
        candidates: [
          {
            content: {
              parts: [{ text: 'invalid json' }],
            },
          },
        ],
      }),
    };

    vi.mocked(fetch).mockResolvedValue(mockResponse as unknown as Response);

    await expect(evaluateSemanticCondition('condition', 'prompt')).rejects.toThrow(
      'Failed to parse LLM response as JSON',
    );
  });
});
