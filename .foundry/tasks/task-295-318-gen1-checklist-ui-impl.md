---
id: task-295-318-gen1-checklist-ui-impl
type: TASK
title: Gen 1 Checklist UI Implementation
status: READY
owner_persona: coder
created_at: '2026-07-15'
updated_at: '2026-07-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-136-295-gen1-checklist-ui
tags:
  - gen1
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 Checklist UI Implementation

Create the UI component for the Gen 1 static encounter checklist, mapping the parsed event flags to visual states. This component should display which static encounters have been claimed or defeated.

## Context & Scaffolding
The UI component should use `STATIC_GIFT_DATA` from `src/engine/data/gen1/assistantData.ts` and the event flags logic implemented in task `task-294-316-gen1-event-flag-parsing-impl`.

## Constraints & Requirements

1. **Adhere to ADR 008 (Tactical Hardware Aesthetic)**: The UI must strictly follow our tactical hardware/snooping aesthetic. Use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Avoid generic visual patterns like soft shadows or rounded corners.

## Process Reminders

- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement the UI component for Gen 1 static encounter checklist.
- [ ] Ensure the component correctly uses the parsed event flags to display visual states.
- [ ] Adhere to the tactical hardware aesthetic rules (ADR 008).
- [ ] Ensure any necessary tests are updated or added.
