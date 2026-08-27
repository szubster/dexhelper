---
id: task-473-493-gen3-condition-stats-constants
type: TASK
title: Define Gen 3 Contest Condition Stats Constants
status: PENDING
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-134-473-gen3-condition-stats-extraction-impl
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Define Gen 3 Contest Condition Stats Constants

## Objective
Define the module-level constants for the Gen 3 Contest Condition stats to avoid magic numbers in the parsing logic.

## Technical Context
- According to `.foundry/docs/knowledge_base/engine/save_parsing/gen3_condition_stats_offsets.md`, Condition stats are stored in the EVs & Condition (E) substructure (12 bytes).
- Define relative offsets for Coolness, Beauty, Cuteness, Smartness, Toughness, and Feel.
- Data section starts at 0x20 in the 100-byte structure.

## Acceptance Criteria
- [ ] Create or update the relevant Gen 3 constants file to include the substructure order lookup table permutations if not already present.
- [ ] Define reusable constants for the EVs & Condition (E) substructure relative offsets for Coolness, Beauty, Cuteness, Smartness, Toughness, and Feel.
- [ ] Define the sizes for each stat as constants.
