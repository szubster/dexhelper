---
id: research-108-187-gen3-secret-base-offsets
type: RESEARCH
title: Investigate Gen 3 Secret Base Memory Offsets
status: READY
owner_persona: researcher
created_at: '2026-06-15'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-108-163-gen3-secret-base-parser
tags:
  - research
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Gen 3 Secret Base Memory Offsets

## Objective
To successfully implement the Gen 3 Secret Base Parser (`task-108-163-gen3-secret-base-parser`), we need to identify the exact memory offsets and data structures for Secret Bases in Gen 3 save files (Ruby, Sapphire, Emerald).

## Questions to Answer
1. In which save block and at what specific offsets is the Secret Base data located?
2. What is the layout of the Secret Base data structure (e.g., size per entry, total number of entries)?
3. How is the map/location ID represented within this structure?
4. Are there version differences (Ruby/Sapphire vs. Emerald) for these offsets?

## Action Plan
- [x] Research documentation on Gen 3 save file structures.
- [x] Analyze decompilation repositories like `pret/pokeemerald` if necessary.
- [x] Document findings in `.foundry/docs/knowledge_base/gen3_secret_base_offsets.md`.
