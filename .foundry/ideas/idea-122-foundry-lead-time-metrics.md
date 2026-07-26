---
id: idea-122-foundry-lead-time-metrics
type: IDEA
title: "Implement Foundry Lead Time Metrics and Bottleneck Analysis"
status: CANCELLED
owner_persona: product_manager
created_at: "2026-07-25"
updated_at: "2026-07-25"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - metrics
research_references: []
rejection_count: 1
rejection_reason: "User does not need lead time metrics; most time is spent on verification."
notes: ""
---

# Idea: Implement Foundry Lead Time Metrics and Bottleneck Analysis

## Problem
The Foundry autonomous software factory processes numerous nodes across various personas and states. However, there is currently no systematic way to measure "lead time" (the time taken from node creation to completion) or "cycle time" (the time spent in `ACTIVE` state by agents). Without these metrics, it is difficult to identify which personas, task types, or pipeline phases (e.g., waiting in `VERIFYING` for an auditor, or stalled in `PENDING` due to missing dependencies) are causing bottlenecks in the overall delivery process.

## Proposed Solution
Enhance the Foundry orchestrator and the `tpm` persona to track and aggregate state transition timestamps.
1. Introduce a new schema field (e.g., `state_history`) or leverage an external metrics store (like a lightweight SQLite DB managed by the orchestrator) to record the exact timestamps when a node enters `READY`, `ACTIVE`, `VERIFYING`, and `COMPLETED`.
2. Implement a new reporting script or dashboard view that visualizes average lead times, queue lengths, and rejection rates per persona.
3. Use these insights to optimize the multi-agent pipeline, adjust agent prompts, or dynamically scale agent concurrency for bottlenecked roles.

## Value Proposition
By exposing process metrics, the Foundry system transitions from a black-box execution engine to a measurable, optimizable pipeline. This directly addresses the focus area of "improvements to the autonomous software factory" by enabling data-driven tuning of the multi-agent system.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to formalize the metrics gathering and visualization strategy.
- [ ] prd-122-001-foundry-lead-time-metrics
