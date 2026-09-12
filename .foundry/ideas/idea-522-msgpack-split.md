---
id: idea-522-msgpack-split
type: IDEA
status: ACTIVE
owner_persona: product_manager
created_at: '2026-09-12T01:48:08.592Z'
updated_at: '2026-09-12T01:48:08.592Z'
depends_on: []
jules_session_id: null
tags:
  - performance
  - bundle-size
  - data
research_references: []
notes: ''
---

# Idea: Split MsgPack Data by Generation

## Context
The application is currently suffering from bundle bloat and data hydration bottlenecks due to loading a massive, monolithic static database payload (e.g. msgpack) containing all generations of Pokemon data on startup. This monolithic loading causes unnecessary memory usage and increases the initial load time, even if the user only wants to view a specific generation.

## Proposal
Split the monolithic msgpack data files by Pokemon Generation (e.g., Gen 1, Gen 2, Gen 3). Implement dynamic loading/fetching mechanisms so that the application only loads the msgpack data for the specific generation currently being viewed or interacted with by the user.

Key files to modify:
- Data generation scripts (e.g. `scripts/generate-pokedata.ts`) to output separate msgpack files per generation.
- `src/db/DexDataLoader.ts` and `src/db/PokeDB.ts` to implement dynamic fetching of generation-specific data files.
- Ensure the `vite.config.ts` or build configurations copy/serve these split files correctly.

## Value Proposition
- Drastically reduces initial application payload size.
- Lowers memory footprint and GC pauses by only keeping relevant generation data in memory.
- Improves main-thread responsiveness during initial hydration.

## Next Steps
- [ ] prd-522-msgpack-split
