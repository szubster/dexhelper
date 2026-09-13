---
id: story-312-562-gen2-mom-savings-tracker-ui-core
type: STORY
title: Gen 2 Mom's Savings Tracker UI Core
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-112-312-gen2-mom-savings-tracker-ui
tags:
  - gen2
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Gen 2 Mom's Savings Tracker UI Core

## Overview
Implement the UI logic in `Gen2SavingsDashboard` to display progression toward the next room decoration threshold unlocked via Mom's savings.

## Requirements
- Define the constant thresholds for decorations unlocked via Mom's savings ($10,000 for Charmander Doll, $30,000 for Clefairy Doll, $50,000 for Pikachu Doll, $100,000 for Big Snorlax).
- Determine the next threshold based on the current `money`.
- Render a UI element showing the progress (e.g., amount remaining) toward the next unlock.
- Handle the case where all thresholds have been reached.

## Acceptance Criteria
- [ ] Break down into Tasks
