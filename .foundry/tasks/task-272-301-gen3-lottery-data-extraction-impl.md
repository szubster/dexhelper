---
id: task-272-301-gen3-lottery-data-extraction-impl
type: TASK
title: Implement Gen3 Lottery Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-10'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: '3518004521435660697'
pr_number: null
parent: story-133-272-gen3-lottery-data-extraction
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen3 Lottery Data Extraction

## Context
We need to extract the daily winning lottery number from Gen3 save files. This requires reading a 16-bit number from the appropriate memory block.

## Requirements
1. **Identify Memory Offsets**: If the exact offsets are not currently documented in our knowledge base, you MUST research or derive the correct memory offsets for the daily lottery PRNG seed/winning number in Ruby, Sapphire, Emerald, and FireRed/LeafGreen save blocks. (Late-bind a RESEARCH node if absolutely necessary, but try to locate the offset).
2. **Implement Parser**: Use the `DataView` API to safely extract the 16-bit lottery number.
3. **Reusable Constants**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable module-level constants. Inline magic numbers are strictly forbidden when drafting blueprints for save file parsing.
4. **Error Handling**: Implement graceful error handling (e.g. bounds checking on the DataView buffer).

## Coder Persona Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g. if the parser was already implemented in another PR), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Locate and define exact memory offsets as module-level constants.
- [x] Implement robust `DataView` parsing logic for the 16-bit lottery number.
