---
id: task-261-331-npc-trade-state-integration-impl
type: TASK
title: NPC Trade State Integration Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-07-21'
depends_on: []
jules_session_id: '16957303273743307147'
pr_number: null
parent: story-119-261-npc-trade-state-integration
tags:
  - backend
  - state-integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: NPC Trade State Integration Implementation

## Objective
Implement the logic to integrate the extracted NPC trade flags into the unified `SaveData` object, ensuring consistency and proper `RangeError` handling.

## Context and Constraints
- The `coder` MUST map the raw bitflags successfully extracted in previous tasks and integrate them into the unified `SaveData` structure for cross-generation compatibility.
- Ensure that `SaveData` property types for Gen 2 / Gen 1 (`npcTradeFlags`) and Gen 3 (`gen3NPCTrades`) are correctly populated. Wait, Gen 3 might need `npcTradeFlags` mapping too for unified downstream consumption if applicable, or downstream layers handle the mapping. Integrate properly according to architecture.
- If a transient failure requiring retry is experienced, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task must be permanently aborted, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If an empty PR is submitted for a completed task, all Acceptance Criteria checkboxes MUST be checked off before submitting.
- **CRITICAL:** When implementing parsing or data definitions, explicitly define and use reusable constants for memory offsets, lengths, bit locations, and shifts at the module level. Inline magic numbers are strictly forbidden.
- **CRITICAL:** For Gen 3 data parsing, use the resolved section offset (`section1Offset`) for relative Gen 3 calculations. Do not use absolute hardcoded offsets.
- **CRITICAL:** You must catch `RangeError` for out-of-bounds reads and explicitly throw a new error with the message "The save file is corrupted or incomplete."

## Acceptance Criteria
- [x] Integrate Gen 2 and Gen 3 extracted NPC trade flags into the unified `SaveData` object.
- [x] Ensure `SaveData` interface properties are correctly typed and updated if necessary.
- [x] Explicitly define and use reusable constants for memory offsets, lengths, and bit locations.
- [x] Use `section1Offset` for relative Gen 3 calculations.
- [x] Properly catch `RangeError` and throw the exact error message: "The save file is corrupted or incomplete."
