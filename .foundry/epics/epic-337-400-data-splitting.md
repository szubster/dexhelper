---
id: epic-337-400-data-splitting
type: EPIC
title: Data Splitting by Game Generation
status: PENDING
owner_persona: story_owner
created_at: '2026-08-05'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-117-337-split-bundles-and-data
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
---
# Epic: Data Splitting by Game Generation

## Context
From PRD `prd-117-337-split-bundles-and-data`: Split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extension bundles to optimize data loading.

## Requirements
- Split monolithic `pokedata.msgpack` into a core bundle.
- Create generation-specific extension bundles.

## Acceptance Criteria
- [x] Story for extracting core data
- [x] Story for generating gen-specific extensions
- [x] Story dedicated exclusively to Integration and E2E Verification
- [ ] story-400-428-extract-core-data
- [ ] story-400-429-gen-specific-extensions
- [ ] story-400-430-data-splitting-integration-e2e
