import { test, expect, vi, describe, beforeEach, afterEach } from 'vitest';
import { checkSessionLiveliness } from './session-api';

describe('checkSessionLiveliness', () => {
    const MOCK_JULES_KEY = 'test_jules_key';
    const MOCK_SESSION_ID = 'test_session_id';

    let stderrWriteSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        // Suppress expected error logs during tests
        stderrWriteSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('returns TERMINATED on HTTP 404', async () => {
        // @ts-ignore
        global.fetch = vi.fn<any>(() => Promise.resolve({
            status: 404,
            ok: false
        }));

        const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
        expect(result).toBe('TERMINATED');
        expect(global.fetch).toHaveBeenCalledWith(`https://jules.googleapis.com/v1alpha/sessions/${MOCK_SESSION_ID}`, {
            headers: { 'X-Goog-Api-Key': MOCK_JULES_KEY }
        });
        expect(stderrWriteSpy).not.toHaveBeenCalled();
    });

    test('returns UNKNOWN on HTTP non-ok status (e.g. 500)', async () => {
        // @ts-ignore
        global.fetch = vi.fn<any>(() => Promise.resolve({
            status: 500,
            ok: false
        }));

        const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
        expect(result).toBe('UNKNOWN');
        expect(stderrWriteSpy).toHaveBeenCalledWith('[session-api] Jules API error: received status 500\n');
    });

    test('returns UNKNOWN on network fetch error', async () => {
        // @ts-ignore
        global.fetch = vi.fn<any>(() => Promise.reject(new Error('Network failure')));

        const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
        expect(result).toBe('UNKNOWN');
        expect(stderrWriteSpy).toHaveBeenCalledWith('[session-api] Jules API fetch error: Error: Network failure\n');
    });

    const activeStates = [
        'STATE_UNSPECIFIED',
        'QUEUED',
        'PLANNING',
        'AWAITING_PLAN_APPROVAL',
        'IN_PROGRESS',
        'PAUSED'
    ];

    for (const state of activeStates) {
        test(`returns ACTIVE for state: ${state}`, async () => {
            // @ts-ignore
            global.fetch = vi.fn<any>(() => Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve({ state })
            }));

            const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
            expect(result).toBe('ACTIVE');
        });
    }

    const terminatedStates = [
        'FAILED',
        'COMPLETED',
        'AWAITING_USER_FEEDBACK'
    ];

    for (const state of terminatedStates) {
        test(`returns TERMINATED for state: ${state}`, async () => {
            // @ts-ignore
            global.fetch = vi.fn<any>(() => Promise.resolve({
                status: 200,
                ok: true,
                json: () => Promise.resolve({ state })
            }));

            const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
            expect(result).toBe('TERMINATED');
        });
    }

    test('returns TERMINATED for unrecognized state', async () => {
        // @ts-ignore
        global.fetch = vi.fn<any>(() => Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve({ state: 'SOME_UNKNOWN_STATE' })
        }));

        const result = await checkSessionLiveliness(MOCK_SESSION_ID, MOCK_JULES_KEY);
        expect(result).toBe('TERMINATED');
    });
});
