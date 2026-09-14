---
id: task-080-133-refactor-generation-exports-qa
type: TASK
title: Refactor Data Generation Pipeline to Verbose Keys - QA
status: CANCELLED
owner_persona: qa
created_at: '2026-05-22'
updated_at: '2026-09-04'
depends_on:
  - task-080-132-refactor-generation-exports-impl
jules_session_id: null
pr_number: null
parent: story-042-080-refactor-generation-exports
tags:
  - data-pipeline
  - qa
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-080-132-refactor-generation-exports-impl
notes: ''
locks: []
---

# Task: Refactor Data Generation Pipeline to Verbose Keys - QA

## Objective
Verify that the implementation of verbose property names is complete and functionally sound according to ADR 015.

## Acceptance Criteria
- [ ] The generated data structure in `data/db/` matches the schema with verbose keys.
- [ ] The web app loads and uses the new keys properly without errors.
- [ ] All unit and type tests pass without errors (`pnpm lint && pnpm test && pnpm type-check`).
