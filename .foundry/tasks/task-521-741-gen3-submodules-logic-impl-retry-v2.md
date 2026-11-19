---
id: task-521-741-gen3-submodules-logic-impl-retry-v2
type: TASK
title: Implement Gen 3 Submodule Logic Refactoring (Retry v2)
status: READY
owner_persona: coder
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on:
  - research-521-740-gen3-submodules-logic-failure
jules_session_id: null
pr_number: null
parent: story-523-521-gen3-parsers-refactor-modules
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement Gen 3 Submodule Logic Refactoring (Retry v2)

## Context & Problem Statement
With the constants defined, we must update the logic inside Gen 3 submodule parsers to use the extracted constants, specifically employing relative offsets instead of hardcoded absolute offsets as per ADR 028. This is a retry of `task-521-705-gen3-submodules-logic-impl-retry` following the investigation from `research-521-740-gen3-submodules-logic-failure`.

## Acceptance Criteria
- [ ] Read guidance from `research-521-740-gen3-submodules-logic-failure`.
- [ ] Update `parser.ts` logic in relevant Gen 3 submodules to use newly defined constants from `constants.ts`.
- [ ] Ensure bitwise mapping and bounds checking properly handle potential `RangeError` exceptions with "The save file is corrupted or incomplete."
