---
id: story-521-521-gen1-utils-refactor
type: STORY
title: Refactor Gen 1 Utility Magic Numbers
status: READY
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-517-521-gen1-parser-refactor-adr-028
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen1
research_references: []
rejection_reason: ''
locks: []
---

# STORY: Refactor Gen 1 Utility Magic Numbers

## Context & Problem Statement
In accordance with ADR 028, inline magic numbers must be replaced with module-level constants. The utility functions for Generation 1 (`src/engine/saveParser/utils/gen1EventFlags.ts` and similar) contain inline magic numbers for bitwise operations and offsets that must be refactored.

## Acceptance Criteria
- [x] Decompose this Story into actionable Task nodes for refactoring Gen 1 utilities.
- [ ] Ensure all inline magic numbers in `gen1EventFlags.ts` and other Gen 1 utilities are extracted to module-level constants.
- [ ] task-521-549-refactor-gen1-impl
- [ ] task-521-550-refactor-gen1-tests
- [ ] task-521-551-gen1-magic-number-qa
