---
id: task-526-564-rng-explainer-ui-impl
type: TASK
title: Implement RNG Tool Explainer UI Component
status: READY
owner_persona: coder
created_at: '2024-05-18'
updated_at: '2024-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-526-rng-explainer-ui-component
tags:
  - feature
  - rng
  - explainer
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement RNG Tool Explainer UI Component

## Objective
Implement a brief, user-friendly explainer section within the RNG calculator UI that instructs users on how to use their TID/SID combination with external RNG manipulation tools.

## Acceptance Criteria
- [ ] Create a new UI component (e.g., `RNGExplainer`) in the appropriate RNG calculator directory.
- [ ] Ensure the component renders a clear, accessible explanation of TID/SID usage.
- [ ] Adhere to the "tactical hardware/snooping" aesthetic constraints (ADR 008) including `rounded-none`, `border-dashed`, and monospaced fonts where applicable.
- [ ] Write unit tests for the new component using `vitest-browser-react` to ensure it renders correctly and is accessible.