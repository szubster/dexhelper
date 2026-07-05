---
id: task-156-254-hidden-items-checklist-impl
type: TASK
title: Implement Hidden Items Checklist UI Component
status: ACTIVE
owner_persona: coder
created_at: '2026-07-01'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '15899760562925510572'
pr_number: null
parent: story-060-156-hidden-items-checklist-component
tags:
  - feature
  - ui
  - checklist
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Hidden Items Checklist UI Component

## Context
As part of the Missing Hidden Items Finder feature, we need a dedicated view to display a checklist of valuable hidden items.

## Requirements
- Build a UI component displaying a categorized checklist of valuable hidden items.
- Group items by route, town, or region.
- Adhere strictly to the 'tactical hardware/snooping' aesthetic (ADR 008): use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Utilize existing components like `TacticalPanel` if appropriate.
- Add filtering capability based on categories/groups.
- Connect the component to the hydrated save file state so that items acquired by the player are dynamically checked off.

## Acceptance Criteria
- [ ] Checklist UI component is built and strictly follows ADR 008 (tactical aesthetic).
- [ ] Checklist items are logically grouped (e.g. by route or region) and filterable.
- [ ] Acquired items are dynamically checked off based on save file state.

## Persona Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
