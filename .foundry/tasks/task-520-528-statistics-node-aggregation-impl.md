---
id: task-520-528-statistics-node-aggregation-impl
type: TASK
title: Implement Node State Aggregation Logic
status: READY
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-520-statistics-generation
tags:
  - metrics
  - orchestrator
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Node State Aggregation Logic

## Objective
Implement the logic to aggregate node states from `.foundry/` to generate statistics.

## Requirements
1. Create or update `.github/scripts/utils/statistics.ts`.
2. Implement logic to scan the `.foundry/` directory, including archives (`.foundry/archive/`), for all node files (`.md`).
3. Parse the YAML frontmatter of each node file to extract `type` and `status`.
4. Calculate and store the total counts grouped by node type and their current statuses.
5. Export this aggregation logic for use in the main report generation.

## Acceptance Criteria
- [ ] Node state aggregation logic implemented and tested.
- [ ] Correctly scans both active and archived `.foundry/` nodes.
- [ ] Parses frontmatter and correctly calculates counts by type and status.
