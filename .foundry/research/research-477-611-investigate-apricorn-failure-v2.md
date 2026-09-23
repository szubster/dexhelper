---
id: research-477-611-investigate-apricorn-failure-v2
type: RESEARCH
title: Investigate Failure of Kurt Apricorn Offsets Research (v2)
status: READY
owner_persona: researcher
created_at: '2026-09-22'
updated_at: '2026-09-22'
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

# Investigate Failure of Kurt Apricorn Offsets Research (v2)

## Context
The previous research task (`research-477-564-investigate-apricorn-offsets-failure`) permanently failed. We need to investigate why this keeps failing and determine the actual offsets for `wKurtApricornCount` and `wKurtApricornItems`.

## Objectives
- Investigate the root cause of the previous research failure.
- Determine the correct memory offsets and mapping for Kurt's Apricorn crafting state.
- Document the offsets and constants in a knowledge base document so the coder tasks can implement them.

## Acceptance Criteria
- [ ] Investigate the root cause of the permanent failure of `research-477-564-investigate-apricorn-offsets-failure`.
- [ ] Provide the exact SRAM offsets and magic numbers for Kurt's Apricorn crafting variables.