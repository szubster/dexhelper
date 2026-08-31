---
id: task-405-485-gen3-mixed-record-parser-impl-v2
type: TASK
title: Implement Gen 3 Mixed Record Parser v2
status: COMPLETED
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-31'
depends_on:
  - research-405-471-investigate-mixed-record-parser-failure
jules_session_id: null
pr_number: null
parent: story-397-405-gen3-mixed-record-npc-data
tags:
  - task
  - gen3
  - mixed-records
  - parser
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Mixed Record Parser v2

## Context
Following the research into the failure of the initial implementation, this task implements the parsing logic to extract Gen 3 Mixed Record NPC Data.

## Acceptance Criteria
- [x] Implement a parsing function using the defined constants and the `DataView` API based on the research findings.
- [x] Ensure strict adherence to Section 13 of `.foundry/docs/schema.md` (no magic numbers, relative offsets, RangeError handling).
- [x] Write unit tests demonstrating correct extraction.
