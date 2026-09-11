---
id: research-404-495-kurt-apricorn-offsets
type: RESEARCH
title: Investigate Kurt Apricorn Crafting Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-30'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '9062108596009761075'
pr_number: null
parent: story-404-477-kurt-apricorn-offset-and-constants
tags:
  - gen2
  - items
  - offsets
rejection_count: 2
rejection_reason: ''
notes: ''
---
# Investigate Kurt Apricorn Crafting Offsets

## Context
While attempting to define the memory offsets for Kurt's Apricorn crafting state (for story-404-477-kurt-apricorn-offset-and-constants), we need to determine the exact absolute SRAM offsets for `wKurtApricornCount` and `wKurtApricornItems`.
These are located within the `SECTION UNION "Miscellaneous WRAM 1", WRAMX` overlaid region in pokecrystal, and determining their final location relative to known SRAM anchors (like `wEventFlags`) is complex.

## Objectives
- Investigate and map the exact SRAM offsets (in Crystal and Gold/Silver) for `wKurtApricornCount`, `wKurtApricornItems`, and confirm the offset for `wKurtApricornQuantity`.
- Determine what byte values correspond to the Apricorn IDs and the mapped Poké Ball IDs.
- Write the findings to an ADR or knowledge base document so the `tech_lead` can use them in the subsequent TASK blueprints.

## Acceptance Criteria
- [ ] researcher: Determine the exact memory offsets for Kurt's Apricorn crafting variables in Gen 2 saves.
- [ ] researcher: Document the offsets and constants in a new knowledge base document.
