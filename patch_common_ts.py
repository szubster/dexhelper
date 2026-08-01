import re

with open('src/engine/saveParser/parsers/common.ts', 'r') as f:
    content = f.read()

# Add fully expanded IVs to PokemonInstance
ivs_field = "  ivs?: { hp: number; attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number };"

content = content.replace(
    "  dvs?: { hp: number; atk: number; def: number; spd: number; spc: number };",
    "  dvs?: { hp: number; atk: number; def: number; spd: number; spc: number };\n" + ivs_field
)

with open('src/engine/saveParser/parsers/common.ts', 'w') as f:
    f.write(content)
