---
id: task-348-462-gen3-ash-ui-impl
type: TASK
title: 'Task: Implement Gen 3 Volcanic Ash UI Integration'
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22T10:49:07Z'
updated_at: '2026-08-24'
depends_on:
  - research-348-461-investigate-isgen3save-stub
jules_session_id: '2446653758458105448'
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - ui
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Volcanic Ash UI Integration

## Objective
Integrate the \`gen3VolcanicAsh\` property into the frontend UI, displaying it in the Assistant Debug View. Additionally, fix the \`isGen3Save\` stub based on research findings.

## Architectural Constraints
- Ensure proper rendering of the \`gen3VolcanicAsh\` property in \`src/components/assistant/AssistantDebugView.tsx\`.
- The diagnostic card should only be displayed if \`saveData.generation === 3\` and \`saveData.gen3VolcanicAsh\` is defined.
- Adhere to the UI aesthetic constraints (ADR 008 - sharp edges, dashed borders, monospaced fonts). Use the existing \`DiagnosticCard\` component.
- The UI structure must remain consistent with the existing layout in \`AssistantDebugView.tsx\`.
- Fix \`isGen3Save\` based on the output of \`research-348-461-investigate-isgen3save-stub\`.

## Acceptance Criteria
- [ ] Implement the correct logic for \`isGen3Save\` based on research findings.
- [ ] Add a \`DiagnosticCard\` in \`src/components/assistant/AssistantDebugView.tsx\` to display the Volcanic Ash count.
- [ ] The card should conditionally render based on the presence of \`saveData.gen3VolcanicAsh\` and \`saveData.generation === 3\`.
- [ ] Self-verify the implementation and document the results in the \`coder\` persona journal.
