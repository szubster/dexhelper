---
id: epic-339-406-librarian-journal-ingestion
type: EPIC
title: "Librarian Journal Ingestion & Synthesis"
status: PENDING
owner_persona: story_owner
created_at: "2026-08-07"
updated_at: "2026-08-07"
depends_on:
  - epic-339-405-librarian-persona-core
jules_session_id: null
pr_number: null
parent: prd-124-339-librarian-persona-context-optimizer
tags:
  - foundry
  - orchestrator
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Librarian Journal Ingestion & Synthesis

## Description
This epic focuses on the logic required for the Librarian to ingest all recent `.jules/*/*.md` and `.foundry/journals/*.md` files, synthesize their contents, extract actionable constraints, and perform garbage collection of stale journal files to reset the context footprint.

## Acceptance Criteria
- [ ] Implement journal ingestion logic to pass contents to the Librarian context.
- [ ] Implement parsing logic for the Librarian to extract recurring patterns.
- [ ] Implement garbage collection to archive or delete ingested journals.
- [ ] Enforce Orchestrator Safeguard: Generate a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
