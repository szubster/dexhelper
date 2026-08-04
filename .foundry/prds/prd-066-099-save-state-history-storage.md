---
id: prd-066-099-save-state-history-storage
type: PRD
title: IndexedDB Storage Engine for Save State History
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-01'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '6110336391984079559'
pr_number: null
parent: idea-066-save-state-history
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: IndexedDB Storage Engine for Save State History

## Overview
To support save state version history, we need a robust local storage solution. We will use IndexedDB to store sequential `.sav` file uploads for a given playthrough. This PRD focuses purely on the storage mechanics.

## Requirements
- The storage engine must be capable of storing multiple, sequential `.sav` files for a single playthrough.
- Each stored state must be timestamped and retain its original file data.
- Must handle storage limits gracefully (e.g., maximum number of states per playthrough, LRU eviction if necessary).
- Must provide an API for retrieving the *previous* state relative to any given state for diffing purposes.
- Should integrate with or extend existing DexHelper storage mechanisms if applicable, otherwise establish a new IndexedDB schema.

## Acceptance Criteria
- [ ] Define storage schema (DB name, object stores, indexes).
- [ ] Implement write API to store a new save state.
- [ ] Implement read API to retrieve states (by playthrough, ordered by time).
- [x] epic-099-130-indexeddb-schema-design
- [x] epic-099-131-save-state-read-write-api
- [x] epic-099-132-save-state-lru-eviction-and-limits
- [ ] research-099-396-investigate-indexeddb-schema-failure
- [ ] epic-099-397-indexeddb-schema-design-retry
- [ ] epic-099-398-save-state-read-write-api-retry
- [ ] epic-099-399-save-state-lru-eviction-and-limits-retry
