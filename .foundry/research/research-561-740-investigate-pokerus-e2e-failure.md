---
id: research-561-740-investigate-pokerus-e2e-failure
type: RESEARCH
title: Investigate Pokerus E2E Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-11-06T01:05:54.000Z'
updated_at: '2026-11-06T01:05:54.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-413-561-pokerus-spread-planner-e2e
tags:
  - e2e
  - debugging
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Pokerus E2E Failure

## Description
The previous E2E test tasks (`task-561-690-pokerus-spread-planner-e2e-impl` and `task-561-691-pokerus-spread-planner-e2e-qa`) were permanently cancelled due to QA rejection stating: "The tests in tests/e2e/pokerus.spec.ts use page.evaluate() to inject states directly into the __store. E2E tests must test the actual UI, and should not be using page.evaluate() to bypass components as described in core policies."

This research node is to investigate the root cause and find the correct way to test this without bypassing the UI.

## Acceptance Criteria
- [ ] Determine how to mock Zustand initial state correctly or trigger UI state without `page.evaluate()`.
