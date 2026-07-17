---
id: story-130-269-rng-tid-sid-component
type: STORY
title: RNG TID and SID Display Component
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-100-130-rng-tid-sid-display
tags:
  - feature
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RNG TID and SID Display Component

## Objective
Create a reusable React UI component that clearly displays the Trainer ID (TID) and Secret ID (SID) side-by-side, adhering to the tactical hardware design system. It must include a one-click copy-to-clipboard functionality that copies the values in a format easily consumable by external RNG tools (e.g., `TID: 12345 / SID: 67890`).

## Acceptance Criteria
- [ ] Create a `TrainerIdDisplay` component.
- [ ] Display both TID and SID within the component.
- [ ] Implement a copy button utilizing the standard `copy-to-clipboard` pattern that provides visual feedback (e.g., changing to a checkmark momentarily) when clicked.
- [ ] Ensure the component adheres to the tactical aesthetic (e.g., monospaced fonts for the IDs, sharp edges).
- [ ] Tech Lead: Convert this Story into actionable Tasks.
