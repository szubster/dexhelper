---
id: idea-517-automated-magic-number-linter
type: IDEA
title: Automated Magic Number Linter for Save Parsing
status: ACTIVE
owner_persona: product_manager
created_at: 2026-09-06T00:00:00.000Z
updated_at: '2026-09-09'
depends_on: []
jules_session_id: '12560076010056737394'
parent: null
rejection_reason: ''
---
# IDEA: Automated Magic Number Linter for Save Parsing

## Description
Based on QA rejections in the Coder journal, agents frequently violate Section 13 by using magic numbers (e.g. `8`) instead of constants like `BITS_PER_BYTE` when parsing Gen 3 save data. We should implement an ESLint or Biome rule that automatically flags and rejects these magic bitwise numbers during pre-commit to prevent manual review friction.

## Acceptance Criteria
- [ ] Write PRD for Automated Magic Number Linter.
