---
id: research-640-645-investigate-extract-core-domain-timeout
type: RESEARCH
title: Investigate timeout during core domain extraction
status: READY
owner_persona: researcher
created_at: '2026-10-02'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
research_references: []
notes: ''
locks: []
---

# Investigate timeout during core domain extraction

## Context
The task `task-640-642-extract-core-domain-logic` failed permanently due to a session timeout (`[ACKNOWLEDGED] Session terminated with state: COMPLETED` which means it reached the max limit or timeout). We need to investigate why this task timed out before replacing it.

## Acceptance Criteria
- [x] Determine the root cause of the timeout during the domain logic extraction.
- [x] Provide actionable recommendations for the replacement task to avoid timing out again.

## Findings
The root cause of the timeout is that migrating over 350 files and rewriting all their import paths in a single task is too large of a scope. Attempting to do this manually or executing full E2E test suites unconditionally exceeds the 400-second bash session timeout constraint.

## Recommendations
1. Decompose the migration into smaller chunks (e.g., migrate `src/utils` first, then `src/engine/data`, then `src/engine/saveParser`, etc.).
2. Use programmatic Node scripts (e.g., using `ts-morph` or plain regex) to automate moving files and updating import paths rather than manual edits.
3. Do not run the full E2E suite (`xvfb-run -a pnpm test:e2e`) unconditionally during migration tasks; only target specific files if necessary, or rely on unit tests and CI.
