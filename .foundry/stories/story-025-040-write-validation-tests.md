---
id: story-025-040-write-validation-tests
type: STORY
title: Write Validation Tests for Orchestrator Pipeline Handoff
status: PENDING
owner_persona: tech_lead
created_at: "2026-05-04"
updated_at: "2026-05-04"
depends_on:
  - .foundry/stories/story-025-039-implement-failure-handling.md
jules_session_id: null
pr_number: null
parent: .foundry/epics/epic-014-025-enforce-persona-pipeline-handoffs.md
tags:
  - foundry
  - dag
  - orchestrator
  - validation
  - testing
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Story: Write Validation Tests for Orchestrator Pipeline Handoff

## Overview
Add unit tests to `foundry-orchestrator.test.ts` covering valid, invalid, and `human` ownership mappings.

## Acceptance Criteria
- [ ] Write test cases verifying correct type-to-persona mappings successfully dispatch.
- [ ] Write test cases verifying incorrect mapping transitions node to `FAILED` with specific `rejection_reason`.
- [ ] Write test case verifying `human` mapping skips validation.

## Next Step
- [ ] Create Task for testing.
