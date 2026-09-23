---
id: task-522-586-gen2-checklist-integration-impl
type: TASK
title: Implement Gen 2 Checklist Parsing Engine Integration
status: COMPLETED
owner_persona: coder
created_at: '2026-09-16'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-062-522-gen2-checklist-integration
tags:
  - gen2
  - frontend
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 2 Checklist Parsing Engine Integration

## Objective
Update `src/components/dashboard/checklist/Gen2Checklist.tsx` to integrate the parsed narrative event flags (`gen2NarrativeFlags`), presenting a personalized agenda to the player.

## Acceptance Criteria
- [x] Add a new TacticalPanel to display "NARRATIVE EVENTS".
- [x] Consume `gen2NarrativeFlags` and `getUpcomingGen2Boss` from `src/engine/saveParser/utils/gen2EventFlags.ts` to drive the UI.
- [x] Differentiate state for completed events (acquired/checked), the single immediately available upcoming event, and unavailable future events.
