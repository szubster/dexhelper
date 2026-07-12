# SaveHistoryDB IndexedDB Schema

## Context
The `SaveHistoryDB` is used to store Pokemon save history, including raw save files, metadata, and indexes, to allow users to view, manage, and extract data from their save history.

## Configuration
The database configuration is defined in `src/db/schema.ts` as `SAVE_HISTORY_DB_CONFIG`.

- **Name**: `SaveHistoryDB`
- **Version**: 1

## Object Stores

The `SaveHistoryDB` contains three object stores, as defined by `SAVE_HISTORY_DB_CONFIG.STORES` and strictly typed by `SaveHistoryDBSchema`.

### 1. `saves`
Stores the raw binary save file data.

- **Key**: `string` (Typically a generated unique ID or filename)
- **Value**: `Uint8Array` (The raw binary save data)

### 2. `metadata`
Stores metadata associated with each save file (e.g., trainer name, play time, save date, game version).

- **Key**: `string` (References the corresponding key in the `saves` store)
- **Value**: `Record<string, unknown>` (A flexible object containing the metadata properties)

### 3. `indexes`
Stores indexing data used to quickly search, filter, or categorize saves without needing to parse the raw data or metadata.

- **Key**: `string` (References the corresponding key in the `saves` store)
- **Value**: `Record<string, unknown>` (A flexible object containing index properties)
