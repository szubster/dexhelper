---
id: task-277-322-gen3-trick-house-parser-qa
type: TASK
title: Gen 3 Trick House Parser QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-15'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-111-277-trick-house-parser-qa
tags:
  - feature
  - gen3
  - mechanics
  - qa
  - testing
research_references:
  - .foundry/docs/knowledge_base/gen3_trick_house_offsets.md
  - .foundry/archive/docs/adrs/010-gen3-data-parsing.md
  - .foundry/archive/docs/adrs/adr-061-026-bitwise-state-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Gen 3 Trick House Parser QA

## Objective
Write and execute unit tests for the Gen 3 Trick House `DataView` parser to ensure accurate data extraction and proper bounds handling.

## Scope
- Validate parser logic against mock data for various Trick House progression states.
- Ensure correct bitwise operations and bounds handling in accordance with ADR 010 and ADR 026.
- Tests should cover all parsing paths within the Trick House logic.

## Context
The Gen 3 save parser requires verifying Trick House state extraction (ADR 010, ADR 026) to accurately read little-endian variables and flags using the `DataView` API. We need to test the extraction of the `VARS` and `FLAGS` blocks related to the Trick House state.

## QA Reminders & Policies
- **Empty PR Policy**: If the tests already exist or you are submitting a completed testing PR without source code changes, you MUST check off all Acceptance Criteria checkboxes in this markdown file before submitting the empty PR.
- **Transient Failures**: If you experience a transient failure that requires a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task (e.g., impossible to complete or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Save File Parsing Constraints**:
  - All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
  - The Coder must use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory. You must verify this in your tests or verify that the implemented code adheres to it.

## Acceptance Criteria
- [x] Unit tests are written and passing for all Trick House parsing paths (variables and flags).
- [x] Tests explicitly verify out-of-bounds reads throw a `RangeError` via the `DataView` API (ADR 010).
- [x] Tests verify correct bitwise extraction for the Trick House landmark flag (ADR 026).
- [x] Tests verify that the parser accurately processes mock variable data (e.g., puzzle states, entrance state).
- [x] Mock data utilizes section-relative offsets, not absolute offsets, simulating real A/B flash banks.
