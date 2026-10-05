---
id: task-639-659-extract-data-generation-scripts-v2
type: TASK
title: Extract Data Generation Scripts to Workspace Package
status: PENDING
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on:
  - research-639-658-investigate-extract-data-scripts-failure
jules_session_id: null
pr_number: null
parent: story-525-639-extract-data-generation-scripts
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Extract Data Generation Scripts to Workspace Package

Extract data generation scripts (`scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/`) into `@dexhelper/pokedata-extractor`.

## Acceptance Criteria
- [ ] Create `packages/pokedata-extractor/package.json` with the name `@dexhelper/pokedata-extractor` and scripts for data generation.
- [ ] Create `packages/pokedata-extractor/tsconfig.json` that extends `../config/tsconfig.base.json` with types for node.
- [ ] Move `scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/` to `packages/pokedata-extractor`.
- [ ] Update `generate-pokedata.ts` and test file imports to point to the new package path.
- [ ] Update `package.json` in the workspace root, `.github/workflows/sync-pokedata.yml`, and `knip.json` to point to the new locations.
