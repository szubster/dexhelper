---
id: task-111-166-gen1-hof-parser-qa
type: TASK
title: Verify Gen 1 Hall of Fame Parsing
status: PENDING
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - task-111-165-gen1-hof-parser-impl
jules_session_id: null
pr_number: null
parent: story-070-111-parse-gen1-hof-data
tags:
  - task
  - qa
  - hall-of-fame
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Gen 1 Hall of Fame Parsing

## Overview
Verify the Coder's implementation of the Gen 1 Hall of Fame parser.

## Verification Tasks
- Ensure tests verify the Hall of Fame parsing using the `DataView` API.
- Ensure tests cover both Red/Blue (`offsetShift` = 0) and Yellow (`offsetShift` = 1) variants correctly at the base offset `0x25B3`.
- Ensure tests verify that a parsed raw value of `0xFF` is mapped to `0`.

## Important Directives
- **Do not modify this YAML frontmatter** unless you are marking this task as `FAILED` or `CANCELLED`. In such cases, provide a clear `rejection_reason`.
- If you submit an empty PR to verify a pre-existing target artifact, you MUST check off all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Tests exist for Gen 1 HoF count extraction (Red/Blue vs Yellow).
- [ ] Code uses `DataView` API.
