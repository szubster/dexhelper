---
id: idea-007
type: IDEA
title: "Migrate Save Data to IndexedDB"
status: "ACTIVE"
owner_persona: product_manager
created_at: "2026-04-23T14:21:34.000Z"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: "1753705544973854463"
---

# Migrate Save Data Storage to IndexedDB

## Overview
Currently, the application stores parsed save files as base64-encoded strings in `localStorage`. This has two significant issues:
1. `localStorage` has severe size constraints (typically ~5MB), which limits the application's ability to store multiple game saves or scale.
2. The current encoding mechanism (`window.atob`) is flagged as a security vulnerability by scanners, and using an external library for base64 is a workaround that doesn't address the underlying storage limitation.

## Proposed Solution
Migrate the save data persistence layer from `localStorage` to `IndexedDB`. `IndexedDB` is specifically designed to store large amounts of structured data, including binary blobs (`ArrayBuffer`, `Uint8Array`).

By switching to `IndexedDB`:
- We eliminate the need for base64 encoding/decoding entirely, inherently fixing the `window.atob` vulnerability securely and naturally.
- We unlock significantly larger storage quotas, future-proofing the application for plans involving multiple save files or expanded data requirements.

## Target Architecture
- Utilize a lightweight wrapper like `idb` (already a project dependency) to interface with IndexedDB securely.
- Remove `localStorage` save file persistence from the Zustand store's custom actions.
- Update the store's hydration mechanism to asynchronously load binary save data from IndexedDB directly into the parser.

## Generated PRDs
- .foundry/prds/prd-007-005-migrate-saves-to-indexeddb.md
- [x] Create PRD for IndexedDB migration
