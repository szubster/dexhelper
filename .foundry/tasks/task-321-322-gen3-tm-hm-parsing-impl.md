---
id: task-321-322-gen3-tm-hm-parsing-impl
type: TASK
title: Gen 3 TM/HM Parse - Implementation
status: READY
owner_persona: coder
created_at: '2026-07-15'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-306-321-gen3-tm-hm-parsing
tags:
  - feature
  - gen3
  - save-parsing
research_references:
  - .foundry/docs/knowledge_base/moveset-inventory-memory-offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 TM/HM Parse - Implementation

## Overview
Parse the Gen 3 save file Item Bag to extract the player's current TM and HM inventory.

## Technical Contract
- Implement logic to map parsed TM/HM items to their corresponding moves.
- Extract Event Flags to determine if one-time TMs have already been collected.
- **Architectural Constraints:**
  - Must adhere to ADR 015 regarding full `PokeData` property names. No short property names.
  - Must follow ADR 028 for dynamic save block extraction. All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
  - Since this is Gen 3 save file parsing, you MUST use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.

## Reminder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement Gen 3 TM/HM item bag parsing mapping items to moves.
- [ ] Extract Event Flags for one-time TM collection.
- [ ] Ensure all offsets/lengths/bit locations/shifts are module-level constants.
- [ ] Use resolved section offsets for relative memory offset calculations.
