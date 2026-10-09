---
id: story-269-647-gen3-ash-dashboard-ui
type: STORY
title: 'Story: Gen 3 Volcanic Ash Tracker Dashboard UI Implementation'
status: READY
owner_persona: tech_lead
created_at: '2026-10-03T19:33:53.000Z'
updated_at: '2026-10-03T19:33:53.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-054-269-gen3-ash-dashboard
tags:
  - ui
  - gen3
  - ash
research_references: []
rejection_reason: ''
locks: []
---

# Story: Gen 3 Volcanic Ash Tracker Dashboard UI Implementation

## Description
Implement the Gen 3 Volcanic Ash Tracker Dashboard UI within DexHelper. The dashboard should use the extracted save file data and display the player's Volcanic Ash count.

## Architectural Constraints
- MUST utilize Tailwind v4 `@utility` classes (e.g., `tactical-panel`), sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`) per ADR 024.
- Must use existing layout patterns and Zustand state management.
- No PokeAPI dependency.

## Acceptance Criteria
- [ ] Implement the UI components for the Ash Tracker.
- [ ] Write integration E2E tests for the new UI.
- [ ] Break down this Story into TASK nodes for coder and qa.
