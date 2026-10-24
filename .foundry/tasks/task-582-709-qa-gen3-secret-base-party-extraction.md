---
id: task-582-709-qa-gen3-secret-base-party-extraction
type: TASK
title: QA Gen 3 Secret Base Party Extraction
status: READY
owner_persona: qa
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on:
  - task-582-708-gen3-secret-base-party-extraction
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

# TASK: QA Gen 3 Secret Base Party Extraction

## Context
QA the Gen 3 Secret Base NPC party extraction logic implemented by the Coder.

## Requirements
- Verify that types and constants adhere to standards (PokeData Schema, no magic numbers).
- Verify that the extraction logic correctly processes the NPC party.
- Verify that `RangeError` is handled.

## Acceptance Criteria
- [ ] Verify PokeData property naming schema.
- [ ] Verify module-level constants are used.
- [ ] Verify extraction uses Gen 3 section offsets.
- [ ] Verify `RangeError` catching and throwing of correct message.
