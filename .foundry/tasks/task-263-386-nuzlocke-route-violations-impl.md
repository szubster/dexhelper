---
id: task-263-386-nuzlocke-route-violations-impl
type: TASK
title: Implement Nuzlocke Route Violations Validation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-097-263-flag-nuzlocke-route-violations
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Nuzlocke Route Violations Validation

## Objective
Implement validation logic for Nuzlocke rules to compare the extracted catching history and flag violations where multiple Pokémon share the same `met_location`. Output these violations in a structured format.

## Requirements
- Identify duplicate Pokémon per route based on their `met_location`.
- Provide a structured output of flagged violations, detailing the Pokémon involved and the duplicated route.
- Strictly adhere to all guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [x] Logic correctly identifies route duplicates based on `met_location`.
- [x] Structured output format is implemented for the flagged violations.
- [x] Code follows all Save File Parsing & Extraction Guidelines.
