---
id: research-175-176-gen3-pokerus-extraction
type: RESEARCH
title: Investigate Gen 3 Pokerus Data Extraction
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen3
  - save-engine
  - pokerus
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Pokerus Data Extraction

## Context
During the audit of `epic-038-061-pokerus-state-exfiltration`, we verified the extraction of Pokerus data (strain and days remaining) from an 8-bit integer in Gen 2 saves using bitwise operators (`>> 4` and `& 0x0f`). This has proven to be an effective strategy for parsing. However, Generation 3 uses a different overarching save structure (the double-buffered flash memory system across 14 Sections) and potentially uses a different internal structure for Pokemon data, including Pokerus.

## Objectives
1. Investigate the location and memory structure of Pokerus flags in Generation 3 saves (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
2. Determine if the bitwise structure (upper 4 bits for strain, lower 4 bits for days remaining) is identical to Gen 2, or if it has changed.
3. Propose a technical strategy for implementing Gen 3 Pokerus extraction within `src/engine/saveParser/parsers/gen3.ts`, noting any dependencies or blockers.

## Output
Update this markdown body with the research findings and create a downstream IDEA or PRD node if actionable work is required to support Gen 3 Pokerus extraction.

## Findings

### Memory Structure and Location
In Generation 3, a Pokémon's data is stored in a 100-byte structure. However, the core details are stored within a 48-byte encrypted Data block. This block consists of four 12-byte substructures: Growth (G), Attacks (A), EVs & Condition (E), and Miscellaneous (M).

The order of these substructures within the 48-byte block is dynamic and determined by the formula: `Personality Value (PV) % 24`. The data is also encrypted via XOR. The 32-bit decryption key is the result of `PV XOR OT ID`.

The Pokerus status is located in the **first byte (offset 0)** of the **Miscellaneous (M)** substructure.

### Bitwise Structure
The bitwise structure of the Pokerus byte in Generation 3 is **identical to Generation 2**:
- **Lower 4 bits (0-3):** Days left until Pokérus is cured.
- **Upper 4 bits (4-7):** Pokérus "strain".

The logic for determining a "cured" status (strain is non-zero, but days remaining is 0) remains unchanged.

### Technical Strategy & Blockers
To implement Gen 3 Pokerus extraction in `src/engine/saveParser/parsers/gen3.ts`, the engine must first be capable of:
1. Extracting the 100-byte structure for a given Pokémon.
2. Reading the PV and OT ID to generate the decryption key.
3. Calculating the substructure order (`PV % 24`) to locate the Miscellaneous (M) substructure.
4. Decrypting the 48-byte Data block.
5. Reading the first byte of the M substructure and applying the bitwise operators (`>> 4` and `& 0x0f`).

**Blocker:** Currently, `src/engine/saveParser/parsers/gen3.ts` is mostly a scaffold. It lacks the core logic to parse, decrypt, and construct the Pokémon data substructures. We cannot implement Pokerus extraction until the foundational Gen 3 Pokémon extraction and decryption logic is implemented. An IDEA node has been created to track this dependency.
