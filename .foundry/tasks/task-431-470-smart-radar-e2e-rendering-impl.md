---
id: task-431-470-smart-radar-e2e-rendering-impl
type: TASK
title: Smart Radar E2E Map Overlay Rendering Implementation
status: PENDING
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-23'
depends_on:
  - task-431-469-smart-radar-test-utilities-impl
jules_session_id: null
pr_number: null
parent: story-048-431-smart-radar-integration-e2e
tags:
  - testing
  - e2e
  - ui
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Smart Radar E2E Map Overlay Rendering Implementation

## Objective
Write E2E tests for map overlay rendering based on Smart Radar data.

## Context
Following the implementation of test hydration utilities, we now need to verify that the `RouteRadarController` correctly drives the UI. We must test that map overlays are properly rendered with the correct visual densities.

## Core Technical Requirements
- Use Playwright to write E2E tests for the map component.
- Hydrate the state using utilities from `task-431-469-smart-radar-test-utilities-impl`.
- Assert that heatmap density overlays appear based on injected suggestionEngine mock data.
- Verify that correct CSS density classes or styles are applied to the overlay elements based on the data intensity.

## Acceptance Criteria
- [ ] Write E2E tests for heatmap rendering.
- [ ] Verify correct density classes are applied to the map overlays.
