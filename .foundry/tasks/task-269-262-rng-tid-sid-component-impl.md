---
id: task-269-262-rng-tid-sid-component-impl
type: TASK
title: Implement RNG TID and SID Display Component
status: ACTIVE
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '9389904250992125089'
pr_number: null
parent: story-130-269-rng-tid-sid-component
tags:
  - feature
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement RNG TID and SID Display Component

## Objective
Design and implement a reusable UI component that clearly displays both the Trainer ID (TID) and Secret ID (SID) side-by-side, adhering to the tactical hardware aesthetic. Include a "Copy to Clipboard" feature.

## Requirements
- Create a new UI component (e.g., `src/ui/components/RngTidSidDisplay.tsx`) or integrate into an existing relevant location.
- Display the `TID` and `SID` values side-by-side.
- The component MUST adhere to the tactical hardware aesthetic as defined in ADR 008 and ADR 024. Use Tailwind v4 `@utility` primitives like `.tactical-panel`, `.tactical-button`, `font-mono`, `border-dashed`, and `rounded-none`.
- Implement a "Copy to Clipboard" feature that copies the TID and SID in a format appropriate for RNG tools.
- Ensure integration testing or visual check rendering.

## Acceptance Criteria
- [ ] Component is implemented and displays TID and SID.
- [ ] "Copy to Clipboard" functionality works correctly.
- [ ] Styling strictly adheres to the tactical hardware aesthetic.
- [ ] Component is integrated and renderable.

## Constraints & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
