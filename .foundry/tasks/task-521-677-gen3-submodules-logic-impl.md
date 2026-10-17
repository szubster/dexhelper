---
id: task-521-677-gen3-submodules-logic-impl
type: TASK
title: Implement Gen 3 Submodule Logic Refactoring
status: PENDING
owner_persona: coder
created_at: '2026-10-11'
updated_at: '2026-10-11'
depends_on:
  - task-521-676-gen3-submodules-constants-impl
jules_session_id: null
locks: []
pr_number: null
parent: story-523-521-gen3-parsers-refactor-modules
priority: 50
confidence_score: null
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Submodule Logic Refactoring

## Context & Problem Statement
With the constants defined, we must update the logic inside Gen 3 submodule parsers to use the extracted constants, specifically employing relative offsets instead of hardcoded absolute offsets as per ADR 028.

## Acceptance Criteria
- [ ] Update `parser.ts` logic in relevant Gen 3 submodules to use newly defined constants from `constants.ts`.
- [ ] Ensure bitwise mapping and bounds checking properly handle potential `RangeError` exceptions with "The save file is corrupted or incomplete."
