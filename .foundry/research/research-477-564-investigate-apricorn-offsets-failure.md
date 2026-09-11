---
id: research-477-564-investigate-apricorn-offsets-failure
type: RESEARCH
title: Investigate Failure of Kurt Apricorn Offsets Research
status: READY
owner_persona: researcher
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-404-477-kurt-apricorn-offset-and-constants
tags:
  - gen2
  - items
  - offsets
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Failure of Kurt Apricorn Offsets Research

## Context
The previous research task (`research-404-495-kurt-apricorn-offsets`) permanently failed. The `tech_lead` requires the absolute SRAM offsets for `wKurtApricornCount` and `wKurtApricornItems` in the `Miscellaneous WRAM 1` overlaid region in pokecrystal.

## Objectives
- Investigate the root cause of the previous research failure.
- Determine the correct memory offsets and mapping for Kurt's Apricorn crafting state.
- Document the offsets and constants in a knowledge base document so the coder tasks can implement them.

## Acceptance Criteria
- [ ] Investigate the root cause of the permanent failure of `research-404-495-kurt-apricorn-offsets`.
- [ ] Provide the exact SRAM offsets and magic numbers for Kurt's Apricorn crafting variables.
