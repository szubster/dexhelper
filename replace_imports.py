import re

with open('src/engine/assistant/suggestionEngine.ts', 'r') as f:
    content = f.read()

# Add getStrategy import
content = re.sub(
    r"import type \{ EncounterDetail, RejectedSuggestion, Suggestion \} from './strategies/types';",
    "import type { EncounterDetail, RejectedSuggestion, Suggestion } from './strategies/types';\nimport { getStrategy } from './strategies/index';",
    content
)

# Remove unused imports
content = re.sub(r"GEN1_MAP_TO_SLUG,\n\s*", "", content)
content = re.sub(r"import \{ getUnobtainableReason \} from '\.\./exclusives/gen1Exclusives';\n", "", content)
content = re.sub(r"getDistanceToMap,\s*", "", content)
content = re.sub(r"import \{\s*\} from '\.\./mapGraph/gen1Graph';\n", "", content)

with open('src/engine/assistant/suggestionEngine.ts', 'w') as f:
    f.write(content)
