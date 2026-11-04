import re

with open('tests/e2e/pokerus.spec.ts', 'r') as f:
    content = f.read()

# Fix locator error for the tests
content = re.sub(r'button\[title\*="down"\]', r'button[aria-label*="down"]', content)
content = re.sub(r'button\[title\*="up"\]', r'button[aria-label*="up"]', content)

with open('tests/e2e/pokerus.spec.ts', 'w') as f:
    f.write(content)
