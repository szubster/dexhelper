---
id: task-709-736-update-workspace-scripts
type: TASK
title: Update Workspace Scripts
status: PENDING
owner_persona: coder
created_at: '2026-10-31'
updated_at: '2026-11-02'
depends_on:
  - task-709-735-migrate-data-generation-scripts
jules_session_id: null
pr_number: null
parent: story-525-709-extract-data-generation-scripts-retry
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Workspace Scripts

Update root workspace scripts to invoke the data generation commands from the new package.

## Acceptance Criteria
- [ ] Update root `package.json` scripts to reference the extracted data generation scripts in `@dexhelper/pokedata-extractor`
- [ ] Verify that running the data generation scripts from the root workspace executes correctly
- [ ] Ensure `pnpm build` and `pnpm check` pass cleanly for the new package
