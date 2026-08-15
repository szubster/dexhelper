---
id: task-403-419-gen3-iv-pv-integration-impl
type: TASK
title: Implement Integration Tests for Gen 3 IV/PV Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-15'
depends_on:
  - story-112-402-gen3-iv-pv-extraction
jules_session_id: '9461419360079009733'
pr_number: null
parent: story-112-403-integration-e2e
tags:
  - dexhelper
  - integration
  - testing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Integration Tests for Gen 3 IV/PV Extraction

## Context
As part of `story-112-403-integration-e2e`, we need to write robust integration tests for Gen 3 IV and PV extraction logic to ensure that relative offsets for A/B banking are properly handled and bounds-checking is robust.

## Execution Blueprint

1. **Write Integration Tests**
   - Create Vitest integration tests targeting Gen 3 IV and PV extraction.
   - Specifically test the logic surrounding A/B bank flash memory architecture by providing mock saves simulating both A and B active banks.
   - Verify that corrupted or artificially small mock saves trigger a standard `RangeError` which the extraction function properly catches and re-throws as "The save file is corrupted or incomplete." as per ADR 010 / schema rules.

## Acceptance Criteria
- [ ] Integration tests for Gen 3 IV/PV extraction are written using Vitest.
- [ ] Tests validate A/B banking logic and relative offsets.
- [ ] Tests validate correct handling and re-throwing of RangeErrors for bounds issues.
- [ ] Tests pass via `pnpm test`.
