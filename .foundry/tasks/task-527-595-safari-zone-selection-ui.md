---
id: task-527-595-safari-zone-selection-ui
type: TASK
title: Safari Zone Target Selection UI
status: READY
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-24'
depends_on:
  - task-527-594-safari-zone-data-hook
jules_session_id: null
pr_number: null
parent: story-325-527-safari-zone-area-highlighting
tags:
  - frontend
  - ui
  - react
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Safari Zone Target Selection UI

## Overview
Implement the dropdown/search input for selecting valid Safari Zone Pokemon.

## Requirements
- Create `src/components/safari-zone/SafariTargetSelection.tsx`.
- Provide a target selection dropdown or search input using tactical aesthetic primitives (e.g. `TacticalSelect`).
- Hook it up using the `useSafariZoneSelection` hook (mocked or injected via props).
- Adhere to the ADR 008 Tactical Hardware aesthetic (e.g., `rounded-none`, `border-dashed`, monospaced fonts).
- Use Vitest and `vitest-browser-react` to unit test the component.

## Acceptance Criteria
- [ ] Component allows target Pokemon selection.
- [ ] Adheres to the Tactical Hardware aesthetic.
- [ ] Unit tests pass.
