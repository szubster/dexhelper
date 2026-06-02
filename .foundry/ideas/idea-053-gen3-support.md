---
id: idea-053-gen3-support
type: IDEA
title: Add Gen3 Support
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-17'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
parent: null
tags:
  - feature
  - gen3
notes: Created autonomously to propose adding Generation 3 support
rejection_reason: ''
---

# Idea: Add Gen3 Support

## Context
Currently, the application supports Gen 1 and Gen 2. We should expand the scope and add support for Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Proposal
- Implement map generation/resolution for Gen 3.
- Update data generation scripts to support Gen 3 locations, encounters, and pokemon.
- Create new graphs for Gen 3.
- Ensure backwards compatibility with Gen 1 and Gen 2 logic.

## Acceptance Criteria
- [x] Gen3 map graph is designed.
- [x] Data parsers handle Gen3 format.
- [x] Gen3 encounters, locations, and Pokemon are integrated.

## References
- [.foundry/prds/prd-053-022-gen3-data-parsing.md](.foundry/archive/prds/prd-053-022-gen3-data-parsing.md)
- [.foundry/prds/prd-053-023-gen3-map-graph.md](.foundry/archive/prds/prd-053-023-gen3-map-graph.md)
- [.foundry/prds/prd-053-024-gen3-encounters.md](.foundry/prds/prd-053-024-gen3-encounters.md)
