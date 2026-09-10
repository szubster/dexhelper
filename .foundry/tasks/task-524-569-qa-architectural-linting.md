---
id: task-524-569-qa-architectural-linting
type: TASK
title: QA Architectural Linting
status: PENDING
owner_persona: qa
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on:
  - task-524-568-setup-oxlint-rules
jules_session_id: null
pr_number: null
parent: story-524-524-architectural-linting
tags:
  - architecture
  - monorepo
  - linting
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Architectural Linting

## Objectives
- Verify that `dependency-cruiser` and Oxlint rules are correctly enforcing cross-package boundaries.
- Ensure that forbidden imports trigger the expected linting errors.

## Acceptance Criteria
- [ ] Verify that running the linting scripts (`pnpm lint:deps`, `pnpm lint`) successfully enforces architectural boundaries.
- [ ] Create a temporary, forbidden import in the codebase and verify that it is flagged as an error by both `dependency-cruiser` and Oxlint (then remove it).
