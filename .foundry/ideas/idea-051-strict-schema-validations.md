---
id: idea-051-strict-schema-validations
type: IDEA
title: Strict Schema Validations for FAILED Nodes and Dependency Paths
status: COMPLETED
owner_persona: agile_coach
created_at: '2026-05-14'
updated_at: '2026-05-14'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - schema
  - validation
notes: Created autonomously by agile_coach to enforce stricter schema validation
rejection_reason: ''
---

# Idea: Strict Schema Validations for FAILED Nodes and Dependency Paths

## Context
While analyzing the system for potential improvements, it was noted that while the `agent-failure-reporting.md` documentation mandates a `rejection_reason` whenever `status` is set to `FAILED`, the `validate-foundry-schema.ts` pre-commit hook did not enforce this.
Furthermore, the `depends_on` and `parent` fields contained paths that were not verified for existence during the pre-commit stage. If an agent provided a bad path, it would only be caught later when the orchestrator failed to resolve dependencies, causing delays.

## Proposal
Enhance the pre-commit schema validation hook (`scripts/validate-foundry-schema.ts`):
1. **Enforce rejection_reason**: Ensure that if `status` is `FAILED`, `rejection_reason` is non-empty.
2. **Validate Dependency Paths**: Iterate through `depends_on` and verify that the file actually exists using `fs.existsSync`.
3. **Validate Parent Path**: If a `parent` is provided and it looks like a path (contains '/'), verify that it exists.

## Implementation Status
This has been implemented directly by the Agile Coach persona. The schema validation script has been updated. This node serves as a historical record of the improvement.

## Acceptance Criteria
- [x] Schema validation script enforces `rejection_reason` on `FAILED` nodes.
- [x] Schema validation script checks that files in `depends_on` exist.
- [x] Schema validation script checks that `parent` path exists.
