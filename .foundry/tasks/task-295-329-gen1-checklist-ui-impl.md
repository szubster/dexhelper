---
id: task-295-329-gen1-checklist-ui-impl
type: TASK
title: Gen 1 Checklist UI Implementation
status: PENDING
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-16'
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

Create a React UI component for the Gen 1 static encounter checklist. This component should display the static encounters (e.g., Starters, Fossils, Legendaries) by importing and mapping over `STATIC_GIFT_DATA` (from `src/engine/data/gen1/assistantData.ts`).

The component needs to visually indicate which of these encounters have already been claimed or defeated by the player. This state should be derived from the parsed Gen 1 event flags.

## Architectural Constraints
- **Aesthetic**: Adhere strictly to ADR 008 ("tactical hardware/snooping" aesthetic). You MUST explicitly use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Avoid any rounded corners.

## Policies
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g. the component already exists), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement the Gen 1 Checklist UI React component.
- [ ] Connect the component to `STATIC_GIFT_DATA` and the parsed event flags.
- [ ] Apply ADR 008 styling (`rounded-none`, `border-dashed`, `font-mono`).
- [ ] Write unit tests to verify the component renders correctly and displays the correct visual state based on event flags.
