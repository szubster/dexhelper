---
id: story-523-521-gen3-parsers-refactor-modules
type: STORY
title: Refactor Gen 3 Submodule Parsers for ADR 028
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - story-523-520-gen3-parsers-refactor-core
jules_session_id: null
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
---

# STORY: Refactor Gen 3 Submodule Parsers for ADR 028

## Context & Problem Statement
Following the core refactoring, this story addresses the refactoring of Gen 3 submodule save parsers (e.g., Feebas, Nature, Static Encounters) to comply with ADR 028. All inline magic numbers for memory offsets, lengths, bit locations, and shifts must be replaced with explicitly defined module-level constants. Relative offsets must be used instead of hardcoded absolute offsets.

## Acceptance Criteria
- [ ] Decompose this Story into actionable Task nodes for the Gen 3 submodule parser refactoring.
- [ ] Ensure Tasks address defining module-level constants and implementing relative offsets for all relevant submodules.
