---
id: task-101-157-gen3-condition-stats-parsing
type: TASK
title: Implement Gen 3 Condition Stats Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '8986521882516828404'
pr_number: null
parent: story-064-101-gen3-condition-stats-parsing
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Condition Stats Parsing

## Context
This task implements the logic to extract Gen 3 contest condition statistics (Cool, Beauty, Cute, Smart, Tough) for each Pokémon from save files. This work is based on the requirements of `story-064-101-gen3-condition-stats-parsing`.

## Instructions for Coder

1. **Locate Data Block**: Identify the correct block and offset for Condition stats in the Gen 3 save format.
2. **Implement Extraction**: Extract the Cool, Beauty, Cute, Smart, and Tough values.
3. **DataView API Only**: You MUST exclusively use the native `DataView` API (e.g., `getUint8`) for all parsing logic. Do not use raw `Uint8Array` manipulations.
4. **Error Handling**: Allow `DataView` to throw `RangeError` on out-of-bounds reads and handle them gracefully as required by ADR 010.

## Acceptance Criteria
- [ ] Logic correctly parses Gen 3 Condition stats (Cool, Beauty, Cute, Smart, Tough).
- [ ] The `DataView` API is exclusively used for all new parsing logic.
- [ ] No regressions in Gen 1 and Gen 2 parsing interfaces.

---

### Important Reminder
- **Permanent Failure**: If you encounter an impossible issue or permanent failure, you MUST update the YAML frontmatter to `status: FAILED` with a clear `rejection_reason`.
- **Empty PRs**: If the artifact already exists and is complete, you MUST submit an empty PR. However, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) before doing so.
