---
id: task-638-642-update-dexhelper-vite-config
type: TASK
title: Update DexHelper Vite Config
status: ACTIVE
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-05'
depends_on:
  - task-638-640-migrate-pokedata-plugin
  - task-638-641-migrate-foundry-plugin
jules_session_id: '8912474216569067211'
pr_number: null
parent: story-525-638-isolate-vite-plugins
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update DexHelper Vite Config

Update the main `dexhelper` workspace to depend on `@dexhelper/vite-plugins` and update `vite.config.ts` to import the plugins from the new package. Delete the old `vite-plugins/` root directory.

## Acceptance Criteria
- [ ] Implement Update DexHelper Vite Config
