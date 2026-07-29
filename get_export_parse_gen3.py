with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    text = f.read()

import re
matches = re.findall(r'export function parseGen3\w+\(', text)
print(matches)
