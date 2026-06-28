---
id: task-105-214-gen3-roamer-parser-alternative-impl
type: TASK
title: Implement Gen 3 Roamer Alternative Parse Logic
status: READY
owner_persona: coder
created_at: '2026-06-22'
updated_at: '2026-06-28'
depends_on:
  - research-105-210-gen3-roamer-alternative
jules_session_id: null
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Alternative Parse Logic

## Objective
Implement binary parsing logic in `src/engine/saveParser/parsers/gen3.ts` to extract the available Gen 3 roaming data using the `DataView` API.

## Description
Based on the alternative approach research, update the Gen 3 parser to extract valid data for the roaming Pokémon (such as `speciesId`, `level`, and the `active` status boolean, or IVs) using the `DataView` API. Do NOT attempt to extract map location data. Ensure that the parser accurately reflects the roamer's active status. Ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers are forbidden.

## Acceptance Criteria
- [x] Parser extracts species ID and level using DataView.
- [x] Parser extracts active status flag using DataView.
- [x] Parser extracts available valid metadata (like IVs) using DataView.
- [x] Gracefully handles `RangeError` from out-of-bounds reads.
- [x] No inline magic numbers are used for parsing; all constants are defined at the module level.

## Execution Constraints
- **CRITICAL**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **CRITICAL**: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **CRITICAL**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
