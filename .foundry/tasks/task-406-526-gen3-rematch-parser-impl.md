---
id: task-406-526-gen3-rematch-parser-impl
type: TASK
title: Implement Gen 3 NPC Rematch Status Parser
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-397-406-gen3-npc-rematch-status
tags:
  - task
  - gen3
  - secret-base
  - rematch
  - parser
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Implement Gen 3 NPC Rematch Status Parser

## Context
As part of tracking the daily rematch status for NPC trainers extracted from mixed records in Gen 3 Secret Bases, we need to implement the core parsing logic and extraction routines.

## Objectives
- Define the memory offsets, lengths, bit locations, and array bounds as reusable module-level constants.
- Implement the parsing logic to extract the daily rematch status using the `DataView` API.
- Ensure strict adherence to Section 13 of `.foundry/docs/schema.md` (e.g., catching `RangeError`, using relative offsets).

## Acceptance Criteria
- [x] Implement module-level constants for the rematch status parsing.
- [x] Implement the extraction logic for NPC rematch status.
- [x] Write unit tests for the parsing logic.
