---
id: task-294-332-gen3-static-encounter-flags-qa
type: TASK
title: QA Gen 3 Static Encounter Flags Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-07-18'
updated_at: '2026-07-20'
depends_on:
  - task-294-331-gen3-static-encounter-flags-impl
jules_session_id: '2213996123563302541'
pr_number: null
parent: epic-106-138-gen3-static-encounters
tags:
  - gen3
  - feature
  - parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Static Encounter Flags Parsing

Verify the implementation of `extractGen3StaticEncounterFlags`.

## Acceptance Criteria
- [x] Verify that all offsets and bit masks are module-level constants. No inline magic numbers.
- [x] Verify that DataView API `RangeError` is handled properly and throws "The save file is corrupted or incomplete."
- [x] Verify that relative offset calculations (`section1Offset + EVENT_FLAGS_START + offset`) are correctly applied.
