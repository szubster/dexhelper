---
id: story-337-678-gen3-wallpaper-e2e-verification
type: STORY
title: Gen 3 Wallpaper Dashboard E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: "2026-10-18"
updated_at: "2026-10-18"
depends_on:
  - story-337-677-gen3-wallpaper-ui-integration
jules_session_id: null
locks: []
pr_number: null
parent: epic-116-337-gen3-wallpaper-dashboard-ui
priority: 50
confidence_score: null
tags:
  - gen3
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Wallpaper Dashboard E2E Verification

## Objective
Write and execute Playwright E2E tests to verify the complete user flow for the Gen 3 Wallpaper Dashboard, from loading a save to viewing phrases and toggling checklist states.

## Context
Per the Orchestrator Safeguard in the Core System Policies, every EPIC must generate a final STORY dedicated exclusively to Integration and E2E Verification. This story fulfills that requirement for the Gen 3 Wallpaper Dashboard UI epic.

## Requirements
*   Create Playwright E2E tests for the Wallpaper Dashboard functionality.
*   Verify that navigating to the Wallpaper Checklist displays the correct generated phrases for a mock loaded Gen 3 save file (mock the `trainerId`).
*   Verify the checkboxes visually update when clicked and persist their state.
*   Ensure locators use `getByRole` or `getByText` and avoid `evaluate()` with hardcoded HTML injections, testing the actual React components.

## Acceptance Criteria
- [ ] Tech Lead: Break down into TASK nodes for E2E test implementation and execution.
