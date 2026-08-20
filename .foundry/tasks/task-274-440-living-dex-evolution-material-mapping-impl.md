---
id: task-274-440-living-dex-evolution-material-mapping-impl
type: TASK
title: Living Dex Evolution Material Mapping Implementation
status: PENDING
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on:
  - task-274-439-living-dex-evolution-duplicate-logic-impl
jules_session_id: null
pr_number: null
parent: story-133-274-living-dex-evolution-material
tags:
  - living-dex
  - feature
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Living Dex Evolution Material Mapping Implementation

## Context
This task builds upon the duplicate detection logic to identify if any missing Living Dex slots (ghosts) can be filled by evolving an available duplicate pre-evolution.

## Acceptance Criteria
- [ ] Implement logic to cross-reference the list of missing Living Dex slots with the list of available duplicates.
- [ ] Use evolution metadata to determine if an available duplicate can evolve into any of the missing Pokemon.
- [ ] Return a structure linking the missing species ID to the duplicate pre-evolution species ID.
