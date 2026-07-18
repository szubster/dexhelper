---
id: epic-115-333-gen3-fame-checker-dashboard-ui
type: EPIC
title: Gen 3 Fame Checker Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on:
  - epic-115-332-gen3-fame-checker-save-parsing
jules_session_id: null
pr_number: null
parent: prd-115-115-gen3-fame-checker-assistant
tags:
  - gen3
  - firered
  - leafgreen
  - fame-checker
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Fame Checker Dashboard UI

## Context
With the Fame Checker progress data successfully extracted from the save file (`epic-115-332-gen3-fame-checker-save-parsing`), we must build a UI dashboard to present this data. Tracking missing entries is tedious because the in-game UI only shows acquired entries. Players have to guess missing entries and use external wikis.

## Objectives
- Create a dashboard that explicitly shows players what Fame Checker entries they have unlocked and which ones are missing.
- The UI should group entries by NPC (e.g., Prof. Oak, Daisy Oak, Bill, etc.).
- For missing entries, provide actionable hints (exact location and condition) so the player knows how to acquire them.

## Scope
- Develop a set of React components for the Fame Checker dashboard.
- Ensure the UI aligns with the application's overall design system (Tailwind v4 primitives).
- Follow the "tactical hardware/snooping" aesthetic guidelines where appropriate.
