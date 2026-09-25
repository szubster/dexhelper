---
id: task-563-575-gen3-pokedex-version-exclusive-tests
type: TASK
title: Gen 3 Pokédex Version Exclusive Mapper Tests
status: READY
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-19'
depends_on:
  - task-563-574-gen3-pokedex-version-exclusive-mapper
jules_session_id: null
pr_number: null
parent: story-552-563-gen3-pokedex-version-exclusive-mapping
tags:
  - dexhelper
  - gen3
  - pokedex
  - typescript
research_references: []
rejection_reason: ''
locks: []
---

# Gen 3 Pokédex Version Exclusive Mapper Tests

## Description
Write comprehensive unit tests to cover the Gen 3 version exclusive mapping logic.

## Context & Technical Specifications
- Test edge cases, specifically interactions like Emerald vs Ruby exclusives, or FireRed vs LeafGreen.
- Ensure 100% logic coverage for `mapMissingToAvailability` and `getVersionExclusives`.

## Acceptance Criteria
- [x] Write unit tests for `getVersionExclusives`.
- [x] Write unit tests for `mapMissingToAvailability`.
- [x] Ensure all tests pass.
