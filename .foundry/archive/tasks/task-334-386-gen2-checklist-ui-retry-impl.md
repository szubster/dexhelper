---
id: task-334-386-gen2-checklist-ui-retry-impl
type: TASK
title: Gen 2 Checklist UI Implementation (Retry)
status: COMPLETED
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-137-334-gen2-checklist-ui-retry
tags:
  - gen2
  - frontend
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 Checklist UI Implementation (Retry)

Create the UI component to display the checklist of Gen 2 static encounters (Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia) based on the event flags parsed from the backend.

The design must adhere strictly to the project's "tactical hardware/snooping" aesthetic as defined in ADRs:
- Sharp edges (`rounded-none`).
- Avoid rounded corners completely.
- Use dashed borders (`border-dashed`).
- Apply monospaced telemetry fonts (`font-mono`).

## Acceptance Criteria
- [x] Implement `Gen2Checklist` React component.
- [x] Component successfully displays Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia based on event flag props.
- [x] UI strictly applies the tactical hardware aesthetic (`rounded-none`, `border-dashed`, `font-mono`).
- [x] Include explicit integration steps and tests for rendering the component to ensure it is properly integrated into the application's view hierarchy.
