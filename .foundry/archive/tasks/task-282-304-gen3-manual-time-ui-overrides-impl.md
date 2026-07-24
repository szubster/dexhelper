---
id: task-282-304-gen3-manual-time-ui-overrides-impl
type: TASK
title: Implement Gen 3 Manual Time UI Overrides Logic and UI
status: COMPLETED
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-282-gen3-manual-time-ui-overrides
tags:
  - feature
  - gen3
  - rtc
research_references:
  - research-081-144-gen3-rtc-strategy
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Manual Time UI Overrides Logic and UI

## Description
Based on ADR 025 and the findings from `research-081-144-gen3-rtc-strategy`, RTC data in Gen 3 is emulator dependent and highly unreliable. Therefore, we must implement an RTC-Independent Fallback Strategy using System Time Fallback and Manual UI Overrides.

This task requires you to implement the React Context layer and UI controls to allow users to manually set or override the time state (e.g., simulating day/night or specific days for time-gated events).

## Context & Scaffolding
- You MUST define the React Context layer first before implementing the UI components to prevent tight coupling and permanent failures, as mandated by the Architectural Scaffolding instructions for complex shared state.
- The UI MUST adhere strictly to ADR 008 tactical hardware/snooping aesthetic: use sharp edges (rounded-none), avoid rounded corners, and use dashed borders (border-dashed) with monospaced telemetry fonts (font-mono).

## Instructions for Coder
1. Create a React Context (`TimeOverrideContext`) that manages the manual time state (e.g., `isOverridden`, `overrideTime`, `overrideDay`).
2. Provide hooks/providers to expose this state globally to time-dependent components.
3. Build the UI controls (toggles, time/day pickers) following the ADR 008 aesthetic.
4. Integrate the UI into the appropriate Gen 3 dashboard/layout.

## Contracts
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement `TimeOverrideContext` to manage manual time state.
- [x] Build Manual UI Overrides to allow users to force a specific time state.
- [x] Adhere strictly to ADR 008 tactical hardware/snooping aesthetic (sharp edges, dashed borders, monospaced fonts).
