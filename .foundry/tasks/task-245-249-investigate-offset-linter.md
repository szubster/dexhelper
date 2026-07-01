---
id: task-245-249-investigate-offset-linter
type: TASK
title: Investigate Linter for Save Parsing Offsets
status: PENDING
owner_persona: coder
created_at: '2026-06-30'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-103-245-investigate-offset-linter
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - tooling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Linter for Save Parsing Offsets

## Objective
Investigate if a custom ESLint or Biome rule can be built to flag hardcoded absolute offsets during save file parsing.

## Context
Currently, save file extraction uses absolute hardcoded offsets for dynamic blocks, which can lead to unpredictable behavior and regressions. We need to investigate tooling options to enforce that memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level rather than as inline magic numbers.

## Acceptance Criteria
- [ ] Investigate the feasibility of creating a custom ESLint or Biome rule.
- [ ] Document findings and propose next steps (either create the rule or fall back to an ADR). The documentation should be placed in `.foundry/docs/architecture/offset_linter_investigation.md` (or similar appropriate location).
- [ ] Self-verification: The `coder` persona will self-verify the findings in their journal, as this is an exploratory task with no runtime risks.

## Developer Reminders
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail this task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save Parsing Guidelines:** This blueprint explicitly requires that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. This task investigates enforcing that constraint.
