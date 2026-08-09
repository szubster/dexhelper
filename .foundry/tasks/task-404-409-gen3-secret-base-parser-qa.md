---
id: task-404-409-gen3-secret-base-parser-qa
type: TASK
title: QA - Gen 3 Secret Base Parsing Engine
status: PENDING
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-404-408-gen3-secret-base-parser-impl
jules_session_id: null
pr_number: null
parent: story-397-404-gen3-secret-base-parsing-core
tags:
  - task
  - qa
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA - Gen 3 Secret Base Parsing Engine

## Context
A QA pass is required to verify the complex logic implemented for the Gen 3 Secret Base parsing engine, specifically ensuring adherence to architectural constraints.

## Objectives
- Review and verify the implementation of `task-404-408-gen3-secret-base-parser-impl`.
- Ensure strict adherence to ADR 010 and Section 13 of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Verify that `DataView` is used exclusively for memory access.
- [ ] Verify that there are no inline magic numbers (all constants are module-level).
- [ ] Verify that relative offsets are used correctly, passing in the section offset.
- [ ] Verify that out-of-bounds `DataView` errors (`RangeError`) are caught and the exact message `'The save file is corrupted or incomplete.'` is thrown.
- [ ] Verify unit tests cover standard and edge-case (corrupted) save files.

## QA Notes
- Rejected `task-404-408-gen3-secret-base-parser-impl` for violating Section 13 (No Magic Numbers) of the schema. The implementation hardcoded `0` for empty secret bases (`if (secretBaseId === 0)`) and in the bitwise check (`(flags & BATTLED_OWNER_TODAY_MASK) !== 0`).

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
