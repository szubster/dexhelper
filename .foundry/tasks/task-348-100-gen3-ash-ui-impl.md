---
id: task-348-100-gen3-ash-ui-impl
type: TASK
title: 'Task: Implement Gen 3 Volcanic Ash UI Integration'
status: CANCELLED
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - ui
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Task: Implement Gen 3 Volcanic Ash UI Integration

## Objective
Integrate the `gen3VolcanicAsh` property into the frontend UI, displaying it in the Assistant Debug View.

## Architectural Constraints
- Ensure proper rendering of the `gen3VolcanicAsh` property in `src/components/assistant/AssistantDebugView.tsx`.
- The diagnostic card should only be displayed if `saveData.generation === 3` and `saveData.gen3VolcanicAsh` is defined.
- Adhere to the UI aesthetic constraints (ADR 008 - sharp edges, dashed borders, monospaced fonts). Use the existing `DiagnosticCard` component.
- The UI structure must remain consistent with the existing layout in `AssistantDebugView.tsx`.

## Acceptance Criteria
- [ ] Add a `DiagnosticCard` in `src/components/assistant/AssistantDebugView.tsx` to display the Volcanic Ash count.
- [ ] The card should conditionally render based on the presence of `saveData.gen3VolcanicAsh` and `saveData.generation === 3`.
- [ ] Self-verify the implementation and document the results in the `coder` persona journal.


### QA Rejection Note
`isGen3Save` is a stub returning false which fails to parse the save entirely during e2e. Fix `isGen3Save` before e2e testing can proceed.
