---
id: task-295-329-gen1-checklist-ui-impl
type: TASK
title: Gen 1 Checklist UI Implementation
status: CANCELLED
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-17'
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
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Gen 1 Checklist UI Implementation

Create the React UI component for the Gen 1 static encounter checklist. It should display the static encounters and map their visual states (checked/unchecked) based on the parsed event flags.

## Acceptance Criteria
- [ ] Implement Gen 1 Checklist UI component.
- [ ] Map parsed event flags to visual states correctly.
- [ ] Adhere to ADR 008 (tactical hardware/snooping aesthetic) and ADR 024. Use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).
- [ ] Write Vitest unit tests for the component state mapping.

## Contract Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
