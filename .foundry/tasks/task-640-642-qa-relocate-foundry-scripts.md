---
id: task-640-642-qa-relocate-foundry-scripts
type: TASK
title: QA Relocate Foundry Scripts
status: PENDING
owner_persona: qa
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on:
  - task-640-641-relocate-foundry-scripts
jules_session_id: null
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Relocate Foundry Scripts

Verify that the relocation of `.github/scripts/` to `packages/foundry/` was completed correctly without breaking CI/CD pipelines, pnpm workspace scripts, or tests.

## Acceptance Criteria
- [ ] Code properly relocated
- [ ] References updated in workflows and tests
- [ ] All tests pass
