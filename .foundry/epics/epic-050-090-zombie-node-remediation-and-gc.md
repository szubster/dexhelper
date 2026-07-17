---
id: epic-050-090-zombie-node-remediation-and-gc
type: EPIC
title: Zombie Node Remediation and GC
status: PENDING
owner_persona: story_owner
created_at: '2026-06-15'
updated_at: '2026-07-17'
depends_on:
  - epic-050-089-zombie-node-detection-engine
jules_session_id: null
pr_number: null
parent: prd-079-050-foundry-zombie-node-cleanup
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Zombie Node Remediation and Garbage Collection

## 1. Description
This Epic implements the remediation component of the Zombie Node Garbage Collection (GC) mechanism. Following the successful detection of zombie nodes (via `epic-050-089-zombie-node-detection-engine`), this logic will automatically transition the identified zombie nodes from the `ACTIVE` state to `FAILED`.

By marking these stranded nodes as `FAILED`, the existing Resurrection Loop will naturally pick them up on the next orchestrator cycle. This ensures the tasks are re-queued and prevents DAG deadlocks, achieving automated self-healing.

## 2. Prerequisites
- The Zombie Node Detection Engine (`epic-050-089-zombie-node-detection-engine`) must be implemented to supply the list of identified zombie nodes.
- Familiarity with the `.github/scripts/foundry-orchestrator.ts` script.

## 3. High-Level Acceptance Criteria
- [ ] Remediation logic is implemented to automatically transition the state of identified zombie nodes from `ACTIVE` to `FAILED`.
- [ ] The `updated_at` field in the frontmatter of remediated nodes is correctly updated.
- [ ] Unit tests are implemented to ensure remediation logic correctly transitions node state and handles file updates safely.

## 4. Next Steps (Stories)
- [ ] Create Story for implementing remediation state transition and file saving.

