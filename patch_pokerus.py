import re

with open("tests/e2e/pokerus.spec.ts", "r") as f:
    content = f.read()

# Instead of relying on a first child, let's explicitly click the correct row button.
# Looking at the original:
# await bulbaRow.locator('button[title*="down"]').first().click();

# It may be that there are multiple buttons or the button isn't immediately clickable.
content = content.replace("await bulbaRow.locator('button[title*=\"down\"]').first().click();", "await bulbaRow.locator('button[title*=\"down\"]').click();")
content = content.replace("await newBulbaRow.locator('button[title*=\"down\"]').first().click();", "await newBulbaRow.locator('button[title*=\"down\"]').click();")

with open("tests/e2e/pokerus.spec.ts", "w") as f:
    f.write(content)
