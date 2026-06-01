---
id: task-043-074-qa-refactor-heartbeat-matter
type: TASK
title: QA Verification - Refactor heartbeat script to use gray-matter
status: COMPLETED
owner_persona: qa
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on:
  - task-043-073-refactor-heartbeat-matter
jules_session_id: null
pr_number: null
parent: story-028-043-migrate-heartbeat-to-gray-matter
tags:
  - foundry
  - orchestrator
  - qa
research_references:
  - .foundry/docs/adrs/006-gray-matter-parsing.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Verification - Refactor heartbeat script to use gray-matter

## Context
The coder has refactored `.github/scripts/foundry-heartbeat.ts` to use `gray-matter` for Markdown frontmatter parsing and modifications, compliant with ADR-006. Since this script manages critical orchestrator state transitions, we need strict verification.

## Requirements
1. Verify that `task-043-073-refactor-heartbeat-matter` correctly replaced regex mutations with `gray-matter` in `foundry-heartbeat.ts`.
2. Verify that `transitionNodeToFailed` and `transitionNodeToReady` correctly update `status`, `jules_session_id`, `updated_at`, and `rejection_count` (where applicable) without mangling the file content.
3. Run `pnpm test` or specific heartbeat tests to ensure no regressions.
4. Verify that the markdown body is preserved correctly.

## Acceptance Criteria
- [x] Code review confirms no regex mutations are used for frontmatter.
- [x] Tests pass.
