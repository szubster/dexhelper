import re

with open('src/engine/saveParser/parsers/__tests__/gen2Wild.test.ts', 'r') as f:
    content = f.read()

# Fix the broken `fakeView` code block that was partially removed
content = re.sub(
    r"describe\('extractGen2WildEncounterArea - more cases', \(\) => \{\n      \},\n    \} as unknown as DataView;",
    r"describe('extractGen2WildEncounterArea - more cases', () => {\n  it('should throw other errors', () => {\n    const fakeView = {\n      getUint8: () => {\n        throw new Error('Some random error');\n      },\n    } as unknown as DataView;",
    content,
    flags=re.DOTALL
)

with open('src/engine/saveParser/parsers/__tests__/gen2Wild.test.ts', 'w') as f:
    f.write(content)
