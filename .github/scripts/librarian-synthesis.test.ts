import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { synthesizeRules } from './librarian-synthesis.ts';

vi.mock('@google/genai', () => {
    return {
        GoogleGenAI: class MockGoogleGenAI {
            models = {
                generateContent: vi.fn<() => Promise<{text: string}>>().mockResolvedValue({
                    text: '- Always clean up temp files.'
                })
            };
        }
    };
});

describe('Librarian Synthesis Script', () => {
    let originalApiKey: string | undefined;

    beforeEach(() => {
        originalApiKey = process.env.GEMINI_API_KEY;
        process.env.GEMINI_API_KEY = 'test-key';
        vi.clearAllMocks();
    });

    afterEach(() => {
        process.env.GEMINI_API_KEY = originalApiKey;
    });

    it('should throw if GEMINI_API_KEY is not set', async () => {
        delete process.env.GEMINI_API_KEY;
        await expect(synthesizeRules('test')).rejects.toThrow('GEMINI_API_KEY is required to synthesize rules.');
    });

    it('should call Gemini API and return rules', async () => {
        const rules = await synthesizeRules('Agent logged an issue with scratchpads.');
        expect(rules).toBe('- Always clean up temp files.');
    });
});
