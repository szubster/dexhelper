---
id: research-489-494-investigate-gen3-trainer-name
type: RESEARCH
title: 'Research: Investigate Gen 3 Trainer Name Offset and String Encoding'
status: READY
owner_persona: researcher
created_at: '2026-08-26'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-425-489-fixtures-integration-e2e-impl
tags:
  - testing
  - e2e
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 Trainer Name Offset and String Encoding

## Context
During E2E testing of the `emerald.sav` fixture integration, the tests failed to find the text "EMERALD" in the UI header. This was traced back to `src/engine/saveParser/parsers/gen3.ts`, which currently hardcodes `trainerName: ''` rather than extracting the player's Original Trainer name from the save file.

In Generation 3, string encoding and memory layout differ from Gen 1/2. We need to determine the correct offset for the OT Name in `SaveBlock1` and figure out how to decode it.

## Acceptance Criteria
- [ ] Determine the memory offset for the player's Trainer Name in Gen 3 SaveBlock1.
- [ ] Determine the character encoding system used for Gen 3 strings.
- [ ] Define the technical approach required to implement `decodeGen3String` (or similar) and integrate it into the `parseGen3` function to accurately extract `trainerName`.
