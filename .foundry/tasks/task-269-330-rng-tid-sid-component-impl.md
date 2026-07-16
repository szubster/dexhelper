---
id: task-269-330-rng-tid-sid-component-impl
type: TASK
title: Implement RNG TID and SID Display Component
status: PENDING
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on:
  - research-269-325-rng-tid-sid-failure-analysis
jules_session_id: null
pr_number: null
parent: story-130-269-rng-tid-sid-component
tags:
  - feature
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement RNG TID and SID Display Component

## Objective
Design and implement a reusable UI component that clearly displays both the Trainer ID (TID) and Secret ID (SID) side-by-side. The component must adhere to the tactical hardware aesthetic.

## Requirements
- Read the findings from `research-269-325-rng-tid-sid-failure-analysis`.
- Create a new UI component (e.g., `src/ui/components/RngTidSidDisplay.tsx`) to display TID and SID side-by-side.
- The component MUST adhere to the tactical hardware aesthetic as defined in ADR 008 and ADR 024. Use explicit sharp edges (`rounded-none`), avoid rounded corners, and use dashed borders (`border-dashed`) and monospaced telemetry fonts (`font-mono`).
- Implement a "Copy to Clipboard" feature that formats the TID and SID appropriately for RNG tools.
- Include unit/integration tests to ensure correct rendering and behavior.

## Acceptance Criteria
- [ ] Component is implemented and displays TID and SID.
- [ ] "Copy to Clipboard" functionality works correctly.
- [ ] Styling strictly adheres to the tactical hardware aesthetic.
- [ ] Tests are written and passing.

## Contracts & Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
