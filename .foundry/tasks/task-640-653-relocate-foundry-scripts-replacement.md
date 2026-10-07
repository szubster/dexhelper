---
id: task-640-653-relocate-foundry-scripts-replacement
type: TASK
title: Relocate Foundry Scripts Replacement
status: READY
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-07'
depends_on:
  - research-640-652-investigate-relocate-scripts-failure
jules_session_id: null
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Relocate Foundry Scripts Replacement

Move `.github/scripts/` to `packages/foundry/`. Ensure the `packages/foundry/package.json` reflects its new location and name (`@dexhelper/foundry`). Update file paths referencing `.github/scripts/` to `packages/foundry/` across the repository (e.g. GitHub workflow files, `pnpm-workspace.yaml`, tests, etc). Ensure tests in `packages/foundry/fragments.test.ts` point to the correct absolute/relative path of `.github/agents/fragments`. Use the findings from the research task to avoid previous failure modes.

## Acceptance Criteria
- [ ] Move `.github/scripts/` to `packages/foundry/`
- [ ] Update `package.json` name to `@dexhelper/foundry`
- [ ] Update repository references to the new paths
- [ ] Tests and builds still pass
