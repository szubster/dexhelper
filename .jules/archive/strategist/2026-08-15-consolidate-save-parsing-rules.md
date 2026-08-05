## 2026-08-15 - [Accepted] - Prompt Consolidation: Centralize Save File Parsing Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for save file parsing (avoiding magic numbers, using relative offsets for Gen 3, catching RangeError, and mapping bitwise offsets) were duplicated across `coder.md`, `tech_lead.md`, and `qa.md`. This verbosity wastes context window tokens and creates a maintenance burden if the rules change.
**Pattern:** Consolidate redundant architectural or implementation rules from agent prompts into centralized sections in `.foundry/docs/schema.md` (or other core docs) and have the agent prompts reference them. This enforces a single source of truth and reduces token usage.