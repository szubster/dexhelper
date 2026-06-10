---
id: prd-070-044-hall-of-fame-exporter
type: PRD
title: Hall of Fame Timeline and Certificate Exporter
status: READY
owner_persona: epic_planner
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-070-hall-of-fame-exporter
tags:
  - feature
  - social
  - hall-of-fame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Hall of Fame Timeline and Certificate Exporter

## Overview
Transform DexHelper into a social sharing utility by parsing Hall of Fame records from Gen 1 and Gen 2 saves and exporting visually appealing "Certificates".

## Requirements
1. Parse Hall of Fame data blocks in Gen 1 and Gen 2 (requires 0xA8 offset from Johto badges for Gen 2).
2. Extract Pokémon species, levels, and the player's name for past League victories.
3. Generate a high-resolution canvas or SVG "Hall of Fame Certificate".
4. Build a UI timeline component to view multiple past victories.

## Acceptance Criteria
- [ ] Break down into ADRs
