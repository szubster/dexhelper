---
id: idea-066-rom-hack-support
type: IDEA
title: ROM Hack Support via Custom Adapters
status: ACTIVE
owner_persona: human
created_at: '2026-05-27'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - engine
  - features
  - parsing
research_references: []
rejection_count: 2
rejection_reason: 'Too much effort for now, and I will not play romhacks.'
notes: ''
---

# ROM Hack Support via Custom Adapters

## The Problem
Currently, the core parsing engine (`src/engine/saveParser`) relies on hardcoded binary offsets, padding checks, and heuristic detection explicitly tailored to vanilla Gen 1 and Gen 2 `.sav` files.
Many players in the retro Pokémon community use ROM hacks (e.g., Crystal Clear, Polished Crystal, Red++). These modifications often alter the internal structures of the `.sav` files, effectively invalidating our existing parsing logic and rendering DexHelper unusable for a significant segment of the hardcore player base.

## Proposed Solution
To broaden DexHelper's appeal and usefulness, we should refactor the data ingestion engine to support pluggable parser adapters.

1. **Parser Adapters:** Instead of a single monolithic parser, implement a plugin architecture where specific adapters can be loaded for different save file formats.
2. **Signature Detection:** Develop robust signature detection heuristics that can identify popular ROM hacks by inspecting specific markers in the save data, subsequently routing the file to the appropriate adapter.
3. **Unified Schema Mapping:** Ensure that regardless of the source ROM hack structure, each adapter normalizes the extracted data into our unified `SaveData` JSON schema, preserving the compatibility of downstream features like the assistant and storage viewer.

## Value Proposition
Targeting the vibrant ROM hack community not only expands our user base but also solidifies DexHelper as the definitive, flexible tool for all Gen 1/2 retro Pokémon gameplay, accommodating customized playstyles alongside standard vanilla experiences.

## Next Steps
- [ ] Product Manager: Evaluate this idea, determine the technical feasibility of the plugin architecture, and convert it into a PRD.
