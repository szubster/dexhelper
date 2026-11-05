import { execSync } from 'node:child_process';
import path from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Bash Timeout Wrapper E2E', () => {
  const safeBashPath = path.resolve(import.meta.dirname, '../../scripts/safe_bash.sh');

  test.beforeEach((_, testInfo) => {
    test.skip(testInfo.project.name !== 'Desktop FullHD', 'CLI test only needs a single project execution');
  });

  test('should execute a non-blocking command successfully', () => {
    // Run a simple echo command that should not timeout
    const result = execSync(`${safeBashPath} echo "Hello Timeout"`).toString().trim();
    expect(result).toBe('Hello Timeout');
  });

  test('should block known blocking commands before execution via static analysis', () => {
    try {
      execSync(`${safeBashPath} tail -f mylog.log`, { stdio: 'pipe' });
      // If it doesn't throw, the test should fail
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { status?: number; stderr?: { toString: () => string } };
      expect(err.status).toBe(1);
      if (err.stderr) {
        const stderr = err.stderr.toString();
        expect(stderr).toContain("Error: Static analysis detected a known blocking command ('tail -f').");
        expect(stderr).toContain('Execution prevented to avoid infinite hangs.');
        expect(stderr).toContain("Please use non-blocking alternatives like 'cat' or 'tail -n'.");
      } else {
        expect(true).toBe(false); // Force fail if stderr is missing
      }
    }
  });

  test('should terminate a blocking command and return exit code 124', () => {
    try {
      execSync(`SAFE_BASH_TIMEOUT=1 ${safeBashPath} sleep 3`, { stdio: 'pipe' });
      // If it doesn't throw, the test should fail
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { status?: number; stderr?: { toString: () => string } };
      expect(err.status).toBe(124);
      if (err.stderr) {
        const stderr = err.stderr.toString();
        expect(stderr).toContain('Command exceeded the 1 second threshold and was terminated.');
        expect(stderr).toContain("This is to prevent infinite hangs caused by blocking commands (e.g., 'tail -f').");
        expect(stderr).toContain("Please use non-blocking alternatives like 'cat' or 'tail -n'.");
      } else {
        expect(true).toBe(false); // Force fail if stderr is missing
      }
    }
  });
});
