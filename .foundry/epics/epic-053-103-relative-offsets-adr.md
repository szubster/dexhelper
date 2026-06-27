---
id: epic-053-103-relative-offsets-adr
type: EPIC
title: Relative Offsets ADR
status: PENDING
owner_persona: story_owner
created_at: '2026-06-27'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-084-053-standardize-relative-offsets
tags:
  - architecture
  - save-parsing
  - offset-mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Relative Offsets ADR

## Objective
Investigate if a linter rule can be built to flag hardcoded offsets during save parsing. If a linter is not feasible, establish a strict architectural ADR mandating relative offset mapping for dynamic save block extraction.

## Context
Currently, save file extraction uses absolute hardcoded offsets for dynamic blocks, which can lead to unpredictable behavior and regressions.

## Acceptance Criteria
- [ ] Investigate linter feasibility.
- [ ] Create ADR or implement linter rule.
