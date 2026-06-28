---
id: task-116-170-battle-frontier-dashboard-qa
type: TASK
title: QA Gen 3 Battle Frontier Dashboard UI
status: CANCELLED
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-28'
depends_on:
  - task-116-169-battle-frontier-dashboard-impl
jules_session_id: null
pr_number: null
parent: story-079-116-battle-frontier-dashboard-ui
tags:
  - qa
  - gen3
  - endgame
  - frontend
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-116-169-battle-frontier-dashboard-impl
notes: ''
---

# Task: QA Gen 3 Battle Frontier Dashboard UI

## Description
Verify the implementation of the `BattleFrontierDashboard` React component for Gen 3. Ensure it accurately translates the architectural requirements of ADR 008 (React Flow integration) and ADR 024 (Tailwind v4 tactical primitives).

## Verification Protocol
1.  **Aesthetic Verification**: Confirm that the UI rigorously applies the 'tactical hardware/snooping' style. Check for `rounded-none`, `border-dashed`, and `font-mono`. Ensure generic visual patterns (like soft shadows or rounded corners) are entirely absent. Check if `tactical-*` utilities are correctly used.
2.  **Architecture Verification**: Verify that `React Flow` is properly utilized for the graph rendering, and that nodes correctly represent the 7 facilities.
3.  **Functional Verification**: Validate the BP wallet display and progress visuals towards the next Frontier Brain encounter.
4.  **Integration Verification**: Confirm the presence of adequate rendering tests to prove the component mounts and renders correctly within the application hierarchy.

## Acceptance Criteria
- [ ] Aesthetic adheres to ADR 008 and ADR 024.
- [ ] React Flow is utilized as specified.
- [ ] All 7 facilities, BP wallet, and progress visuals are functional and present.
- [ ] Component integration tests are included and passing.

## Contract Reminder
*   If you reject the Coder's implementation, you MUST update the Coder's task YAML frontmatter to `status: FAILED` with a clear `rejection_reason`, increment its `rejection_count`, leave its Acceptance Criteria unchecked, and document the failure in your journal (`.foundry/journals/qa.md`).
*   DO NOT modify your own QA task's YAML frontmatter.
*   If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
