---
id: story-411-414-experiment-schema-e2e
type: STORY
title: Integration and E2E Verification for Experiment Schema
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-11'
updated_at: '2026-08-17'
depends_on:
  - story-411-412-define-experiment-schema
  - story-411-413-update-orchestrator-types
jules_session_id: '15616364122426030260'
pr_number: null
parent: epic-340-411-experiment-schema-updates
tags:
  - e2e
  - integration
  - schema
  - foundry
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integration and E2E Verification for Experiment Schema

## Objective
Verify that the `EXPERIMENT` node type and `experiment_variants` frontmatter field are properly parsed, validated, and integrated with the orchestrator testing framework, ensuring full system stability.

## Scope
1. Write and update Vitest schema validation tests in `.github/scripts/schema.test.ts` (or similar suite) to confirm Zod correctly parses valid files and rejects invalid definitions.
2. Confirm `.foundry/docs/schema.md` properly matches the runtime Zod schema logic.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
