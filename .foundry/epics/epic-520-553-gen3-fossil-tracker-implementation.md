---
id: epic-520-553-gen3-fossil-tracker-implementation
type: EPIC
title: Gen 3 Fossil Tracker Implementation
status: PENDING
owner_persona: story_owner
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on:
  - epic-520-552-gen3-fossil-memory-research
jules_session_id: null
locks: []
pr_number: null
parent: prd-422-520-gen3-fossil-revival-tracker
tags:
  - gen3
  - dexhelper
  - tracking
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Fossil Tracker Implementation

## Context
Provide DexHelper users with a UI tracker for fossil revival processes in Generation 3 games. It will parse the save file to determine if a fossil is currently being revived, which fossil it is, and whether the revived Pokémon is ready for pickup.

## Objectives
- Implement the save parsing extraction logic for Gen 3 fossil states using the documented offsets.
- Build the UI component on the DexHelper dashboard to display the active revival status.
- UI must adhere to the tactical hardware aesthetic (`rounded-none`, `border-dashed`, `font-mono`).

## Acceptance Criteria
- [ ] Break down this Epic into Stories for the data extraction layer and the UI layer, including a final E2E Verification Story.
