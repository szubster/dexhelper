---
id: task-268-261-gen3-move-tutor-frlg-parsing-impl
type: TASK
title: Implement Gen 3 FRLG Move Tutor Flags Parsing
status: PENDING
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-268-gen3-move-tutor-frlg-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - frlg
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 FRLG Move Tutor Flags Parsing

## Objective
Implement DataView-based extraction of FireRed and LeafGreen Move Tutor flags from the save file's `event_flags`.

## Context
FRLG tracks Move Tutor usages within a continuous bit array of `event_flags`.
According to `gen3_move_tutor_offsets.md`, the flags and offsets for FRLG are:
- Double-Edge: `+0x58`, bit `0`
- Thunder Wave: `+0x58`, bit `1`
- Rock Slide: `+0x58`, bit `2`
- Explosion: `+0x58`, bit `3`
- Mega Punch: `+0x58`, bit `4`
- Mega Kick: `+0x58`, bit `5`
- Dream Eater: `+0x58`, bit `6`
- Soft-Boiled: `+0x58`, bit `7`
- Substitute: `+0x59`, bit `0`
- Swords Dance: `+0x59`, bit `1`
- Seismic Toss: `+0x59`, bit `2`
- Counter: `+0x59`, bit `3`
- Metronome: `+0x59`, bit `4`
- Mimic: `+0x59`, bit `5`
- Body Slam: `+0x59`, bit `6`
- Frenzy Plant: `+0x5B`, bit `6`
- Blast Burn: `+0x5B`, bit `7`
- Hydro Cannon: `+0x5C`, bit `0`

## Rules
- You MUST explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- You MUST use the `DataView` API exclusively and catch `RangeError` on out-of-bounds reads gracefully as mandated by ADR 010.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement FRLG Move Tutor parsing logic using DataView.
- [ ] Define all memory offsets, lengths, bit locations, and shifts as reusable constants at the module level.
- [ ] Catch `RangeError` exceptions and gracefully handle out-of-bounds reads.