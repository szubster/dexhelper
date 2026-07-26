---
id: task-270-329-rng-tid-sid-integration-impl
type: TASK
title: Implement RNG TID and SID UI Integration
status: CANCELLED
owner_persona: coder
created_at: '2026-07-17T00:07:41Z'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-130-270-rng-tid-sid-integration
tags:
  - feature
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---
# Implement RNG TID and SID UI Integration

## Context
Integrate the newly created TID/SID display component into the main Trainer dashboard or relevant save data summary views.

## Constraints & Requirements
- Comply with tactical hardware/snooping aesthetic (ADR 008): sharp edges (`rounded-none`), no rounded corners, dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`).
- Ensure the component correctly consumes save data state context (ADR 013/017 architecture if applicable, or generic Context API).

## Acceptance Criteria
- [ ] Integrate the TID/SID component into the Trainer dashboard or relevant view.
- [ ] Ensure the component receives the correct save state data.
- [ ] Render the component and confirm it matches the tactical hardware aesthetic.
- [ ] Include explicit integration steps and tests for rendering the component in the application's view hierarchy.

## Coder/QA Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level (no inline magic numbers).
- For Gen 3 save file parsing, you must use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
