---
id: task-649-687-define-roamer-iv-glitch-types
type: TASK
title: Define Gen 3 Roamer IV Glitch Types
status: READY
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-398-649-gen3-roamer-iv-glitch-types-and-tests
tags:
  - gen3
  - roamer
  - iv-glitch
  - types
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Define Gen 3 Roamer IV Glitch Types

## Objective
Define the TypeScript types or enums to represent the state of the Gen 3 Roamer IV Glitch.

## Description
The Gen 3 Roamer IV Glitch discards the top bits of the 32-bit IV field, severely limiting the maximum IVs for certain stats. We need a clear type representation (e.g., a boolean flag or an enum) to indicate whether a roamer's IV spread is glitched. This task is strictly for defining the types in the appropriate core or types directory.

## Acceptance Criteria
- [ ] Create or update the types to include a representation for the Roamer IV glitch state.
