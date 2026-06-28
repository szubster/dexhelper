---
id: research-108-221-gen3-secret-base-rangeerror
type: RESEARCH
title: Investigate Gen 3 Secret Base RangeError Handling
status: READY
owner_persona: researcher
created_at: '2026-06-24'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - research
  - gen3
  - save-parsing
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Gen 3 Secret Base RangeError Handling

## Context
The previous implementation task for parsing Gen 3 Secret Base locations (`task-108-163-gen3-secret-base-parser`) was rejected by the Auditor persona because it failed to comply with the architectural constraint defined in `ADR 010: Gen3 Data Parsing Strategy`. Specifically, the parser failed to explicitly catch `RangeError` exceptions from out-of-bounds `DataView` reads.

## Objective
- Investigate and document exactly how `RangeError` exceptions must be caught and handled gracefully during the parsing of Gen 3 Secret Base locations from the save file.
- Provide a clear example or strategy for the implementation blueprint to ensure the coder persona correctly integrates `DataView` bounds checking.
- Document any specific boundaries or truncated save file states that commonly trigger these errors in the context of the `3200` byte Secret Base array in SaveBlock1.

## Acceptance Criteria
- [x] Determine the correct try/catch pattern for `DataView` `RangeError` within the save parser.
- [x] Document how the error should be gracefully propagated or logged without crashing the parent parsing process.
- [x] Ensure the findings align strictly with ADR 010.

## Reminders for Personas
- **Researcher:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Researcher:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Findings

### RangeError Handling Pattern
To comply with `ADR 010: Gen3 Data Parsing Strategy`, parsing Gen 3 Secret Base arrays (which span `3200` bytes in `SaveBlock1`) must use a `try/catch` block encapsulating the `DataView` array traversal. If the active save block pointer is malformed or the file is truncated, iterating through the 20 `SecretBase` records (`160` bytes each) can trigger out-of-bounds reads.

When a `DataView` read (e.g., `view.getUint8(offset)`) exceeds the underlying ArrayBuffer boundaries, JavaScript natively throws a `RangeError`. This exception must be caught explicitly by the `parseGen3SecretBases` function and wrapped in a generalized error that the higher-level parser understands, propagating it without abruptly crashing the application.

### Recommended Implementation Strategy
```typescript
export function parseGen3SecretBases(view: DataView, saveBlock1Offset: number, gameVersion: string): Gen3SecretBase[] {
  let baseOffset = saveBlock1Offset;
  if (gameVersion === 'emerald') {
    baseOffset += SECRET_BASE_OFFSET_EMERALD;
  } else {
    baseOffset += SECRET_BASE_OFFSET_RS;
  }

  try {
    const secretBases: Gen3SecretBase[] = [];
    for (let i = 0; i < SECRET_BASES_COUNT; i++) {
      const offset = baseOffset + i * SECRET_BASE_SIZE;
      const secretBaseId = view.getUint8(offset); // Triggers RangeError if file is truncated

      if (secretBaseId > 0) {
        secretBases.push({ secretBaseId });
      }
    }
    return secretBases;
  } catch (error) {
    if (error instanceof RangeError) {
      // Gracefully map the native RangeError to a specific corrupt file error per ADR 010
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
```

The error mapping from `RangeError` to `Error('The save file is corrupted or incomplete.')` allows the global `saveParser` engine to catch the normalized string and present user-friendly fallback mechanisms instead of an unhandled promise rejection or crashing the UI. Tests confirm this exact behavior is now present in `src/engine/saveParser/parsers/gen3.ts`.
