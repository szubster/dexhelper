---
id: epic-707-693-domain-logic-extraction
type: EPIC
title: Extract Domain Logic from Store Action Setters
status: PENDING
owner_persona: story_owner
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-537-707-zustand-store-slice-decomposition-and-selectors
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

# EPIC: Extract Domain Logic from Store Action Setters

## Objective
Extract inline business calculations and domain logic from the monolithic `src/store.ts` action setters. Move these calculations into pure, testable domain helper utilities under `src/engine/` or `src/utils/`.

## Requirements
1. Identify all embedded domain logic within `AppStore` action handlers.
2. Create pure function utilities in `src/engine/` or `src/utils/` to handle these calculations.
3. Update the existing store to utilize these extracted helper functions.
4. When breaking down this Epic into Stories, the Story Owner MUST generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

## Acceptance Criteria
- [ ] Break down this Epic into Stories.
