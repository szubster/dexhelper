---
id: epic-053-103-relative-offsets-adr
type: EPIC
title: Relative Offsets ADR
status: PENDING
owner_persona: story_owner
created_at: '2026-06-27'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-084-053-standardize-relative-offsets
tags:
  - architecture
  - save-parsing
  - offset-mapping
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Relative Offsets ADR

## Objective
Investigate if a linter rule can be built to flag hardcoded offsets during save parsing. If a linter is not feasible, establish a strict architectural ADR mandating relative offset mapping for dynamic save block extraction.

## Context
Currently, save file extraction uses absolute hardcoded offsets for dynamic blocks, which can lead to unpredictable behavior and regressions.

## Acceptance Criteria
- [x] Investigate linter feasibility.
- [x] Create ADR or implement linter rule.

## Child Stories
- [x] story-103-245-investigate-offset-linter
- [x] story-103-246-create-relative-offsets-adr

## Auditor Learnings & Follow-ups
Based on the finding that tooling cannot automatically enforce offset rules, a follow-up node has been spawned to retroactively apply ADR 028 to legacy parsing code:
Follow-up spawned: idea-104-refactor-existing-parsers-adr-028
