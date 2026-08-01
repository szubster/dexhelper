import re

with open('.foundry/tasks/task-273-327-living-dex-pc-mapping-impl.md', 'r') as f:
    content = f.read()

content = content.replace(
    "- [ ] Implement data mapping functions to extract PC Box and Slot locations for owned Pokémon.",
    "- [x] Implement data mapping functions to extract PC Box and Slot locations for owned Pokémon."
)
content = content.replace(
    "- [ ] Parse PC Box data correctly according to Gen 3 architecture specifications.",
    "- [x] Parse PC Box data correctly according to Gen 3 architecture specifications."
)

with open('.foundry/tasks/task-273-327-living-dex-pc-mapping-impl.md', 'w') as f:
    f.write(content)
