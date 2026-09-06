---
id: epic-346-517-archival-cleanup-core-engine
type: EPIC
title: "Archival Cleanup Core Engine"
status: READY
owner_persona: "story_owner"
created_at: "2026-09-02"
updated_at: "2026-09-02"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-152-346-archival-cleanup-policy
tags:
  - foundry
  - archive
  - retention
  - garbage-collection
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Archival Cleanup Core Engine

## Description
Develop the core pruning logic for the Archival Cleanup & Incremental Node Retention Policy. This engine will identify transient nodes (TASK, STORY, EPIC, IDEA) in the `.foundry/archive/` directory that exceed the maximum age threshold (90 days) while permanently retaining high-value records (ADR, PRD, RESEARCH). It will enforce the incremental cleanup limit of 50 node deletions per execution cycle, prioritizing the oldest eligible nodes first.

## Scope
- Implement parsing of file frontmatter (`created_at`/`updated_at`) or git metadata to determine node age.
- Develop logic to filter eligible nodes based on type and age threshold (90 days).
- Implement chunking logic to limit deletions to a maximum of 50 nodes per run, prioritizing the oldest files.

## Acceptance Criteria
- [ ] Implement node age determination and filtering logic.
- [ ] Implement chunking limit (max 50 deletions) based on oldest eligible files.
- [x] Ensure EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification.
- [ ] story-517-550-implement-node-age-filtering
- [ ] story-517-551-implement-deletion-chunking
- [ ] story-517-552-archival-cleanup-core-e2e
