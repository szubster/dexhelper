---
id: task-268-263-gen3-roamer-dossier-ui-qa
type: TASK
title: Gen 3 Roamer Dossier UI QA
status: READY
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on:
  - task-268-262-gen3-roamer-dossier-ui-impl
jules_session_id: null
pr_number: null
parent: story-122-268-gen3-roamer-dossier-ui
tags:
  - gen3
  - roamer
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Dossier UI QA

## Objective
Verify the Gen 3 Roamer Dossier UI implementation.

## Context
The Coder has implemented the `RoamerDossier` component. We must verify that it correctly displays the roamer's state, applies the tactical aesthetic, and properly triggers the IV Glitch warning when applicable.

## Acceptance Criteria
- [ ] Verify that the `RoamerDossier` component renders correctly without errors.
- [ ] Ensure the component displays all required data (Species, Level, HP, Status, IVs, PV, and Active Status).
- [ ] Verify the tactical aesthetic is applied (`border-dashed`, `rounded-none`, `font-mono`).
- [ ] Verify the IV Glitch Warning Module correctly appears for glitch-signature IVs and is hidden otherwise.

## QA Contract Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
