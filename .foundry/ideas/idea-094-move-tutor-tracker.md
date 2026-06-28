---
id: idea-094-move-tutor-tracker
type: IDEA
title: "Gen 3 Move Tutor Availability Dashboard"
status: PENDING
owner_persona: "product_manager"
created_at: "2026-06-28"
updated_at: "2026-06-28"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Move Tutor Availability Dashboard

## Problem
In Generation 3 (especially FireRed/LeafGreen and Emerald), there are numerous one-time-use Move Tutors scattered throughout the world (e.g., Mimic, Thunder Wave, Substitute). Keeping track of which tutors have been used and which are still available requires tedious manual note-taking or revisiting every single NPC. Furthermore, checking which Pokémon currently sitting in the PC boxes are compatible with these specific tutor moves requires repeatedly checking external wikis.

## Proposed Solution
Build a "Move Tutor Tracker" dashboard that:
1. Parses the save file to read the exact event flags indicating whether each one-time Move Tutor has been consumed.
2. Displays a clear list of all available vs. used Tutors.
3. For each available Tutor, automatically cross-references the move's compatibility matrix with the player's current PC box contents, displaying a list of viable Pokémon that can learn the move right now.

This turns opaque, hidden game state into actionable strategy for competitive players and Nuzlockers, saving time and removing the need for external resources.
