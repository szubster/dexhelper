import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const SAFE_BASH_PATH = path.resolve(dirname, 'safe_bash.sh');

describe('safe_bash.sh unit tests', () => {
  it('should prevent execution of tail -f', () => {
    expect.hasAssertions();
    let status = 0;
    let stderr = '';
    try {
      execSync(`"${SAFE_BASH_PATH}" tail -f something.log`);
    } catch (error: unknown) {
      const execError = error as { status?: number; stderr?: { toString: () => string } };
      status = execError.status ?? 0;
      stderr = execError.stderr ? execError.stderr.toString() : '';
    }
    expect(status).toBe(1);
    expect(stderr).toContain("Error: Static analysis detected a known blocking command ('tail -f').");
    expect(stderr).toContain('Execution prevented to avoid infinite hangs.');
    expect(stderr).toContain("Please use non-blocking alternatives like 'cat' or 'tail -n'.");
  }, 10_000);

  it('should allow regular tail', () => {
    expect.hasAssertions();
    const out = execSync(`"${SAFE_BASH_PATH}" tail something.log 2>&1 || true`).toString().trim();
    // It shouldn't get intercepted by the wrapper. The output might be empty or a file not found error from tail itself, but not the wrapper error.
    expect(out).not.toContain("Error: Static analysis detected a known blocking command ('tail -f').");
  }, 10_000);

  it('should allow tail -n', () => {
    expect.hasAssertions();
    const out = execSync(`"${SAFE_BASH_PATH}" tail -n 10 something.log 2>&1 || true`).toString().trim();
    expect(out).not.toContain("Error: Static analysis detected a known blocking command ('tail -f').");
  }, 10_000);
});
