---
id: task-284-323-predictor-ui-qa
type: TASK
title: QA - Active Callers Dashboard UI
status: READY
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-19'
depends_on:
  - task-284-322-predictor-ui-impl
jules_session_id: null
pr_number: null
parent: story-117-284-pokegear-predictor-ui
tags:
  - qa
  - ui
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Active Callers Dashboard UI

## Objective
Verify the implementation of the Active Callers Dashboard UI.

## Context
The Coder has implemented the Active Callers Dashboard to display Pokegear call probabilities. Ensure it adheres to the tactical aesthetic (ADR 008) and functions correctly without TypeScript or Lint errors.

## Acceptance Criteria
- [ ] Verify `ActiveCallersDashboard` uses `rounded-none`, `border-dashed`, and `font-mono`.
- [ ] Verify the UI component correctly surfaces call probability data.
- [ ] Verify component unit tests exist and pass (`pnpm test`).
- [ ] Verify no linting errors are introduced (`pnpm lint`).

## QA Constraints & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
