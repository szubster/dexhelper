import re
with open('src/engine/saveParser/parsers/gen3.ts', 'r') as f:
    text = f.read()

print("GEN3_POKEMON_STRUCT_SIZE" in text)
