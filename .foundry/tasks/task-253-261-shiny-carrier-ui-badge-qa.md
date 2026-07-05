---
id: task-253-261-shiny-carrier-ui-badge-qa
type: TASK
title: QA Shiny Carrier UI Badge
status: READY
owner_persona: qa
created_at: '2026-07-02'
updated_at: '2026-07-05'
depends_on:
  - task-253-260-shiny-carrier-ui-badge-impl
jules_session_id: null
pr_number: null
parent: story-045-253-shiny-carrier-ui-badge
tags:
  - feature
  - breeding
  - gen2
  - frontend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Shiny Carrier UI Badge

## Objective
Verify the implementation of the "Shiny Carrier" UI badge in PC boxes and detailed views.

## Acceptance Criteria
- [ ] Verify the badge visually distinguishes Shiny Carriers from actual Shiny Pokémon.
- [ ] Verify the badge correctly displays in the PC Box view.
- [ ] Verify the badge correctly displays in the Pokémon Detailed view.
- [ ] Verify the badge adheres to the tactical hardware aesthetic (ADR 008): `rounded-none`, `border-dashed`, monospaced fonts, no rounded corners.

## Reminders
- If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail the task, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
