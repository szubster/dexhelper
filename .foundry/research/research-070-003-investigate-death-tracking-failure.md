---
id: research-070-003-investigate-death-tracking-failure
type: RESEARCH
title: Investigate Death Tracking and Graveyard Logic Failure
status: READY
owner_persona: researcher
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-034-070-death-tracking-and-graveyard
tags:
  - feature
  - nuzlocke
  - verification
research_references: []
rejection_count: 1
rejection_reason: ACTIVE node missing session ID
notes: ''
---

# Investigate Death Tracking and Graveyard Logic Failure

## Context
The implementation task `.foundry/tasks/task-070-116-implement-death-tracking.md` failed permanently. The assigned `coder` failed to fully satisfy the acceptance criteria, resulting in the `rejection_reason: Merged with unfulfilled acceptance criteria`. This triggered the Orchestrator's Impossible Loop.

## Objective
The objective of this research node is to investigate why the `coder` persona was unable to fulfill the requirements for Nuzlocke graveyard tracking.
- Analyze the codebase and previous PRs to determine if there's a technical limitation or complexity with Gen2 or Gen3 data formats, or the Nuzlocke Tracker Architecture (ADR-012) that prevented the implementation.
- Produce a clear set of recommendations or a revised technical spec that the replacement implementation task can follow to ensure success.

## Deliverables
- A summary of the root cause of the failure.
- A revised technical approach or specific instructions for implementing death tracking correctly, avoiding the pitfalls encountered by the previous coder.
