---
id: task-474-529-gen3-substructure-api-tests
type: TASK
title: Tests for Gen 3 Substructure Resolution API
status: PENDING
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - task-474-528-gen3-substructure-api-impl
jules_session_id: null
pr_number: null
parent: story-131-474-gen3-substructure-mapping
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Tests for Gen 3 Substructure Resolution API

## Objective
Write unit tests for the newly implemented Gen 3 Substructure Resolution API.

## Context
A new API was created in `task-474-528-gen3-substructure-api-impl` to resolve and access the Growth, Attacks, EVs, and Misc substructures based on `PV % 24`. We need to verify this implementation against various known PV values to ensure accurate parsing.

## Acceptance Criteria
- [ ] Add unit tests verifying correct mapping and offset calculations for different PV values representing all possible 24 permutations.
- [ ] Assert that the returned substructure blocks match the expected offsets and sizes (12 bytes each).
- [ ] Ensure any exception handling (like RangeError mapping) is covered.
