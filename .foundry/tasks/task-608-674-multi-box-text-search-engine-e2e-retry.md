---
id: task-608-674-multi-box-text-search-engine-e2e-retry
type: TASK
title: Multi-Box Text Search Engine E2E (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-10-08'
updated_at: '2026-10-10'
depends_on:
  - task-608-617-multi-box-text-search-engine-impl
  - research-608-673-investigate-text-search-e2e-failure
jules_session_id: null
pr_number: null
parent: story-574-608-multi-box-text-search-engine
tags:
  - dexhelper
  - feature
  - search
  - pc-box
  - e2e
rejection_count: 0
rejection_reason: ''
notes: Replaces task-608-619 after investigation
locks: []
---

# Task: Multi-Box Text Search Engine E2E (Retry)

## Context
E2E testing for the Multi-Box Text Search Engine feature. This is a retry following the investigation of the previous permanent failures.

## Objectives
- Apply the learnings from the research node to create stable Playwright E2E tests.
- Verify the text search functionality works in the Box Analyzer.

## Acceptance Criteria
- [ ] Implement E2E tests for the Multi-Box Text Search in the Box Analyzer view, applying research findings.
- [ ] Verify search by Nickname, Species Name, and OT Name works from a user perspective.
- [ ] Pass the E2E tests.
