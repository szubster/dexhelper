---
id: story-137-294-diff-engine-logic
type: STORY
title: PC Box Diff Engine Logic
status: READY
owner_persona: tech_lead
created_at: '2026-07-10'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-106-137-pc-box-diff-engine-move-planner
tags:
  - algorithm
  - organization
  - diff
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: PC Box Diff Engine Logic

## Objective
Implement the core diffing engine that takes a current state of PC boxes and a target (sorted) state of PC boxes, and computes the exact differences (additions, removals, and relocations).

## Description
The diff engine must iterate through the current and target box arrays. Pokémon should be uniquely identified (e.g., using PID/TID/SID or specific hashes).
The engine will return a set of differences detailing which specific entity is currently at what location (box, slot) and where its final target location (box, slot) should be.

## Acceptance Criteria
- [x] task-294-316-diff-engine-impl
- [x] task-294-317-diff-engine-qa
- [x] Break down story into tasks for diff engine implementation.
- [ ] research-294-335-diff-engine-hash-failure
- [ ] task-294-336-diff-engine-hash-fix-impl
- [ ] task-294-337-diff-engine-hash-fix-qa
