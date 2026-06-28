---
id: task-116-230-battle-frontier-parser-impl
type: TASK
title: Gen 3 Battle Frontier Data Parser
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-079-116-battle-frontier-dashboard-ui
tags:
  - feature
  - gen3
  - parser
research_references:
  - .foundry/docs/knowledge_base/gen3_battle_frontier_data.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Battle Frontier Data Parser

## Description
Implement a data parsing module for extracting the Battle Frontier data from Gen 3 (Emerald) save files. The parser needs to read the Battle Point (BP) wallet balance and the Frontier Brain encounter progress metrics for the 7 facilities.

## Implementation Guidelines
- Review `.foundry/docs/knowledge_base/gen3_battle_frontier_data.md` for memory structure and offset information.
- **Strict Constraint (ADR 010):** You MUST exclusively use the native `DataView` API for all read operations.
- **Strict Constant Requirement:** All memory offsets, array lengths, bit locations, and flag values MUST be defined as reusable constants at the module level. Inline magic numbers within the parsing logic are strictly forbidden.
- Integrate the parser into the Gen 3 save engine module (likely `src/engine/gen3/` or similar).

## Rejection & Completion Guidelines
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR because the parsing module is already fully implemented, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Define module-level constants for all Battle Frontier offsets and sizes.
- [ ] Implement a `DataView`-based parser function to extract BP balance.
- [ ] Implement extraction logic for Frontier Brain progress metrics (win streaks and symbol flags) across all 7 facilities.
- [ ] Write unit tests verifying parsing logic with mock `DataView` buffers.
