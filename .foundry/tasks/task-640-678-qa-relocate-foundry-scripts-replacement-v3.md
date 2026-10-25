---
id: task-640-678-qa-relocate-foundry-scripts-replacement-v3
type: TASK
title: QA Relocate Foundry Scripts Replacement V3
status: ACTIVE
owner_persona: qa
created_at: '2026-10-10'
updated_at: '2026-10-24'
depends_on:
  - task-640-677-relocate-foundry-scripts-replacement-v3
jules_session_id: '8444314448714998799'
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

# QA Relocate Foundry Scripts Replacement V3

Verify that the scripts were relocated correctly and that no tests or builds are broken.

## Acceptance Criteria
- [ ] Scripts are correctly located in `packages/foundry/`
- [ ] References to the old path are updated
- [ ] Tests and builds pass without issue
