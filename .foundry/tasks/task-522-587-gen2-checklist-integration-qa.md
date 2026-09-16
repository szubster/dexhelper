---
id: task-522-587-gen2-checklist-integration-qa
type: TASK
title: QA Gen 2 Checklist Parsing Engine Integration
status: READY
owner_persona: qa
created_at: '2026-09-16'
updated_at: '2026-09-16'
depends_on:
  - task-522-586-gen2-checklist-integration-impl
jules_session_id: null
pr_number: null
parent: story-062-522-gen2-checklist-integration
tags:
  - qa
  - gen2
  - frontend
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Gen 2 Checklist Parsing Engine Integration

## Objective
Verify the Gen 2 checklist correctly integrates parsed narrative event flags and differentiates event states.

## Acceptance Criteria
- [ ] Verify `Gen2Checklist.tsx` consumes `gen2NarrativeFlags`.
- [ ] Verify `Gen2Checklist.tsx` uses `getUpcomingGen2Boss` to highlight the current objective.
- [ ] Verify the UI visually differentiates completed, available, and unavailable events.
- [ ] Run `xvfb-run -a pnpm test:e2e` to ensure no visual or functional regressions.
