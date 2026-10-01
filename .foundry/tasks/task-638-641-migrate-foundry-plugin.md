---
id: task-638-641-migrate-foundry-plugin
type: TASK
title: Migrate Foundry Plugin
status: READY
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on:
  - task-638-639-init-vite-plugins-package
jules_session_id: null
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

# Migrate Foundry Plugin

Move `foundry-plugin.ts` from the root `vite-plugins/` directory to `packages/vite-plugins/src/`. Update all imports and ensure it builds correctly. Export it from `packages/vite-plugins/src/index.ts`.

## Acceptance Criteria
- [ ] Implement Migrate Foundry Plugin
