---
id: task-639-669-extract-data-generation-scripts-v3
type: TASK
title: Extract Data Generation Scripts to Workspace Package v3
status: PENDING
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - research-639-668-investigate-extract-data-scripts-failure-v2
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

# Extract Data Generation Scripts to Workspace Package v3

Extract data generation scripts (`scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/`) into `@dexhelper/pokedata-extractor`.

## Acceptance Criteria
- [ ] Create `packages/pokedata-extractor/package.json` with the name `@dexhelper/pokedata-extractor` and scripts for data generation.
- [ ] Create `packages/pokedata-extractor/tsconfig.json` that extends `../config/tsconfig.base.json` with types for node.
- [ ] Move `scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/` to `packages/pokedata-extractor`.
- [ ] Update `generate-pokedata.ts` and test file imports to point to the new package path.
- [ ] Update `package.json` in the workspace root, `.github/workflows/sync-pokedata.yml`, and `knip.json` to point to the new locations.