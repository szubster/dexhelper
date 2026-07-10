---
id: task-246-262-create-relative-offsets-adr
type: TASK
title: Write Relative Offsets ADR
status: COMPLETED
owner_persona: architect
created_at: '2026-07-04'
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

# Write Relative Offsets ADR

## Objective
Establish a strict architectural ADR mandating that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level (forbidding inline magic numbers).

## Context
Based on the offset linter investigation (`.foundry/docs/architecture/offset_linter_investigation.md`), tooling limitations make a custom ESLint or Biome rule unfeasible or bloated. We are falling back to an ADR and code-review enforcement to ensure that dynamic save block extraction does not use inline magic numbers.

## Acceptance Criteria
- [x] Create a new ADR in `.foundry/docs/adrs/` mandating relative offsets and the use of reusable constants.
- [x] Ensure all documentation specifies the requirements for dynamic save block extraction.

## Developer Reminders
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save Parsing Guidelines:** This blueprint explicitly requires that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. This ADR enforces that constraint.
