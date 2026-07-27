---
id: task-261-332-npc-trade-state-integration-qa
type: TASK
title: NPC Trade State Integration QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-07-27'
depends_on:
  - task-261-331-npc-trade-state-integration-impl
jules_session_id: '682146954706425586'
pr_number: null
parent: story-119-261-npc-trade-state-integration
tags:
  - backend
  - qa
  - state-integration
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: NPC Trade State Integration QA

## Objective
Verify the implementation of NPC Trade State Integration into the `SaveData` object, ensuring correct behavior, error handling, and robust test coverage.

### QA Notes
- 2026-07-25: Rejected `task-261-331-npc-trade-state-integration-impl`. The tests in `gen3.test.ts` do not verify the integration into the `SaveData` object, and the `parseGen3` function incorrectly uses `section2Offset` instead of `section1Offset` for Emerald and FRLG.

## Context and Constraints
- The `qa` persona MUST verify that the `coder` correctly implemented the state integration logic for NPC Trade flags.
- Verify that the `SaveData` object is updated accurately.
- Verify that `RangeError` is correctly caught and a new Error with the message "The save file is corrupted or incomplete." is thrown.
- Verify that all memory offsets and lengths are defined as reusable constants at the module level and that inline magic numbers are not used.
- Verify that Gen 3 calculations use the relative `section1Offset` rather than absolute hardcoded offsets.
- If a transient failure requiring retry is experienced, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task must be permanently aborted, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If an empty PR is submitted for a completed task, all Acceptance Criteria checkboxes MUST be checked off before submitting.

## Acceptance Criteria
- [ ] Test coverage includes robust tests for `SaveData` updating correctly with `npcTradeFlags` (Gen 2) and `gen3NPCTrades` (Gen 3).
- [ ] Test coverage includes tests verifying `RangeError` is caught and the exact message "The save file is corrupted or incomplete." is thrown.
- [ ] No inline magic numbers exist for memory offsets/lengths; constants are properly used.
- [ ] Gen 3 parses with `section1Offset` as expected.
