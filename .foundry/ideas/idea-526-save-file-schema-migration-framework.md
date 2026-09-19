---
id: idea-526-save-file-schema-migration-framework
type: IDEA
title: Versioned Save State Schema Migration Pipeline
status: PENDING
owner_persona: product_manager
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
tags:
  - save-engine
  - architecture
  - schema
  - dx
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Versioned Save State Schema Migration Pipeline

## Problem Statement
As DexHelper evolves across Gens 1-3 save parsing, the internal TypeScript structures representing parsed save data (`ParsedSaveData`, trainer card data, box structures, and cached metadata in IndexedDB via `SaveHistoryDB`) frequently undergo schema adjustments. Currently, when save data models or IndexedDB structures are updated (such as property renaming per ADR 015 or new field additions for new features), previously saved history records or persisted Zustand state in user local storage can become malformed, missing expected properties, or cause subtle runtime errors during hydration.

Without a centralized versioning and sequential schema migration framework, existing users face silent rendering failures or corrupted save history state when loading saves parsed by older application versions.

## Proposed Solution
Introduce a lightweight, versioned Schema Migration Framework for parsed save state and `SaveHistoryDB` payloads:
1. **Version Header Injection**: Attach a `schemaVersion` numeric field to all serialized `ParsedSaveData` objects and IndexedDB save history entries.
2. **Sequential Migration Registry**: Implement a linear migration registry (`SaveSchemaMigrator`) where each migration step (e.g. `v1 -> v2`, `v2 -> v3`) defines `up(data: any): any` transformation functions.
3. **Automatic Hydration Transformation**: Intercept save loading and IndexedDB retrieval routines to run incoming payloads through `SaveSchemaMigrator.migrate(data)`. If `data.schemaVersion < CURRENT_SCHEMA_VERSION`, migrations execute sequentially up to `CURRENT_SCHEMA_VERSION` before passing the data to application state or UI components.
4. **Automated Migration Testing**: Add unit test fixtures validating backward compatibility and seamless migration for legacy save payloads from earlier schema versions.

## Value Proposition
- **Data Integrity & UX**: Prevents runtime crashes, `undefined` UI properties, and data corruption when users reload historical saves or open DexHelper after app updates.
- **Developer Experience**: Engineering personas can safely rename, refactor, or extend save data models without fearing breaking changes to user IndexedDB history.
- **Future Extensibility**: Provides a clean foundation for upcoming Gen 4/5 save parser additions and offline diff storage.

## Acceptance Criteria
- [ ] Implement `SaveSchemaMigrator` with version tag support for parsed save data payloads.
- [ ] Integrate migration pipeline into save parsing/hydration and `SaveHistoryDB` retrieval methods.
- [ ] Write unit tests verifying sequential migration from legacy schema payloads to `CURRENT_SCHEMA_VERSION`.
