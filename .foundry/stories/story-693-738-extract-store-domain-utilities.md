---
id: story-693-738-extract-store-domain-utilities
type: STORY
title: Extract Store Domain Utilities
status: READY
owner_persona: tech_lead
created_at: '2026-10-31'
updated_at: '2026-10-31'
depends_on:
  - story-693-737-identify-store-domain-logic
jules_session_id: null
pr_number: null
parent: epic-707-693-domain-logic-extraction
tags:
  - refactoring
  - testability
  - state-management
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# STORY: Extract Store Domain Utilities

## Objective
Extract the identified domain logic from `src/store.ts` action setters into pure function utilities in `src/engine/` or `src/utils/`, and update the store to use them.

## Requirements
1. Implement the pure function utilities outlined in `story-693-737-identify-store-domain-logic`.
2. Update the `AppStore` action handlers to use the new helper utilities instead of inline calculations.
3. Ensure no regressions in application behavior.

## Acceptance Criteria
- [ ] Break down this Story into Tasks.
