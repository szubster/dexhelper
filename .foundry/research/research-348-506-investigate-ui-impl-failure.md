---
id: research-348-506-investigate-ui-impl-failure
type: RESEARCH
title: 'Research: Investigate Gen 3 Ash UI Impl Failure'
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-01'
updated_at: '2026-09-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-268-348-gen3-ash-integration
tags:
  - gen3
  - ash
  - research
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Gen 3 Ash UI Impl Failure

## Objective
Investigate the root cause of the permanent failure of `task-348-462-gen3-ash-ui-impl`, which reached its maximum rejection count during implementation or QA.

## Context
`task-348-462-gen3-ash-ui-impl` was responsible for integrating the `gen3VolcanicAsh` property into the frontend UI, displaying it in the Assistant Debug View, and fixing the `isGen3Save` stub. It failed permanently and was cancelled. This research task is needed to determine why it failed so a replacement implementation task can be accurately defined and avoid the same pitfalls.

## Findings
The failure was due to a testing blocker preventing QA validation. Specifically:
- `isGen3Save` in `src/engine/saveParser/utils/detection.ts` was implemented as a stub that always returned `false`.
- The QA task (`task-348-463-gen3-ash-ui-qa`) required E2E tests for the UI, but Playwright E2E tests for Gen 3 fail because the application cannot load Gen 3 saves when `isGen3Save` hard-returns `false`.
- The implementation task (`task-348-462-gen3-ash-ui-impl`) was supposed to "Fix `isGen3Save` based on the output of `research-348-461-investigate-isgen3save-stub`", but it appears this was either missing or failed validation, leading to repeated rejections and cancellation of the node.
- A replacement implementation task must correctly implement the Gen 3 signature check block parsing logic provided in `research-348-461-investigate-isgen3save-stub` (checking both `SAVE_BLOCK_A` and `SAVE_BLOCK_B` across 14 sections of 4096 bytes) and ensure tests pass, to unblock E2E validation.

## Acceptance Criteria
- [x] Investigate the failure reason for `task-348-462-gen3-ash-ui-impl` by reviewing relevant PRs, logs, or coder/QA journals.
- [x] Provide documented findings on why the implementation failed.
- [x] Outline specific steps or constraints the replacement implementation task must follow to succeed.
