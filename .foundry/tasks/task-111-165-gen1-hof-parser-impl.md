---
id: task-111-165-gen1-hof-parser-impl
type: TASK
title: Implement Gen 1 Hall of Fame Parsing
status: READY
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-111-parse-gen1-hof-data
tags:
  - task
  - hall-of-fame
  - gen1
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 1 Hall of Fame Parsing

## Overview
Implement logic to extract the Hall of Fame data and count from Generation 1 (Red, Blue, Yellow) save files.

## Technical Details (from ADR 021)
- The Hall of Fame count is located at the base offset `0x25B3`.
- `offsetShift` needs to be accounted for: `1` for Yellow, `0` for Red/Blue.
- Parse the value at `0x25B3 + offsetShift` as an 8-bit unsigned integer.
- Ignore `0xFF` by treating it as `0`.
- **DataView Requirement**: As mandated by `dataview_migration.md`, all parsing logic MUST exclusively use the native `DataView` API (e.g., `getUint8`) to ensure robust bounds checking.

## Important Directives
- **Do not modify this YAML frontmatter** unless you are marking this task as `FAILED` or `CANCELLED`. In such cases, provide a clear `rejection_reason`.
- If you submit an empty PR to verify a pre-existing target artifact, you MUST check off all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Implement Gen 1 Hall of Fame count parsing using `DataView.getUint8`.
- [ ] Account for the `offsetShift` (`1` for Yellow, `0` for Red/Blue) from base offset `0x25B3`.
- [ ] Treat a raw parsed value of `0xFF` as `0`.
