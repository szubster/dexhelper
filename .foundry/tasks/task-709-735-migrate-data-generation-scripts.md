---
id: task-709-735-migrate-data-generation-scripts
type: TASK
title: Migrate Data Generation Scripts
status: PENDING
owner_persona: coder
created_at: '2026-10-31'
updated_at: '2026-11-02'
depends_on:
  - task-709-734-scaffold-pokedata-extractor
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

# Migrate Data Generation Scripts

Move the data generation scripts into the new package.

## Acceptance Criteria
- [ ] Move `scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/` to `@dexhelper/pokedata-extractor`
- [ ] Fix any import paths or relative file references broken by the move
