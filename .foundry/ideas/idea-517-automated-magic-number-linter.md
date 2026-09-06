---
owner_persona: product_manager
status: ACTIVE
id: idea-517-automated-magic-number-linter
---
# IDEA: Automated Magic Number Linter for Save Parsing

## Description
Based on QA rejections in the Coder journal, agents frequently violate Section 13 by using magic numbers (e.g. `8`) instead of constants like `BITS_PER_BYTE` when parsing Gen 3 save data. We should implement an ESLint or Biome rule that automatically flags and rejects these magic bitwise numbers during pre-commit to prevent manual review friction.

## Acceptance Criteria
- [ ] Research available ESLint or Biome plugins for blocking magic numbers.
- [ ] Create an ADR for integrating this rule into the project's linter configuration.
- [ ] Break down into Epics.