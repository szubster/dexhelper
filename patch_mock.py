with open("tests/e2e/mock-utils.spec.ts", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip() == "const isOnline = await page.evaluate(() => navigator.onLine);":
        new_lines.append("    await page.waitForTimeout(50);\n")
    new_lines.append(line)
with open("tests/e2e/mock-utils.spec.ts", "w") as f:
    f.write("".join(new_lines))
