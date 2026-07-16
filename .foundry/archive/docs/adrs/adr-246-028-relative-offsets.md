---
id: adr-246-028-relative-offsets
type: ADR
title: Relative Offsets & Magic Numbers
status: COMPLETED
owner_persona: architect
created_at: '2026-07-05'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-103-246-create-relative-offsets-adr
tags:
  - architecture
  - save-parsing
  - offset-mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 028: Relative Offsets & Magic Numbers

## Context
When extracting dynamic save blocks in the save parsing engine, developers sometimes use inline magic numbers for memory offsets, lengths, bit locations, and shifts. This practice makes the code harder to read, maintain, and review. Based on the offset linter investigation (`.foundry/docs/architecture/offset_linter_investigation.md`), automated linting tools (like Biome or Oxlint) currently lack the custom rule capabilities needed to enforce this without introducing significant bloat.

## Decision
We formally mandate that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level.
- **Forbid Inline Magic Numbers**: The use of inline magic numbers for offsets or bit operations during dynamic save block extraction is strictly prohibited.
- **Enforcement**: This rule will be enforced through architectural guidelines and mandatory code-review checks.

## Consequences
- **Positive**: Improved readability, maintainability, and consistency of the save parsing engine.
- **Negative**: Adds a slight overhead to development, requiring developers to extract and define constants even for one-off memory reads.

## Acceptance Criteria
- [x] Mandate relative offsets and the use of reusable constants.