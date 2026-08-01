---
id: epic-110-308-tm-hm-user-interface
type: EPIC
title: TM/HM Inventory & Compatibility UI
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-01'
depends_on:
  - epic-110-307-tm-hm-compatibility-logic
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-110-306-tm-hm-save-parsing
notes: ''
---

# TM/HM Inventory & Compatibility UI

## Overview
As part of the Gen 1-3 TM/HM Inventory & Compatibility Planner, this Epic focuses on the User Interface (Presentation Layer) requirement. It will provide the visual components for the user to interact with their TM/HM inventory and view compatibility data.

## Requirements
- **Inventory Dashboard**: A visual grid displaying owned TMs/HMs and their quantities.
- **Compatibility Matrix**: A detailed view when a TM is selected, showing all compatible owned Pokémon.
- **Strategic Overlay**: Badges or indicators on compatible Pokémon showing if they lack a move of that TM's type.
- **Acquisition Tracker**: A list of unowned, uncollected TMs with their in-game locations (similar to the Missing Hidden Items Finder).

## Acceptance Criteria
- [ ] Break down into STORY nodes for dashboard, matrix, and tracker UI components.
