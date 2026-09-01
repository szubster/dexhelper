---
id: task-405-486-gen3-mixed-record-parser-qa-v2
type: TASK
title: QA Gen 3 Mixed Record Parser v2
status: READY
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-09-01'
depends_on:
  - task-405-485-gen3-mixed-record-parser-impl-v2
jules_session_id: null
pr_number: null
parent: story-397-405-gen3-mixed-record-npc-data
tags:
  - task
  - qa
  - gen3
  - mixed-records
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# TASK: QA Gen 3 Mixed Record Parser v2

## Context
Verify the implementation of the Gen 3 Mixed Record Parser.

## Acceptance Criteria
- [ ] Verify that the implementation strictly adheres to Section 13 of `.foundry/docs/schema.md`.
- [ ] Verify that there are no magic numbers.
- [ ] Verify that relative offsets are used.
- [ ] Verify that RangeErrors are handled correctly.
- [ ] Verify that the unit tests are comprehensive.

### QA Results: FAILED
The implementation in `src/engine/saveParser/gen3/mixedRecords/parser.ts` violates the "Save File Parsing & Extraction Guidelines" from Section 13 of `.foundry/docs/schema.md`.
Specifically, there is a magic number violation on line 25:
`if (personality === 0 || personality === 0xffffffff) {`

The numbers `0` and `0xffffffff` should be defined as module-level constants (e.g., `MIXED_RECORD_EMPTY_PERSONALITY_0` and `MIXED_RECORD_EMPTY_PERSONALITY_F`), as the use of inline magic numbers is strictly forbidden. The test file also contains similar magic number usages.

I have updated the target task `task-405-485-gen3-mixed-record-parser-impl-v2` to FAILED with an updated rejection_count and rejection_reason.
