---
id: epic-112-323-pokerus-strain-ui-grid-view
type: EPIC
title: Pokerus Strain UI Tracker - List/Grid View
status: FAILED
owner_persona: story_owner
created_at: '2026-07-13'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-107-112-pokerus-strain-ui-tracker
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 2
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
---

# Epic: Pokerus Strain UI Tracker - List/Grid View

## 1. Objective
Incorporate a visual indicator in the party/box (list or grid) views to quickly identify different Pokerus strains.

## 2. Prerequisites
- The underlying engine must correctly parse out the "days remaining" and "strain" (0-15) of the Pokerus infection (completed via ADR 026 and `parsePokerus` in `common.ts`).

## 3. Scope
- Modify the party and box list/grid views to include a visual indicator (e.g., distinct color, badge number) denoting the specific Pokerus strain (e.g., Strain A, Strain B, Strain 1, Strain 2).
- Ensure the indicator is visible and clearly distinguishes between different strains.
- Ensure the visual styling adheres to the "tactical hardware" aesthetic (sharp edges `rounded-none`, dashed borders `border-dashed`, monospaced telemetry fonts) as defined by ADR 008 and ADR 024.

## 4. Dependencies
None.

## 5. Acceptance Criteria
- [x] Story Owner: Break down this Epic into actionable Stories.
- [ ] story-323-322-pokerus-strain-badge-component
- [ ] story-323-323-integrate-pokerus-strain-party-view
- [ ] story-323-324-integrate-pokerus-strain-box-view
