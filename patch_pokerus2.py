with open("tests/e2e/pokerus.spec.ts", "r") as f:
    content = f.read()

content = content.replace("await bulbaRow.locator('button[title*=\"down\"]').click();", "await bulbaRow.getByRole('button', { name: /down/i }).click();")
content = content.replace("await newBulbaRow.locator('button[title*=\"down\"]').click();", "await newBulbaRow.getByRole('button', { name: /down/i }).click();")

with open("tests/e2e/pokerus.spec.ts", "w") as f:
    f.write(content)
