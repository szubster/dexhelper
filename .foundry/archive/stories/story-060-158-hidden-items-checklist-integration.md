---
id: story-060-158-hidden-items-checklist-integration
type: STORY
title: Integrate Hidden Items Checklist into Dashboard
status: CANCELLED
owner_persona: tech_lead
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-060-hidden-items-ui
tags:
  - ui
  - integration
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: >-
  Spawned via late-binding to integrate the unmounted HiddenItemsChecklist
  component.
---

# Story: Integrate Hidden Items Checklist into Dashboard

## 1. Context & Background
During the implementation of E2E tests for the `HiddenItemsChecklist` component (`task-157-338`), it was discovered that the component is not currently mounted anywhere within the application routes (e.g., `src/routes/dashboard.tsx`). To write effective E2E tests, the component must first be integrated into the application's view hierarchy.

## 2. Product Requirements
- Integrate the `HiddenItemsChecklist` component into a suitable route, such as `src/routes/dashboard.tsx` or as part of a run progression view.
- Ensure it receives the correct hydrated save data format (`LocationGroupedHiddenItems[]`).

## 3. Acceptance Criteria
- [ ] The `HiddenItemsChecklist` component is mounted in the application and accessible via a route.
- [ ] It correctly receives and renders grouped hidden items data.

## Tasks
