---
id: task-270-329-rng-tid-sid-integration-impl
type: TASK
title: Implement RNG TID and SID UI Integration
status: PENDING
owner_persona: coder
created_at: '2026-07-17'
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
rejection_reason: ''
notes: ''
---

# Implement RNG TID and SID UI Integration

## Objective
Integrate the newly created `RngTidSidDisplay` component into the main Trainer dashboard or relevant save data summary views so users can readily access this information.

## Context & Architecture Constraints
- The component `RngTidSidDisplay` has already been implemented. Integrate it into a dashboard view (such as the trainer info or save summary section).
- Ensure the component receives the correct Trainer ID (TID) and Secret ID (SID) data from the save state context/store.
- Maintain the tactical hardware aesthetic guidelines (ADR 024) across the integration layer.
- **REMINDER FOR CODER:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **REMINDER FOR CODER:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **REMINDER FOR CODER:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **REMINDER FOR CODER:** When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
- **REMINDER FOR CODER:** When drafting blueprints for Gen 3 save file parsing, explicitly require that the Coder uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.

## Acceptance Criteria
- [ ] Integrate the `RngTidSidDisplay` component into the Trainer dashboard view.
- [ ] Ensure the correct TID and SID are passed to the component from the global store/save state.
- [ ] Add explicit integration steps and tests for rendering the integrated component to ensure it is properly integrated into the application's view hierarchy.
