import re

with open('scripts/generate-pokedata.ts', 'r') as f:
    content = f.read()

target = """const POKEAPI_TO_GEN1_ITEM: Record<number, number> = {
  81: 0x0a, // Moon Stone
  82: 0x20, // Fire Stone
  83: 0x21, // Thunder Stone
  84: 0x22, // Water Stone
  85: 0x2f, // Leaf Stone
};"""

content = content.replace(target, '')

with open('scripts/generate-pokedata.ts', 'w') as f:
    f.write(content)
