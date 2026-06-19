---
id: task-125-183-match-call-offsets-impl
type: TASK
title: Implement Gen 3 Match Call Offset Definitions
status: ACTIVE
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-19'
depends_on:
  - research-125-173-gen3-match-call-offsets
jules_session_id: '1088392682780516067'
pr_number: null
parent: story-083-125-gen3-match-call-memory-offset-discovery
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
research_references:
  - .foundry/research/research-125-173-gen3-match-call-offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Match Call Offset Definitions

## Overview
Implement the memory offset constants and type definitions for the Match Call data block in Gen 3 Pokémon Emerald `.sav` files.

## Technical Details
Refer to the findings in `research-125-173-gen3-match-call-offsets.md`.
- Implement constants for the starting offset and length of the Match Call memory block.
- Define byte mapping and exact bitwise locations for rematch readiness flags.
- Define memory locations and structure of rematch tier states.

## Acceptance Criteria
- [x] Implement offset constants for the Match Call data block.
- [x] Implement offset constants for rematch readiness flags.
- [x] Implement offset constants for rematch tier states.
- [x] Conform to ADR 010.

## Instructions
- Ensure you read the associated research node.
- Only mark this node as FAILED if you encounter a transient failure requiring retry.
- Only mark this node as CANCELLED if you must abort or permanently fail.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
