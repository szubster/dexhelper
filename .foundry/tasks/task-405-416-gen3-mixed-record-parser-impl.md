---
id: task-405-416-gen3-mixed-record-parser-impl
type: TASK
title: Implement Gen 3 Mixed Record Parser
status: ACTIVE
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-18'
depends_on:
  - task-405-415-gen3-mixed-record-types-impl
jules_session_id: '16541727014282416387'
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

# TASK: Implement Gen 3 Mixed Record Parser

## Context
With the types and offsets defined, we need to implement the actual parsing logic to extract Gen 3 Mixed Record NPC Data.

## Acceptance Criteria
- [ ] Implement a parsing function using the defined constants and the `DataView` API.
- [ ] Ensure strict adherence to Section 13 of `.foundry/docs/schema.md` (no magic numbers, relative offsets, RangeError handling).
- [ ] Write unit tests demonstrating correct extraction.
