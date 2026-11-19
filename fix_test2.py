import re

with open('tests/e2e/mock-utils.spec.ts', 'r') as f:
    content = f.read()

# Fix mock-utils mockOfflineState evaluation destroyed due to navigation error
# Sometimes mockOfflineState sets the condition before the page loads/navigates or causes it.
# We should probably use page.waitForFunction or similar
# Looking at the original:
#     const isOffline = await page.evaluate(() => !navigator.onLine);
#     const offlineFired = await page.evaluate(() => window.offlineFired);

content = content.replace("const isOffline = await page.evaluate(() => !navigator.onLine);", "await page.waitForFunction(() => !navigator.onLine);\n    const isOffline = true;")
content = content.replace("const offlineFired = await page.evaluate(() => window.offlineFired);", "await page.waitForFunction(() => window.offlineFired);\n    const offlineFired = true;")
content = content.replace("const isOnline = await page.evaluate(() => navigator.onLine);", "await page.waitForFunction(() => navigator.onLine);\n    const isOnline = true;")
content = content.replace("const onlineFired = await page.evaluate(() => window.onlineFired);", "await page.waitForFunction(() => window.onlineFired);\n    const onlineFired = true;")

with open('tests/e2e/mock-utils.spec.ts', 'w') as f:
    f.write(content)
