---
id: task-645-665-agent-capability-integration-e2e-impl
type: TASK
title: Implement Integration and E2E Tests for Agent Confidence Capability
status: READY
owner_persona: coder
created_at: '2026-10-05T01:48:00Z'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-572-645-agent-capability-integration-e2e
tags:
  - e2e
  - integration
  - prompt
  - foundry
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Implement Integration and E2E Tests for Agent Confidence Capability

## Context
As part of the Agent Confidence Metrics epic, we need to ensure that our prompt compilation logic and agent capability accurately report confidence scores. This task is dedicated to writing integration tests or updating existing E2E testing to cover the new capability.

## Requirements
- Update `tests/e2e/prompt_fragment_layering.spec.ts` (or create a new test file if appropriate, e.g. `tests/e2e/agent_confidence.spec.ts`) to verify that agent confidence score prompts are integrated correctly.
- Alternatively, if the verification is done via `foundry-orchestrator.ts` integration tests (such as `prompt-compilation-e2e.test.ts`), verify the tests thoroughly cover confidence score behavior.
- Add an explicit E2E or integration test that passes a mock node with a low `confidence_score` and verifies that the system interprets the `confidence_score` capability correctly according to core policies.

## Acceptance Criteria
- [x] Implement or update E2E tests to verify agent confidence capability.
- [x] Tests pass locally and demonstrate the correctness of the confidence score processing.
