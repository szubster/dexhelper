---
id: task-640-641-relocate-foundry-scripts
type: TASK
title: Relocate Foundry Scripts
status: FAILED
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: COMPLETED'
notes: ''
locks: []
---

# Relocate Foundry Scripts

Move `.github/scripts/` to `packages/foundry/`. Ensure the `packages/foundry/package.json` reflects its new location and name (`@dexhelper/foundry`). Update file paths referencing `.github/scripts/` to `packages/foundry/` across the repository (e.g. GitHub workflow files, `pnpm-workspace.yaml`, tests, etc). Ensure tests in `packages/foundry/fragments.test.ts` point to the correct absolute/relative path of `.github/agents/fragments`.

## Acceptance Criteria
- [ ] Move `.github/scripts/` to `packages/foundry/`
- [ ] Update `package.json` name to `@dexhelper/foundry`
- [ ] Update repository references to the new paths
- [ ] Tests and builds still pass
