---
id: task-479-576-gen3-pokeblock-e2e-impl
type: TASK
title: Implement Gen 3 Pokéblock E2E Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: '13822734523934979950'
pr_number: null
parent: story-400-479-gen3-pokeblock-parsing-e2e
tags:
  - gen3
  - pokeblocks
  - e2e
  - playwright
research_references:
  - .foundry/docs/knowledge_base/gen3_pokeblock_offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Pokéblock E2E Tests

## Context
We need to verify the Gen 3 Pokéblock parsing logic using real save files to ensure accurate extraction.

## Acceptance Criteria
- [ ] Create a new Playwright test file `tests/e2e/gen3_pokeblocks.spec.ts`.
- [ ] Implement E2E tests verifying Pokéblock extraction for Emerald using an Emerald save file fixture by navigating to the relevant UI dashboard.
- [ ] Implement E2E tests verifying Pokéblock extraction for Ruby/Sapphire using a Ruby/Sapphire save file fixture.
- [ ] Verify that FireRed/LeafGreen saves appropriately handle the absence of Pokéblocks (either returning null or empty arrays, and the UI handling it gracefully).
