---
id: story-521-520-gen1-parser-refactor-core
type: STORY
title: Refactor Gen 1 Core Parser Magic Numbers
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '16452059404243216778'
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

# STORY: Refactor Gen 1 Core Parser Magic Numbers

## Context & Problem Statement
As part of ADR 028, we need to eliminate inline magic numbers in our save parsing logic. The Gen 1 core parser (`src/engine/saveParser/parsers/gen1.ts`) contains various inline offsets, shifts, and bit masks used for extraction. These must be replaced with explicitly defined module-level constants.

## Acceptance Criteria
- [x] Decompose this Story into actionable Task nodes for refactoring `gen1.ts`.
- [ ] Ensure all inline memory offsets, lengths, bit locations, and shifts in the core Gen 1 parser are extracted to constants.
- [ ] task-520-549-gen1-parser-constants-impl
- [ ] task-520-550-gen1-parser-refactor-impl
- [ ] task-520-551-gen1-parser-refactor-qa
