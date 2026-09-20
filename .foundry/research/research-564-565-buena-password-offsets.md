---
id: research-564-565-buena-password-offsets
type: RESEARCH
title: Buena's Password Save Data Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-08'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: '10814061850799701705'
parent: prd-517-564-gen2-radio-password-tracker
rejection_reason: ''
locks: []
rejection_count: 1
---

# Research: Buena's Password Offsets

## Goal
Identify the exact memory offset for the Blue Card points in the Gen 2 Crystal save file.
Identify the exact daily event flag (or memory offset) that tracks whether the player has already successfully submitted Buena's Password today.

## Acceptance Criteria
- [x] Determine the offset for Blue Card points.
- [x] Determine how daily completion of Buena's Password is tracked in Crystal.

## Research Findings

### Blue Card points offset
The memory offset for the Blue Card points in Pokémon Crystal is `0xDC4B` (which corresponds to `wBlueCardBalance` in pokecrystal, located in Bank 1). The data type is a single byte (`db`).

### Buena's Password daily event flags
The daily completion of Buena's Password is tracked using two engine flags:
- `ENGINE_BUENAS_PASSWORD` (cleared daily) is located at bit 7 of `wDailyFlags2`. The offset for `wDailyFlags2` is `0xDC1F`.
- `ENGINE_BUENAS_PASSWORD_2` (set when you successfully or unsuccessfully submit the password that day) is located at bit 0 of `wSwarmFlags`. The offset for `wSwarmFlags` is `0xDC20`.
