---
id: task-521-536-gen2-checklist-layout-impl
type: TASK
title: Gen 2 Checklist Core Layout Component
status: READY
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-062-521-gen2-checklist-ui-core
tags:
  - gen2
  - frontend
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Checklist Core Layout Component

## Objective
Implement the core UI layout component for the Gen 2 checklist to contain daily and weekly event checklists.

## Technical Context & Directives
- **Component Design:** Build a reusable React layout wrapper for the Gen 2 checklist.
- **Styling Requirements:** Adhere to ADR 008 (tactical hardware aesthetic). Strictly use `rounded-none`, `border-dashed`, and monospaced fonts (e.g. `font-mono`).
- **Integration:** Write standard unit tests (`vitest-browser-react`).

## Acceptance Criteria
- [ ] Implement checklist layout component (`src/components/gen2/ChecklistLayout.tsx` or similar).
- [ ] Write Vitest component tests ensuring correct rendering and tactical styling.
- [ ] Ensure Biome formatting is clean (`pnpm check:fix`).
