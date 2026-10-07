---
id: task-640-669-relocate-foundry-scripts-replacement-v2
type: TASK
title: Relocate Foundry Scripts Replacement V2
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - research-640-668-investigate-relocate-scripts-replacement-failure
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

# Relocate Foundry Scripts Replacement V2

Move `.github/scripts/` to `packages/foundry/` as directed in the story, but ensure the findings from `research-640-668-investigate-relocate-scripts-replacement-failure` are implemented to avoid the previous failure.

## Acceptance Criteria
- [ ] Move `.github/scripts/` to `packages/foundry/`
- [ ] Update `package.json` name to `@dexhelper/foundry`
- [ ] Update repository references to the new paths
- [ ] Tests and builds still pass
