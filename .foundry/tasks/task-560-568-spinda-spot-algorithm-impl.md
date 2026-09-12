---
id: task-560-568-spinda-spot-algorithm-impl
type: TASK
title: Implement Spinda Spot Algorithm Core Logic
status: PENDING
owner_persona: coder
parent: story-346-560-spinda-spot-coordinate-algorithm
tags:
  - gen3
  - spinda
  - algorithm
rejection_count: 0
rejection_reason: ""
---

# Implement Spinda Spot Algorithm Core Logic

## Description
Implement the core pure algorithm for calculating Gen 3 Spinda spot coordinates based on the 32-bit Personality ID (PID). The function should be added to a new module `src/engine/gen3/spinda/algorithm.ts`.
The logic must parse the 32-bit PID into 4 bytes. Each byte determines the position of one spot.
For each spot:
- X offset: `(byte & 0x0F) - 8`
- Y offset: `((byte & 0xF0) >> 4) - 8`
Base coordinates for the four spots:
1. Top-left: `(16, 7)`
2. Top-right: `(40, 8)`
3. Bottom-left: `(22, 25)`
4. Bottom-right: `(34, 26)`
The PV is shifted right by 8 bits (`>> 8`) after calculating each spot. Use unsigned right shift `>>>` where appropriate in TS.

## Acceptance Criteria
- [ ] Create `src/engine/gen3/spinda/algorithm.ts`.
- [ ] Implement `calculateSpindaSpots(pid: number): {x: number, y: number}[]` mapping the PID to four specific coordinates.
