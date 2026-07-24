---
id: task-284-322-predictor-ui-impl
type: TASK
title: Implement Active Callers Dashboard UI
status: COMPLETED
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-117-284-pokegear-predictor-ui
tags:
  - ui
  - gen2
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Active Callers Dashboard UI

## Objective
Implement the React UI component for the Active Callers Dashboard to display Pokegear call probabilities.

## Context & Architecture
As per ADR 008, the UI must strictly adhere to the 'tactical hardware/snooping' aesthetic: use sharp edges (`rounded-none`), avoid all rounded corners, use dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).

The UI should use the `checkPhoneCall` and `chooseRandomCaller` logic (or visual indicators of probability derived from them) to display which contacts are most likely to call the player. Create an `ActiveCallersDashboard` component.

## Acceptance Criteria
- [x] Create `ActiveCallersDashboard.tsx` under `src/components/dashboard/pokegear/` (or similar appropriate path).
- [x] Display a list or grid of active callers with their respective call probabilities or status.
- [x] Apply the tactical UI aesthetic (e.g., `rounded-none`, `border-dashed`, `font-mono`).
- [x] Ensure all necessary Vitest test cases are written for the UI component.

## Coder Constraints & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- You must self-verify changes by running `pnpm test` and explicitly mention the outcome in your journal.
- Ensure strict TypeScript typing (`verbatimModuleSyntax` requires `import type`).
