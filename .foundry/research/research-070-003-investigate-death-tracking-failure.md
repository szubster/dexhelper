---
id: research-070-003-investigate-death-tracking-failure
type: RESEARCH
title: Investigate Death Tracking and Graveyard Logic Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-034-070-death-tracking-and-graveyard
tags:
  - feature
  - nuzlocke
  - verification
research_references: []
rejection_count: 1
rejection_reason: ACTIVE node missing session ID
notes: ''
---

# Investigate Death Tracking and Graveyard Logic Failure

## Context
The implementation task `.foundry/tasks/task-070-116-implement-death-tracking.md` failed permanently. The assigned `coder` failed to fully satisfy the acceptance criteria, resulting in the `rejection_reason: Merged with unfulfilled acceptance criteria`. This triggered the Orchestrator's Impossible Loop.

## Objective
The objective of this research node is to investigate why the `coder` persona was unable to fulfill the requirements for Nuzlocke graveyard tracking.
- Analyze the codebase and previous PRs to determine if there's a technical limitation or complexity with Gen2 or Gen3 data formats, or the Nuzlocke Tracker Architecture (ADR-012) that prevented the implementation.
- Produce a clear set of recommendations or a revised technical spec that the replacement implementation task can follow to ensure success.

## Deliverables
- A summary of the root cause of the failure.
- A revised technical approach or specific instructions for implementing death tracking correctly, avoiding the pitfalls encountered by the previous coder.

### Root Cause Analysis
The previous coder was unable to implement death tracking because they likely attempted to rely on a `currentHP` field that does not exist on the `PokemonInstance` interface. Gen 1 and Gen 2 games store current HP differently depending on where the Pokémon is located. For Pokémon in the Party, the data structure is larger (44 bytes for Gen 1, 48 bytes for Gen 2) and includes current battle stats like HP. However, for Pokémon deposited in the PC, the data structure is smaller (33 bytes for Gen 1, 32 bytes for Gen 2) and completely omits current battle stats.

When a Pokémon is deposited into the PC in these early generations, it is effectively healed because its current HP is wiped from the save block. When it is withdrawn, the game recalculates its stats from base values, DVs, and Stat Exp, resulting in a fully healed Pokémon. Therefore, there is no physical way to read a "0 HP" state for a dead Pokémon once a user deposits it into the PC. The coder failed because the Acceptance Criteria incorrectly assumed `0 HP` could be universally tracked.

### Revised Technical Approach
The implementation for Death Tracking must **completely abandon** checking for `0 HP`. Do not attempt to add `currentHP` to the `PokemonInstance` schema.

Instead, the logic must rely exclusively on the `storageLocation` property:
1. The user designates a specific PC Box as the "Graveyard" (e.g., via the app's settings/UI).
2. The Nuzlocke Tracker must flag any `PokemonInstance` whose `storageLocation` strictly matches the designated Graveyard Box string as permanently dead.
3. This ensures that even though the Pokémon is technically healed in the save file's memory, the app correctly enforces the Nuzlocke death rule based on its location.
