---
id: story-036-255-progression-save-model
type: STORY
title: Database Schema for Multiple Saves
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-031-036-progression-tracking
tags:
  - backend
  - progression
  - database
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Database Schema for Multiple Saves

## Context
To support progression tracking and multiple save files per playthrough, we need to update our offline-first database schema (using IndexedDB/Dexie or equivalent) to model the relationships between a Trainer/Playthrough and their multiple save states over time.

## Requirements
- Define the data model for storing multiple save files per playthrough.
- Design relationships between Trainer profiles and their respective save history.
- Ensure the schema supports syncing with the Cloudflare backend.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into Tasks to define the specific database tables and indexes needed for managing multiple save files.
- [x] task-255-338-db-schema-saves-impl
- [x] task-255-339-db-schema-saves-qa
