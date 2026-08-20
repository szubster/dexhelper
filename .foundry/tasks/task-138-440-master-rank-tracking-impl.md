---
id: task-138-440-master-rank-tracking-impl
type: TASK
title: Implement Master Rank Tracking UI
status: ACTIVE
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '8789985912051160747'
pr_number: null
parent: story-066-138-master-rank-tracking
tags:
  - ui
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement Master Rank Tracking UI

## 1. Context
We are implementing Master Rank tracking elements for the `GlobalRibbonChecklistDashboard` within the gen3 contest ecosystem.

## 2. Requirements
- Modify `GlobalRibbonChecklistDashboard.tsx` to support visual indicators for Master Rank across 5 categories (Cool, Beauty, Cute, Smart, Tough).
- Extract the specific achievement status for Master Ranks from the aggregated ribbon dataset.
- The UI must adhere to Tactical UI guidelines (ADR 008, ADR 024): `rounded-none`, `font-mono`, `border-dashed`.
- Do NOT rewrite or mock out the data extraction layer. Map data realistically using gen3 ribbon structure logic if available, or update extraction types if required.
- Add browser integration tests ensuring the components render Master Rank badges accurately.

## 3. Acceptance Criteria
- [ ] Logic for Master Rank extraction from ribbons is integrated.
- [ ] `GlobalRibbonChecklistDashboard` displays visual Master Rank badges correctly.
- [ ] UI components pass tactical style compliance.
- [ ] Browser component tests verify the new elements render without failure.
