---
id: task-358-427-indexeddb-schema-impl
type: TASK
title: IndexedDB Storage Schema Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-397-358-indexeddb-schema-retry-impl
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: IndexedDB Storage Schema Implementation

## Overview
Implement the storage schema for the save state history according to Section 14 of `.foundry/docs/schema.md`.

## Context
The application requires a robust storage mechanism for save files and their metadata. The IndexedDB schema has been designed, and this task is responsible for implementing it using idb.

## Requirements
- Create `src/engine/storage/historyDb.ts`.
- Initialize an idb database named `SaveHistoryDB`.
- Set the database version to `1`.
- Define the following object stores:
  - `saves`: primary key is a string (id), stores `Uint8Array` as values.
  - `metadata`: primary key is a string (id), stores `Record<string, unknown>` as values.
  - `indexes`: primary key is a string (id), stores `Record<string, unknown>` as values.
- Ensure the types map accurately to the requirements in Section 14 of the schema document.
- Use `idb` to configure the schema correctly.

## Acceptance Criteria
- [x] `src/engine/storage/historyDb.ts` is created and exports a valid idb database instance named `SaveHistoryDB`.
- [x] Database version is exactly 1.
- [x] Object stores `saves`, `metadata`, and `indexes` are defined.
- [x] Database schema strictly adheres to Section 14 of `.foundry/docs/schema.md`.
- [x] Write a test in `src/engine/storage/historyDb.test.ts` to instantiate the database and assert the schema structures.
