---
id: research-101-157-gen3-condition-stats-offsets
type: RESEARCH
title: Investigate Gen 3 Condition Stats Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '17763118581367502632'
pr_number: null
parent: task-101-157-gen3-condition-stats-parsing
tags:
  - research
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Gen 3 Condition Stats Offsets

## Context
During the implementation of `task-101-157-gen3-condition-stats-parsing`, it was determined that the exact memory offsets and block structures for Contest Condition statistics (Cool, Beauty, Cute, Smart, Tough) in the Gen 3 save format are undocumented in the current knowledge base.

## Instructions
1. Investigate the Gen 3 save data structure (Ruby, Sapphire, Emerald) to determine where Pokémon Condition statistics are stored.
2. Document the exact block, section, offset, and size for these stats within the Pokémon data structure.
3. Identify how the 5 values (Cool, Beauty, Cute, Smart, Tough) are packed or sequenced in memory.
4. Update the knowledge base (e.g., in `.foundry/docs/knowledge_base/`) with these findings.

## Acceptance Criteria
- [x] Memory offsets and structure for Gen 3 Condition stats are fully documented in the knowledge base.
- [x] The exact block, offset, and size for Cool, Beauty, Cute, Smart, and Tough are identified.
