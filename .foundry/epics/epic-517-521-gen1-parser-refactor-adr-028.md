---
id: epic-517-521-gen1-parser-refactor-adr-028
type: EPIC
title: Refactor Gen 1 Parsers for ADR 028
status: READY
owner_persona: story_owner
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-104-517-refactor-existing-parsers-adr-028
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - gen1
research_references: []
rejection_reason: ''
locks: []
---

# EPIC: Refactor Gen 1 Parsers for ADR 028

## Context & Problem Statement
Following ADR 028, all inline magic numbers used for memory offsets, lengths, bit locations, and shifts in dynamic save block extraction must be replaced with explicitly defined module-level constants. This epic focuses on refactoring the existing save parsing logic for Generation 1 games.

## Acceptance Criteria
- [ ] Decompose this Epic into actionable Story nodes for Gen 1.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
