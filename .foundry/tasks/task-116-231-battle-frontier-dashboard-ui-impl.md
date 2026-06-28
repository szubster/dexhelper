---
id: task-116-231-battle-frontier-dashboard-ui-impl
type: TASK
title: Gen 3 Battle Frontier Dashboard UI
status: PENDING
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on:
  - task-116-230-battle-frontier-parser-impl
jules_session_id: null
pr_number: null
parent: story-079-116-battle-frontier-dashboard-ui
tags:
  - feature
  - gen3
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Battle Frontier Dashboard UI

## Description
Implement the `BattleFrontierDashboard` React component utilizing the Gen 3 Battle Frontier data parsed from the `task-116-230-battle-frontier-parser-impl` prerequisite. The UI should display facility cards, BP wallet balance, and progress visuals.

## Implementation Guidelines
- **Strict Aesthetic Constraints (ADR 024):** The UI component MUST strictly adhere to the tactical hardware/snooping aesthetic. You MUST use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Leverage existing `tactical-*` utility classes where possible.
- **Graph Dependencies (ADR 008):** If the progress visuals require node/edge mapping, you MUST use `React Flow` to maintain architectural consistency with other dashboards.
- Ensure efficient component rendering and state updates. Scaffolding for a React Context layer may be required if passing state deeply through props.

## Rejection & Completion Guidelines
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR because the UI module is already fully implemented, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Build the `BattleFrontierDashboard` displaying BP and facility progress.
- [ ] Strictly implement the "tactical hardware/snooping" aesthetic using Tailwind `tactical-*` classes.
- [ ] Ensure components render correctly without any standard "soft" styling (no rounded corners).
- [ ] Integrate React Flow for progression visualizations (if applicable).
