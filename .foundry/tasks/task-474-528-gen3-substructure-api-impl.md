---
id: task-474-528-gen3-substructure-api-impl
type: TASK
title: Implement Gen 3 Substructure Resolution API
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '13967949556162539403'
pr_number: null
parent: story-131-474-gen3-substructure-mapping
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Substructure Resolution API

## Objective
Implement the logic to resolve the substructure order within the decrypted 48-byte block and expose an API to access these specific blocks easily.

## Context
The 48-byte block consists of four 12-byte substructures: Growth (G), Attacks (A), EVs & Condition (E), and Miscellaneous (M). Their order varies per Pokémon and is determined by `PV % 24`. While some core mapping logic exists, a clean, modular API needs to be exposed for easy substructure retrieval.

## Acceptance Criteria
- [ ] Implement or extract the logic to calculate the order of these substructures using the formula `PV % 24`.
- [ ] Expose an API (e.g., functions) to easily retrieve specific 12-byte substructure blocks (G, A, E, M) from a decrypted block.
- [ ] Adhere to schema constraints: Use relative offsets, avoid magic numbers, use module-level constants, and catch RangeError.
