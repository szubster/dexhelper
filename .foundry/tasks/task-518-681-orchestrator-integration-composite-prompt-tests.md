---
id: task-518-681-orchestrator-integration-composite-prompt-tests
type: TASK
title: Orchestrator Integration Composite Prompt Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-16'
depends_on:
  - task-518-680-orchestrator-integration-e2e-fixtures
jules_session_id: null
pr_number: null
parent: story-418-518-orchestrator-integration-e2e
tags:
  - foundry
  - orchestrator
  - integration
  - e2e
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Integration Composite Prompt Tests

## Description
Implement the E2E tests validating the successful composite prompt generation process in the orchestrator, ensuring it accurately resolves and combines the 3-tier layered composition (Base, Specific Layers, Core Policies) at dispatch time.

## Acceptance Criteria
- [ ] Write E2E test cases to verify the orchestrator generates the expected composite prompt.
- [ ] Ensure that core policies are appended correctly without duplication.
- [ ] Verify that specific context layers are included based on the node's frontmatter tags.
