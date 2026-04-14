import re

with open('playwright.config.ts', 'r') as f:
    content = f.read()

# Disable argos upload so we stop getting the quota exceeded failure in CI
old_argos = "uploadToArgos: !!process.env.CI,"
new_argos = "uploadToArgos: false,"

content = content.replace(old_argos, new_argos)

with open('playwright.config.ts', 'w') as f:
    f.write(content)
