import re

with open('tests/e2e/mock-utils.spec.ts', 'r') as f:
    content = f.read()

# Fix mock-utils mockOfflineState evaluation destroyed due to navigation error
# It seems `window.offlineFired` is not being properly evaluated or timing out.
# Let's revert back to `page.evaluate` but perhaps put it in a try-catch, or just wait for network idle.
# Wait! In tests/e2e/mock-utils.spec.ts, we mock offline state.
# mockOfflineState dispatches events.
# We should probably use `page.evaluate` and `page.waitForFunction` more carefully.

# Let's replace the whole test for now to just check if `navigator.onLine` works.
# Actually, the error says: Error: page.evaluate: Execution context was destroyed, most likely because of a navigation
# Why would there be navigation?
# Because `await page.goto('/')` might still be loading?

new_test_content = """
  test('mockOfflineState should set offline status and trigger events', async ({ page }) => {
    await page.goto('/_empty.html'); // Just use a blank page or wait until network idle
    await page.waitForLoadState('networkidle');

    // Set up event listeners
    await page.evaluate(() => {
      window.offlineFired = false;
      window.onlineFired = false;
      window.addEventListener('offline', () => {
        window.offlineFired = true;
      });
      window.addEventListener('online', () => {
        window.onlineFired = true;
      });
    });

    await mockOfflineState(page, true);

    await page.waitForFunction(() => !navigator.onLine);
    const offlineFired = await page.evaluate(() => window.offlineFired);

    expect(offlineFired).toBe(true);

    await mockOfflineState(page, false);

    await page.waitForFunction(() => navigator.onLine);
    const onlineFired = await page.evaluate(() => window.onlineFired);

    expect(onlineFired).toBe(true);
  });
"""

# Let's just sed replace the block.
import textwrap
content = re.sub(r"test\('mockOfflineState should set offline status and trigger events', async \(\{ page \}\) => \{.*?\n  \}\);", new_test_content.strip(), content, flags=re.DOTALL)

with open('tests/e2e/mock-utils.spec.ts', 'w') as f:
    f.write(content)
