---
id: epic-099-130-indexeddb-schema-design
type: EPIC
title: IndexedDB Storage Schema Design
status: ACTIVE
owner_persona: story_owner
created_at: '2024-05-24'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: '3495979648943603545'
pr_number: null
parent: prd-066-099-save-state-history-storage
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: IndexedDB Storage Schema Design

## Overview
Define the storage schema for the save state history, including DB name, object stores, and indexes. This forms the foundation for storing sequential `.sav` file uploads for a given playthrough.

## Acceptance Criteria
- [x] Define the database name and version.
- [x] Define object stores for storing save files, metadata, and indexes for efficient retrieval.
- [x] Document the schema.
- [x] story-130-315-define-indexeddb-schema
- [x] story-130-316-document-indexeddb-schema
- [ ] story-130-341-define-indexeddb-schema-retry
- [ ] story-130-342-document-indexeddb-schema-retry

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
