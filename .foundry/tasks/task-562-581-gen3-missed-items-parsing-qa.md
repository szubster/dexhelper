---
id: task-562-581-gen3-missed-items-parsing-qa
type: TASK
title: QA Gen 3 Missed Items & Milestones Parsing Core
status: READY
owner_persona: qa
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-562-580-gen3-missed-items-parsing-tests-coder
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
rejection_reason: ''
---

# Task: QA Gen 3 Missed Items & Milestones Parsing Core

## Description
Verify the parsed offsets and integration of the missed milestones and items parsing logic implemented by the coder.

## Acceptance Criteria
- [ ] Ensure memory offsets are module-level constants and correctly use relative offset calculations.
- [ ] Ensure missing items/milestones are handled properly.
- [ ] Verify `RangeError` logic correctly intercepts bad boundaries and throws "The save file is corrupted or incomplete."
- [ ] Run `pnpm lint` and `pnpm test` to ensure no regressions are introduced.
