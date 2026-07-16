---
id: task-254-261-shiny-carrier-breeding-view-qa
type: TASK
title: QA Shiny Carrier Breeding View
status: ACTIVE
owner_persona: qa
created_at: '2026-07-02'
updated_at: '2026-07-16'
depends_on:
  - task-254-260-shiny-carrier-breeding-view-impl
jules_session_id: '1815947034023443378'
pr_number: null
parent: story-045-254-shiny-carrier-breeding-view
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

# QA Shiny Carrier Breeding View

## Objective
Verify the new UI component rendering and adherence to tactical hardware aesthetics.

## Scope
- Verify that the new Breeding Suggestions view correctly renders.
- Verify that optimal breeding pairs involving Shiny Carriers are correctly fetched and displayed.
- Verify that parents and box locations are clearly indicated.
- Verify adherence to the tactical hardware aesthetic (`rounded-none`, `border-dashed`, monospaced fonts).

## Technical Contract
1. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
2. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
3. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verified the Breeding Suggestions UI correctly displays.
- [ ] Verified optimal breeding pairs and Shiny Carriers are shown.
- [ ] Verified parents and box locations are present.
- [ ] Verified components conform to the tactical hardware aesthetic.
