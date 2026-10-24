---
id: story-587-709-e2e-verification-macro-node-completeness
type: STORY
title: E2E Verification Macro Node Completeness Validator
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-18T18:43:00Z'
updated_at: '2026-10-22'
depends_on:
  - story-587-708-integrate-validator-with-orchestrator
jules_session_id: null
pr_number: null
parent: epic-585-587-implement-macro-node-subtree-completeness-validator
tags:
  - foundry
  - orchestrator
  - validation
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# E2E Verification Macro Node Completeness Validator

## Description
This story covers the Integration and E2E Verification of the Macro Node Subtree Completeness Validator Tool. We must ensure that the orchestrator behaves correctly when processing nodes with incomplete children, successfully preventing premature transitions.

## Acceptance Criteria
- [ ] Write integration/E2E tests to verify that a macro node with incomplete children cannot transition to `VERIFYING`.
- [ ] Write integration/E2E tests to verify that a macro node with all completed children successfully transitions to `VERIFYING`.
- [ ] Ensure the tests cover recursive child linkages (children of children).
