---
id: task-477-565-define-apricorn-constants
type: TASK
title: Define Kurt Apricorn Constants and Types
status: PENDING
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-11'
depends_on:
  - research-477-564-investigate-apricorn-offsets-failure
jules_session_id: null
pr_number: null
parent: story-404-477-kurt-apricorn-offset-and-constants
tags:
  - gen2
  - items
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Define Kurt Apricorn Constants and Types

## Description
Based on the findings from `research-477-564-investigate-apricorn-offsets-failure`, define the module-level constants for Kurt's Apricorn crafting state. Ensure no magic numbers are used inline, satisfying Section 13 guidelines. Create the necessary TypeScript type definitions.

## Acceptance Criteria
- [ ] Define module-level constants for memory offsets, lengths, array bounds, and magic numbers (e.g., Poké Ball IDs mapped to Apricorns).
- [ ] Define the TypeScript types for the extracted Apricorn state.
- [ ] Ensure the implementation adheres strictly to Section 13 save file parsing guidelines.
