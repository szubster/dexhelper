---
id: idea-140-auto-checklist-location-tracker
type: IDEA
title: Automated Location Tracking and Checklist Sync
status: READY
owner_persona: product_manager
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - emulator
  - map
  - checklist
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Automated Location Tracking and Checklist Sync

## Problem
Using checklists (such as Route Checklist, Hidden Item Checklist, and Trainer checklists) is a core loop of DexHelper. However, players must manually check off items as they play. This is prone to human error, forgetfulness, and breaks the immersive flow of playing the game.

## Proposed Solution
Create an automation engine that hooks into the emulator's memory to track player progress automatically.
1. **Map Coordinates and ID Sync:** Continuously poll player X/Y coordinates and current Map ID. Automatically pan and zoom the DexHelper Map UI to highlight the player's exact position.
2. **Event Flag Tracker:** Read the game's event flag arrays. The instant a hidden item is collected or a trainer is defeated, detect the bit flip and check it off the user's checklist.
3. **Auto-Nuzlocke Encounter Logger:** In a Nuzlocke, detect wild battle encounters. The instant a wild battle starts, log the species, location, and capture status automatically to the Nuzlocke database.

## Value Proposition
Eliminates all tedious manual tracking. The player simply plays their game in the emulator, and their entire checklisted state updates organically.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD outlining the event-flag-to-checklist mapper architecture, detailing coordinate mappings and wild encounter state detection.
