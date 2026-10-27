---
id: task-582-708-gen3-secret-base-party-extraction
type: TASK
title: Gen 3 Secret Base Party Extraction Implementation
status: READY
owner_persona: coder
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on:
  - task-582-707-gen3-secret-base-party-types
jules_session_id: null
pr_number: null
parent: story-569-582-gen3-secret-base-party-extraction
tags:
  - dexhelper
  - gen3
  - secret-base
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 30
---

# TASK: Gen 3 Secret Base Party Extraction Implementation

## Context
Following the creation of types and constants, implement the actual logic to extract the NPC party for each Secret Base owner.

## Requirements
- Parse the party pokemon data according to Gen 3 save format structure.
- Catch `RangeError` for out-of-bounds reads and throw a "The save file is corrupted or incomplete." error.
- Use relative offsets with `section1Offset` or `section2Offset` since it's a Gen 3 save file block.

## Acceptance Criteria
- [ ] Implement Gen 3 Secret Base NPC Party extraction.
- [ ] Ensure extraction uses section offsets for A/B flash support.
- [ ] Add unit tests verifying extraction behavior with both valid and corrupted input arrays.
