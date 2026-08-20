---
id: task-274-439-living-dex-evolution-duplicate-logic-impl
type: TASK
title: Living Dex Duplicate Detection Logic Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '3485909990663108683'
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

# Task: Living Dex Duplicate Detection Logic Implementation

## Context
This task implements the core logic to detect when the player possesses duplicate Pokemon across their physical Party and PC box arrays. A duplicate is defined as having more than one instance of the same species ID.

## Acceptance Criteria
- [x] Implement logic in `src/engine/livingDex/ghostTracker.ts` (or related modules) to accurately count the number of physical instances of each Pokemon species ID.
- [x] Implement a function to return a map or set of species IDs for which the player possesses duplicates (count > 1).
- [x] Maintain O(N) constraints when sweeping across active Party and PC box arrays.
