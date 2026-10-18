---
id: task-639-676-extract-data-generation-scripts-v5
type: TASK
title: Extract Data Generation Scripts to Workspace Package v5
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-18'
depends_on:
  - research-639-675-investigate-extract-data-scripts-failure-v4
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

# Extract Data Generation Scripts to Workspace Package v5

Extract data generation scripts (`scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/`) into `@dexhelper/pokedata-extractor`.

## Acceptance Criteria
- [x] Create `packages/pokedata-extractor/package.json` with the name `@dexhelper/pokedata-extractor` and scripts for data generation.
- [x] Create `packages/pokedata-extractor/tsconfig.json` that extends `../config/tsconfig.base.json` with types for node.
- [x] Move `scripts/generate-pokedata.ts`, `scripts/generateMapLocations.ts`, `scripts/gen3-fetch-locations.ts`, `scripts/sync-pokedata.sh`, `scripts/README.md` and `scripts/data/` to `packages/pokedata-extractor`.
- [x] Update `generate-pokedata.ts` and test file imports to point to the new package path.
- [x] Update `package.json` in the workspace root, `.github/workflows/sync-pokedata.yml`, and `knip.json` to point to the new locations.
