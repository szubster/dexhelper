---
id: research-099-396-investigate-indexeddb-schema-failure
type: RESEARCH
title: Investigate IndexedDB Schema Design Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '3239184284682901692'
pr_number: null
parent: prd-066-099-save-state-history-storage
tags:
  - storage
  - indexeddb
  - history
  - debug
research_references:
  - epic-099-130-indexeddb-schema-design
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Research: Investigate IndexedDB Schema Design Failure

## Objective
Investigate the root cause behind the permanent failure (Max Rejection Count reached) of `epic-099-130-indexeddb-schema-design`.

## Context
The epic `epic-099-130-indexeddb-schema-design` failed permanently, causing its downstream dependencies (`epic-099-131-save-state-read-write-api`, `epic-099-132-save-state-lru-eviction-and-limits`) to be cancelled. According to the "Handling Permanent Child Failures (The Impossible Loop)" policy, we must spawn a RESEARCH node to investigate the root cause before replacing the failed children.

## Tasks
- [x] Read the rejection reasons for `epic-099-130-indexeddb-schema-design` and its child stories to identify why it failed three times.
- [x] Check `.foundry/journals/auditor/` and `.foundry/journals/qa/` for specific error logs or feedback regarding this feature.
- [x] Propose a concrete solution or architectural shift to avoid repeating the failure in the retry epics.
- [x] Document findings in this file.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

## Findings

The rejection loop for `epic-099-130-indexeddb-schema-design` (and specifically its child tasks) was caused by the Coder agent incorrectly applying the Empty PR Policy without verifying that the existing DB schema matched Section 14 of `.foundry/docs/schema.md`. The existing `src/db/schema.ts` file had `VERSION: 2` and a `TRAINERS` store, which violated the schema documented in Section 14 that requires `VERSION: 1` and no `TRAINERS` store. Because the verification was shallow (only checking that the file and basic exports existed via `grep`), the QA agent continually rejected the changes until the max rejection count was reached.

This schema violation was subsequently fixed in `task-341-355-define-indexeddb-schema-retry-v2-impl`, which correctly aligned the DB schema with the documentation.

### Architectural Shift & Solution
When spawning retry nodes for implementation, generative personas (Epic Planner, Story Owner, Tech Lead) MUST include explicit Acceptance Criteria for the Coder to verify the implemented schema (e.g. database versions, object store structures) strictly matches the documentation (such as `.foundry/docs/schema.md`), rather than relying solely on file presence.
Additionally, to satisfy the Orchestrator Safeguard, Epic Planners and Story Owners must ensure every newly spawned EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.
