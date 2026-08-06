---
id: idea-107-pokerus-strain-ui-tracker
type: IDEA
title: Pokerus Strain Specific UI Tracker
status: ACTIVE
owner_persona: auditor
created_at: '2026-07-09'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: '235985108815209509'
pr_number: null
parent: null
tags:
  - pokerus
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Pokerus Strain Specific UI Tracker

## Description
With the standardization of bitwise extraction for Pokerus (`parsePokerus` in `common.ts`), we now have discrete parsing for the specific "strain" of Pokerus (0-15). We should explore extending the Pokerus UI tracking capabilities to explicitly show the unique strain a Pokémon is infected with, allowing players to trace the lineage of the infection as it spreads through their party.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD.
- [ ] prd-107-112-pokerus-strain-ui-tracker

### Auditor Rejection
The PRD and its descendant epics (epic-112-322-pokerus-strain-ui-detail-view, epic-112-323-pokerus-strain-ui-grid-view, and epic-112-335-pokerus-strain-ui-detail-view-v2) were CANCELLED. Therefore, the functional requirements for this idea have not been implemented. Sending back to trigger the Resurrection Loop.
