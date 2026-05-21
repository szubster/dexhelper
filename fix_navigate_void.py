import re

with open("src/components/StorageGrid.tsx", "r") as f:
    content = f.read()

# Add void to navigate
search_pattern = r"""navigate\(\{ to: \`/pokemon/\$\{id\}\`, search: \{ from: '/storage' \} \}\);"""
replace_code = """void navigate({ to: `/pokemon/${id}`, search: { from: '/storage' } });"""

content = re.sub(search_pattern, replace_code, content)

with open("src/components/StorageGrid.tsx", "w") as f:
    f.write(content)
