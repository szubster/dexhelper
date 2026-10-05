---
id: task-638-642-update-dexhelper-vite-config
type: TASK
title: Update DexHelper Vite Config
status: COMPLETED
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-05'
depends_on:
  - task-638-640-migrate-pokedata-plugin
  - task-638-641-migrate-foundry-plugin
jules_session_id: null
pr_number: null
parent: story-525-638-isolate-vite-plugins
tags:
  - architecture
  - monorepo
  - pnpm
confidence_score: 100
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update DexHelper Vite Config

Update the main `dexhelper` workspace to depend on `@dexhelper/vite-plugins` and update `vite.config.ts` to import the plugins from the new package. Delete the old `vite-plugins/` root directory.

## Acceptance Criteria
- [x] Implement Update DexHelper Vite Config
