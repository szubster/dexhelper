import re

with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    content = f.read()

# Add PokemonInstance import
content = content.replace(
    "} from './common';",
    "  PokemonInstance,\n} from './common';"
)

with open('src/engine/saveParser/parsers/gen3.ts', 'w') as f:
    f.write(content)
