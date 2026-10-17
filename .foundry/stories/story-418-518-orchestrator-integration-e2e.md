---
id: story-418-518-orchestrator-integration-e2e
type: STORY
title: Orchestrator Integration E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-10-14'
depends_on:
  - story-418-517-orchestrator-fallback-mechanisms
jules_session_id: '17592586293509545871'
pr_number: null
parent: epic-343-418-orchestrator-integration
tags:
  - foundry
  - orchestrator
  - integration
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Integration E2E Verification

## Description
Perform end-to-end verification of the orchestrator's prompt resolution integration, ensuring composite prompts are generated correctly and missing layers are handled properly during session dispatch.

## Acceptance Criteria
- [ ] Write E2E tests validating the composite prompt generation process in the orchestrator.
- [ ] Verify fallback mechanisms via test scenarios with missing prompt fragments.
- [x] Decompose into actionable TASK nodes.
- [ ] task-518-680-orchestrator-integration-e2e-fixtures
- [ ] task-518-681-orchestrator-integration-composite-prompt-tests
- [ ] task-518-682-orchestrator-integration-fallback-tests
- [ ] task-518-683-qa-orchestrator-integration-e2e
