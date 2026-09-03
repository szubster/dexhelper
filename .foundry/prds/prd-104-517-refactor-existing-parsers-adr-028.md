---
id: prd-104-517-refactor-existing-parsers-adr-028
type: PRD
title: Refactor Existing Parsers for ADR 028
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '3819859849405847921'
pr_number: null
parent: idea-104-refactor-existing-parsers-adr-028
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - technical-debt
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Refactor Existing Parsers for ADR 028

## Context & Problem Statement
During the completion of `epic-053-103-relative-offsets-adr`, ADR 028 was established which mandates the use of reusable constants for memory offsets, lengths, bit locations, and shifts instead of inline magic numbers. Existing save parsing logic across all generations needs to be refactored to align with this architectural constraint.

## Proposed Solution
Refactor existing save parsing code across all generations (Gen 1, Gen 2, Gen 3) to strictly comply with ADR 028. Remove all inline magic numbers used for memory offsets, lengths, bit locations, and shifts in dynamic save block extraction, and replace them with explicitly defined module-level constants.

## Acceptance Criteria
- [ ] Break down this PRD into Epics.
