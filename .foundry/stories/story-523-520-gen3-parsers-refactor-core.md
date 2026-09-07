---
id: story-523-520-gen3-parsers-refactor-core
type: STORY
title: Refactor Gen 3 Core Parsers for ADR 028
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '7979974763882733177'
pr_number: null
parent: epic-517-523-gen3-parser-refactor-adr-028
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
---

# STORY: Refactor Gen 3 Core Parsers for ADR 028

## Context & Problem Statement
This story addresses the refactoring of core Gen 3 save parsers to comply with ADR 028. Currently, inline magic numbers are used for memory offsets, lengths, bit locations, and shifts in dynamic save block extraction. These must be replaced with explicitly defined module-level constants to improve readability, maintainability, and consistency. Additionally, relative offsets must be implemented using the resolved section offset to support the A/B bank flash memory architecture properly.

## Acceptance Criteria
- [ ] Decompose this Story into actionable Task nodes for the core Gen 3 parser refactoring.
- [ ] Ensure Tasks address defining module-level constants and implementing relative offsets for core extraction functions.
