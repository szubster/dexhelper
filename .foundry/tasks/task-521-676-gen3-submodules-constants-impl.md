---
id: task-521-676-gen3-submodules-constants-impl
type: TASK
title: Extract Gen 3 Submodule Constants
status: READY
owner_persona: coder
created_at: '2026-10-11'
updated_at: '2026-10-16'
depends_on: []
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

# Extract Gen 3 Submodule Constants

## Context & Problem Statement
Following ADR 028, we need to extract inline magic numbers for memory offsets, lengths, bit locations, and shifts from Gen 3 submodule save parsers (e.g., Feebas, Nature, Static Encounters) into explicitly defined module-level constants.

## Acceptance Criteria
- [ ] Create or update `constants.ts` files for relevant Gen 3 submodules to replace magic numbers with explicit constants.
- [ ] Ensure offsets use relative variables based on section offsets rather than hardcoded absolute memory values.
