import re

with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    content = f.read()

# Remove unused variables to fix TS6133
content = re.sub(r'const PC_BOX_WALLPAPERS_OFFSET = 0x83c2;\n', '', content)
content = re.sub(r'const GROWTH_SPECIES_ID_OFFSET = 0;\n', '', content)
content = re.sub(r'const GROWTH_EXPERIENCE_OFFSET = 4;\n', '', content)

with open('src/engine/saveParser/parsers/gen3.ts', 'w') as f:
    f.write(content)
