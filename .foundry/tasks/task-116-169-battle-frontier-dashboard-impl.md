---
id: task-116-169-battle-frontier-dashboard-impl
type: TASK
title: Implement Gen 3 Battle Frontier Dashboard UI
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-22'
depends_on:
  - research-116-204-gen3-battle-frontier-data
jules_session_id: null
pr_number: null
parent: story-079-116-battle-frontier-dashboard-ui
tags:
  - feature
  - gen3
  - endgame
  - frontend
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Battle Frontier Dashboard UI

## Description
Implement the `BattleFrontierDashboard` React component to visualize the Gen 3 Battle Frontier progress. Ensure it adheres strictly to the "tactical hardware/snooping" aesthetic, displaying facility cards, BP wallet, and progress visuals using React Flow.

## Architecture & Integration Context
*   The UI MUST adhere strictly to our 'tactical hardware/snooping' aesthetic (ADR 008, ADR 024): sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).
*   For custom classes, utilize Tailwind v4's new native `@utility` directive (e.g., `tactical-panel`) where applicable to reduce inline clutter.
*   Graph views must utilize `React Flow` to support modular custom node views (ADR 008).
*   Integration is critical: You MUST include tests to ensure `BattleFrontierDashboard` integrates cleanly and renders properly, otherwise it will permanently fail.

## Acceptance Criteria
- [ ] Implement the `BattleFrontierDashboard` React component utilizing React Flow.
- [ ] Create UI nodes for the 7 facilities.
- [ ] Create UI for the BP wallet display.
- [ ] Add progress visuals towards the next Frontier Brain encounter.
- [ ] Add rendering and integration tests to ensure the component behaves correctly.

## Contract Reminder
*   If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
