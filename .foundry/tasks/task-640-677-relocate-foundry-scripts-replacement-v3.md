---
id: task-640-677-relocate-foundry-scripts-replacement-v3
type: TASK
title: Relocate Foundry Scripts Replacement V3
status: PENDING
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-640-676-investigate-relocate-scripts-replacement-failure-retry
jules_session_id: null
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Relocate Foundry Scripts Replacement V3

Move `.github/scripts/` to `packages/foundry/` as directed in the story, but ensure the findings from `research-640-676-investigate-relocate-scripts-replacement-failure-retry` are implemented to avoid the previous failure.

## Acceptance Criteria
- [ ] Move `.github/scripts/` to `packages/foundry/`
- [ ] Update `package.json` name to `@dexhelper/foundry`
- [ ] Update repository references to the new paths
- [ ] Tests and builds still pass
