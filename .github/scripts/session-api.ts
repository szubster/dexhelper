/**
 * session-api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Utility functions for interacting with the Jules API regarding session state.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export async function checkSessionLiveliness(sessionId: string, julesKey: string): Promise<string> {
  try {
    const res = await fetch(`https://jules.googleapis.com/v1alpha/sessions/${sessionId}`, {
      headers: { 'X-Goog-Api-Key': julesKey }
    });

    if (res.status === 404) {
      return 'TERMINATED';
    }

    if (!res.ok) {
      process.stderr.write(`[session-api] Jules API error: received status ${res.status}\n`);
      return 'UNKNOWN';
    }

    const data = await res.json() as any;
    const state = data.state;

    const activeStates = [
      'STATE_UNSPECIFIED',
      'QUEUED',
      'PLANNING',
      'AWAITING_PLAN_APPROVAL',
      'AWAITING_USER_FEEDBACK',
      'IN_PROGRESS',
      'PAUSED'
    ];

    if (state === 'FAILED' || state === 'COMPLETED') {
      return 'TERMINATED';
    }

    if (activeStates.includes(state)) {
      return 'ACTIVE';
    }

    // Fallback if state is unrecognized but request was ok
    return 'TERMINATED';
  } catch (err) {
    process.stderr.write(`[session-api] Jules API fetch error: ${String(err)}\n`);
    return 'UNKNOWN';
  }
}
