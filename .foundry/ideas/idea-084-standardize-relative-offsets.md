---
id: idea-084-standardize-relative-offsets
type: IDEA
title: Standardize Relative Offsets for Dynamic Data Parsing
status: PENDING
owner_persona: product_manager
created_at: '2026-06-18'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - architecture
  - save-parsing
  - offset-mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Standardize Relative Offsets for Dynamic Data Parsing

## Problem
Currently, save file extraction uses absolute hardcoded offsets for dynamic blocks, which can lead to unpredictable behavior and regressions when save memory structures subtly shift between versions (as seen during Gen 2 Hall of Fame parsing). These absolute offsets fail when initialization or minor artifacts disrupt the expected byte indices.

## Proposed Solution
We need an architectural rule (e.g., an ADR) or a linter check to enforce that, whenever extracting dynamic data blocks from save files, the implementation must utilize dynamic, relative offset calculations anchored to a known stable position within the player data block, rather than relying on assumed absolute byte offsets.

## Expected Value
- Improved robustness of the save parsing engine across versions and edge cases.
- Less technical debt when scaling data extraction to later game generations (Gen 3).
- Ensures regressions caused by absolute offset shifts are mitigated at compile-time/review-time.

## Acceptance Criteria
- [x] Investigate if a linter rule can be built to flag hardcoded offsets during save parsing.
- [ ] .foundry/prds/prd-084-053-standardize-relative-offsets.md
- [ ] If a linter is not feasible, establish a strict architectural ADR mandating relative offset mapping for dynamic save block extraction.
- [ ] Roll out guidance to Coder and QA personas.
