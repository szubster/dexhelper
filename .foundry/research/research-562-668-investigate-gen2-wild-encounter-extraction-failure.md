---
id: research-562-668-investigate-gen2-wild-encounter-extraction-failure
type: RESEARCH
title: Investigate Gen 2 Wild Encounter Extraction Logic Failure
status: READY
owner_persona: researcher
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - investigation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Investigate Gen 2 Wild Encounter Extraction Logic Failure

## Context
The task `task-562-579-gen2-wild-item-extraction-logic-impl` permanently failed and reached its max rejection count. We need to investigate why the coder or QA failed to extract the Gen 2 wild encounter and held item data, and provide the correct memory offsets, constraints, and instructions for the replacement task.

## Requirements
- Review the rejection history of `task-562-579-gen2-wild-item-extraction-logic-impl`.
- Identify the root cause of the failure (e.g. missing memory offsets, incorrect data structures, magic numbers).
- Provide the correct module-level constants and memory mappings for Gen 2 wild encounters and held items.
- Ensure compliance with `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Document the root cause of the previous failure.
- [ ] Provide explicit, accurate constants/offsets to unblock the coder.
