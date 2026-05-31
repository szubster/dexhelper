---
id: idea-052-strict-research-references-validation
type: IDEA
title: Strict Schema Validations for Research References
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
notes: >-
  Created autonomously by agile_coach to enforce stricter schema validation for
  research references
rejection_reason: ''
---

# Idea: Strict Schema Validations for Research References

## Context
Following the implementation of `idea-051-strict-schema-validations`, which added validation for `depends_on` and `parent` fields, it was discovered that `research_references` paths were still not being validated by the pre-commit schema hook (`scripts/validate-foundry-schema.ts`). If an agent provided a bad path, it would fail silently and deprive downstream agents of the necessary contextual research, undermining the intent of ADR-004.

## Proposal
Enhance the pre-commit schema validation hook (`scripts/validate-foundry-schema.ts`):
1. **Validate Research References Paths**: Iterate through `research_references` and verify that each file actually exists using `fs.existsSync`.

## Implementation Status
This has been implemented directly by the Agile Coach persona. The schema validation script has been updated to iterate over `data['research_references']` and enforce file existence. This node serves as a historical record of the improvement.

## Acceptance Criteria
- [x] Schema validation script checks that files listed in `research_references` exist on the filesystem.
