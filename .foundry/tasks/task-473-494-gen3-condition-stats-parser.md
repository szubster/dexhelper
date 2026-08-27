---
id: task-473-494-gen3-condition-stats-parser
type: TASK
title: Implement Gen 3 Contest Condition Stats Parser
status: PENDING
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - task-473-493-gen3-condition-stats-constants
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

# Implement Gen 3 Contest Condition Stats Parser

## Objective
Implement the logic to extract the Contest Condition stats using the `DataView` API and the newly defined module-level constants.

## Technical Context
- Read the 32-bit Personality Value at offset 0x00.
- Compute permutation logic to determine the substructure order and locate the EVs & Condition (E) substructure inside the Data section (offset 0x20).
- Calculate the absolute offset for the 'E' substructure.
- Add the internal offsets for Coolness, Beauty, Cuteness, Smartness, Toughness, and Feel to extract their values.
- Follow Section 13 guidelines from `.foundry/docs/schema.md`: catch `RangeError` for out-of-bounds reads and throw a new error with the appropriate message to prevent application crashes.

## Acceptance Criteria
- [ ] Implement parsing function using `DataView` API to extract Condition stats (Coolness, Beauty, Cuteness, Smartness, Toughness, Feel).
- [ ] Integrate the permutation logic to correctly locate the 'E' substructure in the decrypted block.
- [ ] Catch `RangeError` from `DataView` and throw the required error message as defined in the schema.
- [ ] Ensure all offset and size values use the module-level constants defined in the prerequisite task.
