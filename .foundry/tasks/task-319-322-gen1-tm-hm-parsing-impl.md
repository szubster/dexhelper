---
id: task-319-322-gen1-tm-hm-parsing-impl
type: TASK
title: Gen 1 TM/HM Save Parsing Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: '11548072071200028671'
pr_number: null
parent: story-306-319-gen1-tm-hm-parsing
tags:
  - feature
  - gen1
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 TM/HM Save Parsing Implementation

## Context
Implement the data extraction for the Gen 1 save file Item Bag to extract the player's current TM and HM inventory. This task requires mapping the parsed TM/HM items to their corresponding moves and extracting Event Flags to determine if one-time TMs have already been collected.

## Constraints & Requirements
1. **Full Property Names**: You MUST adhere to ADR 015 regarding full `PokeData` property names.
2. **Module-Level Constants**: You MUST follow ADR 028 for dynamic save block extraction. All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
3. **Failure State Handling**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
4. **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement parsing logic for Gen 1 TM/HM items in the Item Bag.
- [x] Map TM/HM items to their corresponding moves.
- [x] Implement event flag extraction for one-time TMs.
- [x] Extract memory offsets into reusable module-level constants.
- [x] Write unit tests verifying TM/HM extraction and event flag mapping.
