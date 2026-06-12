---
id: story-062-098-gen3-parse-32bit-pv
type: STORY
title: Extract full 32-bit PV using DataView API
status: READY
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-062-personality-value-extraction
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract full 32-bit PV using DataView API

## Context
As part of the Mirage Island checking feature (Epic `epic-038-062-personality-value-extraction`), we need to parse the full 32-bit personality value (PV) for Gen 3 Pokémon. This requires adhering to ADR 010 by using the native `DataView` API for safe and maintainable binary parsing.

## Requirements
1. **Implementation Details**: Write task definitions to safely extract the 32-bit PV using the `DataView` API. Ensure that the parser throws explicit, catchable `RangeError` on out-of-bounds reads and propagates them properly.
2. **Backwards Compatibility**: Keep the original Gen 1 and Gen 2 handlers functional without altering legacy parsing.

## Acceptance Criteria
- [x] Tech Lead: Generate child tasks to update the extraction logic.
- [x] .foundry/archive/tasks/task-098-157-gen3-parse-pv-impl.md
- [x] .foundry/tasks/task-098-158-gen3-parse-pv-qa.md
