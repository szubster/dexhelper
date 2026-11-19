---
id: task-711-740-weather-anomaly-dashboard-overlay-impl
type: TASK
title: Implement Weather Anomaly Dashboard Overlay
status: READY
owner_persona: coder
created_at: '2026-10-21'
updated_at: '2026-10-21'
depends_on:
  - task-711-742-weather-anomaly-dashboard-state-impl
jules_session_id: null
pr_number: null
parent: story-518-711-weather-anomaly-dashboard-overlay
tags:
  - feature
  - gen3
  - tracker
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Weather Anomaly Dashboard Overlay

## Description
Implement the dashboard overlay React component to display the current active anomaly (Drought/Drizzle) for Gen 3. It should present the anomaly state to the user.

## Acceptance Criteria
- [ ] Implement the React component for the Weather Anomaly dashboard overlay.
- [ ] Explicitly wire the component into the application's view hierarchy or root entry point.
- [ ] Adhere strictly to the "tactical hardware/snooping" aesthetic (ADR 008, ADR 024) using sharp edges (`rounded-none`), monospaced fonts, and dashed borders.
- [ ] Use defined `@utility` tactical primitives from `src/index.css` (e.g. `tactical-panel`, `tactical-text`).
- [ ] Write unit tests for the component using `vitest-browser-react`.
