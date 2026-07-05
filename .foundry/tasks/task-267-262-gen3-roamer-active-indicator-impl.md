---
id: task-267-262-gen3-roamer-active-indicator-impl
type: TASK
title: Gen 3 Roamer Active Indicator UI Implementation
status: PENDING
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-122-267-gen3-roamer-active-indicator-ui
tags:
  - gen3
  - roamer
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Roamer Active Indicator UI Implementation

## Objective
Build the React component for the Active Status Indicator in the Roamer Dashboard.

## Technical Specifications
- **Component**: Create a React component `RoamerActiveIndicator` (e.g., in `src/components/roamer/`).
- **Props**: It should accept an `active: boolean` prop. This boolean is derived from the parsed Roamer struct (offset `0x13`).
- **Styling**: Strictly adhere to ADR 008 and the UI spec (`.foundry/docs/knowledge_base/ui/gen3_roamer_dashboard_spec.md`):
  - Use a tactical, snooping aesthetic.
  - Incorporate a blinking or high-contrast status dot.
  - Use dashed borders (`border-dashed`), sharp corners (`rounded-none`), and monospaced fonts (`font-mono`).
  - When `active` is true, show an active state (e.g., blinking red/amber).
  - When `active` is false, clearly indicate the roamer is inactive/caught.
- **Integration**: Provide basic scaffolding/tests to ensure it renders correctly.

## Critical Instructions for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] React component created and accepts `active` boolean prop.
- [ ] Styling strictly adheres to tactical aesthetic (ADR 008, dashed borders, monospaced font).
- [ ] Component correctly visually distinguishes between active and inactive states.