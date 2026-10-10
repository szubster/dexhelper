---
id: task-640-670-qa-relocate-foundry-scripts-replacement-v2
type: TASK
title: QA Relocate Foundry Scripts Replacement V2
status: CANCELLED
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-640-669-relocate-foundry-scripts-replacement-v2
jules_session_id: null
pr_number: null
parent: story-525-640-relocate-foundry-scripts
tags:
  - architecture
  - monorepo
  - pnpm
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-640-668-investigate-relocate-scripts-replacement-failure
notes: ''
locks: []
---

# QA Relocate Foundry Scripts Replacement V2

Verify that the scripts were relocated correctly and that no tests or builds are broken.

## Acceptance Criteria
- [ ] Scripts are correctly located in `packages/foundry/`
- [ ] References to the old path are updated
- [ ] Tests and builds pass without issue
