---
id: task-404-408-gen3-secret-base-parser-impl
type: TASK
title: Gen 3 Secret Base Parsing Engine Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-404-407-gen3-secret-base-types-impl
jules_session_id: '676485139982691484'
pr_number: null
parent: story-397-404-gen3-secret-base-parsing-core
tags:
  - task
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Gen 3 Secret Base Parsing Engine Implementation

## Context
Following the definition of the Secret Base types, this task implements the core `DataView`-based save file parsing logic to extract Secret Base details from Gen 3 save files.

## Objectives
- Implement the parsing logic to extract Gen 3 Secret Base data using the `DataView` API.
- Adhere strictly to the `Save File Parsing & Extraction Guidelines` in Section 13 of `.foundry/docs/schema.md`.
- Adhere to `ADR 010: Gen3 Data Parsing Strategy`.

## Acceptance Criteria
- [x] Implement `DataView` based parser for Gen 3 Secret Bases.
- [x] Ensure all memory offsets, lengths, bit locations, shifts, and masks are defined as reusable module-level constants (No inline magic numbers).
- [x] Calculate relative memory offsets using the resolved section offset (e.g., `section1Offset`), rather than absolute hardcoded offsets, to support Gen 3 A/B bank flash memory.
- [x] Catch `RangeError` from out-of-bounds reads and throw a new error with the exact message: 'The save file is corrupted or incomplete.'
- [x] Write unit tests verifying successful parsing, corrupted file handling (`RangeError`), and correct relative offset usage.
