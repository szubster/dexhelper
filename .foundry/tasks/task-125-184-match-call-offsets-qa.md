---
id: task-125-184-match-call-offsets-qa
type: TASK
title: QA - Verify Gen 3 Match Call Offset Definitions
status: PENDING
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - task-125-183-match-call-offsets-impl
jules_session_id: null
pr_number: null
parent: story-083-125-gen3-match-call-memory-offset-discovery
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
  - qa
research_references:
  - .foundry/research/research-125-173-gen3-match-call-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Verify Gen 3 Match Call Offset Definitions

## Overview
Verify the coder's implementation of the memory offset constants and type definitions for the Match Call data block in Gen 3 Pokémon Emerald `.sav` files.

## Verification Details
Ensure the coder correctly implemented the offsets discovered in `research-125-173-gen3-match-call-offsets.md` in `task-125-183-match-call-offsets-impl`.
- Verify the constants for the starting offset and length of the Match Call memory block.
- Verify byte mapping and exact bitwise locations for rematch readiness flags.
- Verify memory locations and structure of rematch tier states.
- Ensure the implementation strictly adheres to ADR 010 (bounds checking).

## Acceptance Criteria
- [ ] Verify offset constants for the Match Call data block.
- [ ] Verify offset constants for rematch readiness flags.
- [ ] Verify offset constants for rematch tier states.
- [ ] Verify adherence to ADR 010.

## Instructions
- If the implementation is incorrect, mark the target node `task-125-183-match-call-offsets-impl` as FAILED, provide a `rejection_reason`, and increment its `rejection_count`. DO NOT change this QA task's status to FAILED.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.