---
id: idea-119-gen3-spinda-pattern-viewer
type: IDEA
title: Gen 3 Spinda Pattern Viewer
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-19'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '11744952049611154664'
pr_number: null
parent: null
tags:
  - gen3
  - spinda
  - collection
  - premium-feature
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Spinda Pattern Viewer

## Description
In Generation 3, the Pokémon Spinda has a unique mechanic where its spot pattern is procedurally generated based on its 32-bit Personality Value (PID), resulting in over 4 billion possible variations. Currently, players have no way of easily organizing or visualizing their unique Spinda collection outside of manually viewing them one by one in the game.

By extracting the PID of caught Spinda from the party and PC Box data within an uploaded Gen 3 `.sav` file, DexHelper can accurately render a visual gallery of the exact Spinda patterns the player owns. This leverages our save parsing capabilities to create a highly visual, premium collector utility that transforms raw save data into an engaging visual dashboard.

## Problem Statement
Spinda collectors have no external tools to visualize and catalog their unique Spinda spot patterns from their save files, forcing them to rely on slow, manual in-game box checking.

## Solution
Create a Spinda Pattern Viewer dashboard that parses Spinda PIDs from the uploaded Gen 3 save file and uses a 2D canvas (or layered SVG) approach to render the exact spot patterns for each owned Spinda, displaying them in a unified gallery.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to formalize the rendering approach and assign it to an epic for tracking.
- [ ] prd-119-335-gen3-spinda-pattern-viewer
