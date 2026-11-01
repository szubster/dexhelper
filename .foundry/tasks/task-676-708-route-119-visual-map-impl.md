---
id: task-676-708-route-119-visual-map-impl
type: TASK
title: Route 119 Visual Map Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-18T18:41:32.085Z'
updated_at: '2026-11-01'
depends_on:
  - task-676-707-route-119-layout-data-impl
jules_session_id: '12662577684628285083'
pr_number: null
parent: story-059-676-route-119-visual-map
tags:
  - gen3
  - frontend
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Route 119 Visual Map Component Implementation

## Objective
Implement the React component for rendering the Route 119 water tiles layout, consuming the layout data constants.

## Technical Contract
- Implement a static React component (`Route119Map`) that renders the layout utilizing the constants defined in the layout data task.
- Ensure the component correctly visually distinguishes between water tiles and non-water tiles.
- Adhere strictly to the tactical hardware aesthetic guidelines (ADR 008, ADR 024): use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (e.g., `font-mono`).
- Use `@utility` tactical primitives from `src/index.css` (e.g., `tactical-panel`, `tactical-text`) rather than inline raw Tailwind classes where applicable.

## Acceptance Criteria
- [ ] Create the visual map React component for Route 119.
- [ ] Component strictly adheres to the defined tactical aesthetic constraints.
