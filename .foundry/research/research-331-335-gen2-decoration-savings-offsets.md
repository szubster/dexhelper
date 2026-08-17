---
id: research-331-335-gen2-decoration-savings-offsets
type: RESEARCH
title: Investigate Gen 2 Room Decoration & Bank Savings Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-19'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-322-331-gen2-decoration-savings-parsing-impl
tags:
  - gen2
  - engine
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 2 Room Decoration & Bank Savings Offsets

## Objective
Find the exact memory offsets for Gen 2 (Gold, Silver, Crystal) room decorations (bed, carpet, plant, poster, console, plushies) and Mom's bank account savings.

## Context
The Coder persona was tasked with implementing parser extraction for Gen 2 room decorations and Mom's bank savings (Task `task-322-331-gen2-decoration-savings-parsing-impl`). However, the exact memory offsets are missing from the documentation (`.foundry/docs/`).
As per the task's Architectural Constraints (ADR 028), guessing offsets is strictly forbidden.
The Coder has suspended the task and spawned this RESEARCH node to investigate the correct offsets.

## Acceptance Criteria
- [x] Find and document the exact memory offsets and data structures to read the flags for unlocked room decorations in Gen 2 (GS and Crystal).
- [x] Find and document the exact memory offsets to parse the money currently saved in Mom's bank account in Gen 2 (GS and Crystal).
- [x] Ensure all findings use relative offsets suitable for the parsing engine and are free of inline magic numbers.
- [x] Update the relevant `.foundry/docs/` documentation with the newly discovered offsets.
