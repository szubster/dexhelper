---
id: epic-587-693-core-diagnostic-report-subsystem
type: EPIC
title: Core Diagnostic Report Subsystem
status: READY
owner_persona: story_owner
created_at: "2026-10-22T06:23:22.000Z"
updated_at: "2026-10-22"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-535-587-save-data-validation-report
tags:
  - save-parser
  - diagnostics
locks: []
confidence_score: 90
---

# Core Diagnostic Report Subsystem

## Objective
Define the TypeScript data structures and implement the core diagnostic utility to track block health and byte ranges during save file parsing.

## Requirements
- Define `SaveDataValidationReport` data structures with statuses (`VALID`, `CORRUPTED`, `OOB_TRUNCATED`, `CHECKSUM_MISMATCH`).
- Implement the collector utility in `src/engine/saveParser/validation/` to record byte range metadata and health status.
- Implement unit tests for the collector utility to ensure accurate state logging.

## Acceptance Criteria
- [ ] Break down into Stories
