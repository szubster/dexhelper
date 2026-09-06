# Generation 2 Headbutt Tree Mathematics

This document explains the mathematical algorithm used in Pokémon Generation 2 (Gold, Silver, Crystal) to determine if a Headbutt tree provides encounters (and which tier).

## Overview
A Headbutt tree's encounter group ("Tree Score") is determined by comparing a value calculated from the tree's X, Y coordinates to a value calculated from the player's Trainer ID.

There are 3 possible scores for any tree for a specific player:
- **0 (Bad):** Low encounter rate (10%), normal table.
- **1 (Good):** Medium encounter rate (50%), normal table.
- **2 (Rare):** High encounter rate (80%), rare table.

## The Algorithm

1. **Calculate the Coordinate Score (`CoordScore`)**
   Let `X` and `Y` be the X/Y tile coordinates of the tree on the current map.
   - First, calculate a combined coordinate value:
     `Value = (Y * X) + X + Y`
   - Then, divide by 5 and integer divide by 10. Effectively, take modulo 10 of the quotient:
     `CoordScore = Math.floor(Value / 5) % 10`

2. **Calculate the Trainer ID Score (`OTIDScore`)**
   Let `TID` be the player's 16-bit Trainer ID (0-65535).
   - `OTIDScore = TID % 10`

3. **Determine the Tree Score**
   Compare `CoordScore` and `OTIDScore`.
   - Calculate `Difference = CoordScore - OTIDScore`
   - If `Difference < 0`, add 10 to wrap it around. (`Difference = (Difference + 10) % 10`)
   - Or simply: `Difference = (CoordScore - OTIDScore + 10) % 10`

   Evaluate `Difference`:
   - If `Difference == 0`: **Rare Tree** (Score = 2, Uses Rare Table, 80% encounter)
   - If `0 < Difference < 5`: **Good Tree** (Score = 1, Uses Normal Table, 50% encounter)
   - If `Difference >= 5`: **Bad Tree** (Score = 0, Uses Normal Table, 10% encounter)

## Assembly Implementation Reference (pokecrystal)
In the source code, this logic is found in `engine/events/treemons.asm` within the `GetTreeScore`, `.CoordScore` and `.OTIDScore` functions.

```assembly
GetTreeScore:
	call .CoordScore
	ld [wTreeMonCoordScore], a
	call .OTIDScore
	ld [wTreeMonOTIDScore], a
	ld c, a
	ld a, [wTreeMonCoordScore]
	sub c
	jr z, .rare
	jr nc, .ok
	add 10
.ok
	cp 5
	jr c, .good
; bad
	xor a ; TREEMON_SCORE_BAD
	ret
.good
	ld a, TREEMON_SCORE_GOOD
	ret
.rare
	ld a, TREEMON_SCORE_RARE
	ret

.CoordScore:
	call GetFacingTileCoord ; X in e, Y in d
	ld hl, 0
	ld c, e
	ld b, 0
	ld a, d

	and a
	jr z, .next
.loop
	add hl, bc
	dec a
	jr nz, .loop
.next

	add hl, bc
	ld c, d
	add hl, bc
    ; hl now equals: (y * x) + x + y

	ld a, h
	ldh [hDividend], a
	ld a, l
	ldh [hDividend + 1], a
	ld a, 5
	ldh [hDivisor], a
	ld b, 2
	call Divide

	ldh a, [hQuotient + 2]
	ldh [hDividend], a
	ldh a, [hQuotient + 3]
	ldh [hDividend + 1], a
	ld a, 10
	ldh [hDivisor], a
	ld b, 2
	call Divide

	ldh a, [hRemainder]
	ret

.OTIDScore:
	ld a, [wPlayerID]
	ldh [hDividend], a
	ld a, [wPlayerID + 1]
	ldh [hDividend + 1], a
	ld a, 10
	ldh [hDivisor], a
	ld b, 2
	call Divide
	ldh a, [hRemainder]
	ret
```

## Coordinate Mapping
The internal X/Y coordinates used in the mathematical algorithm represent the global map coordinates (in map grid tiles) of the Headbutt tree being interacted with.
When the player attempts to headbutt a tree, the game calls the `GetFacingTileCoord` assembly function (found in `home/map.asm`) to determine the coordinates of the tile directly in front of the player.
The algorithm calculates:
1. `wPlayerMapX` + offset based on direction = X coordinate (loaded into register `e` in `.CoordScore`)
2. `wPlayerMapY` + offset based on direction = Y coordinate (loaded into register `d` in `.CoordScore`)

These coordinates (`X` and `Y`) are identical to the standard grid-based event and tile locations used by the mapping system in Generation 2 (the coordinates used for warp events, signposts, object events, etc.). Therefore, mapping these values to Johto simply requires matching the specific `(X, Y)` location of a tree on any given map matrix.
