---
id: task-109-247-parse-secret-base-trainer-party
type: TASK
title: Implement Gen 3 Secret Base Trainer and Party Parsing
status: READY
owner_persona: coder
created_at: '2026-06-30'
updated_at: '2026-07-08'
depends_on:
  - research-109-262-secret-base-party-offsets
jules_session_id: null
pr_number: null
parent: story-070-109-extract-mixed-record-trainer-data
tags:
  - gen3
  - save-parsing
  - secret-base
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Secret Base Trainer and Party Parsing

## Context
When players mix records in Gen 3, they exchange Secret Bases. We need to parse the `SecretBase` (or `SecretBaseRecord`) structures to extract the trainer details (name, ID) and their party composition.

## Objectives
Implement the logic to extract:
1. `trainerName` (7 chars in RS, 8 chars in Emerald, starts at offset 2).
2. `trainerId` (4 bytes, starts at offset 9 in RS, 10 in Emerald).
3. The `party` struct (108 bytes, starts at offset 52 in both).

## Technical Constraints & Directives
- **DataView API:** You MUST exclusively use the native `DataView` API for all read operations, and gracefully handle `RangeError` for out-of-bounds reads (ADR 010).
- **No Inline Magic Numbers:** All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level.
- **Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort permanently (impossible or max rejections), you MUST update to `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement parsing for `trainerName` and `trainerId` within the Secret Base struct.
- [ ] Implement parsing for the `SecretBaseParty` structure (6 Pokémon: personality, moves, species, heldItems, levels, EVs).
- [ ] Ensure all offsets and sizes are module-level constants.
- [ ] Exclusively use `DataView` API.
