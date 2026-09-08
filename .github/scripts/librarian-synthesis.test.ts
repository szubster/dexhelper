import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { synthesizeRules } from './librarian-synthesis.ts';
import * as sessionApi from './session-api.ts';

vi.mock('./session-api.ts', () => {
    return {
        dispatchJulesSession: vi.fn<(...args: any[]) => Promise<string>>().mockResolvedValue('session-123')
    };
});

describe('Librarian Synthesis Script', () => {
    let originalApiKey: string | undefined;

    beforeEach(() => {
        originalApiKey = process.env.JULES_API_KEY;
        process.env.JULES_API_KEY = 'test-key';
        vi.clearAllMocks();
    });

    afterEach(() => {
        process.env.JULES_API_KEY = originalApiKey;
    });

    it('should throw if JULES_API_KEY is not set', async () => {
        delete process.env.JULES_API_KEY;
        await expect(synthesizeRules('test')).rejects.toThrow('JULES_API_KEY is required to synthesize rules.');
    });

    it('should dispatch Jules session', async () => {
        const result = await synthesizeRules('Agent logged an issue with scratchpads.');
        expect(result).toBe('Rules synthesis dispatched to Jules.');
        expect(sessionApi.dispatchJulesSession).toHaveBeenCalled();
    });
});
