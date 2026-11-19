import re

with open('src/engine/saveParser/parsers/__tests__/gen2Wild.test.ts', 'r') as f:
    content = f.read()

# Fix the dangling parenthesis and wrap the last test in a describe block correctly
content = re.sub(
    r"\n\}\);\n\n\}\);\n\n  it\('should extract when zero slot bypass happens', \(\) => \{\n    const _buffer = new ArrayBuffer\(20\);\n\n    const area = extractGen2WildEncounterArea\(view, 0, 1, 1, 'other_method_meaning_seven'\);\n    expect\(area\.encounters\)\.toHaveLength\(0\);\n  \}\);\n\}\);\n",
    "\n});\n\ndescribe('extractGen2WildEncounterArea - edge cases (zero slot loop bypass)', () => {\n  it('should extract when zero slot bypass happens', () => {\n    const buffer = new ArrayBuffer(20);\n    const view = new DataView(buffer);\n\n    const area = extractGen2WildEncounterArea(view, 0, 1, 1, 'other_method_meaning_seven');\n    expect(area.encounters).toHaveLength(0);\n  });\n});\n",
    content,
    flags=re.DOTALL
)

with open('src/engine/saveParser/parsers/__tests__/gen2Wild.test.ts', 'w') as f:
    f.write(content)
