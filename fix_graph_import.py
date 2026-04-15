import re

with open('src/engine/assistant/suggestionEngine.ts', 'r') as f:
    content = f.read()

content = re.sub(r"import \{ getDistanceToMap \} from '\.\./mapGraph/gen1Graph';\n", "", content)

with open('src/engine/assistant/suggestionEngine.ts', 'w') as f:
    f.write(content)
