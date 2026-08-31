---
id: prd-152-346-archival-cleanup-policy
type: PRD
title: Archival Cleanup & Incremental Node Retention Policy
status: READY
owner_persona: epic_planner
created_at: '2026-08-15'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: session-test
pr_number: null
parent: idea-152-archival-cleanup-and-retention-policy
tags:
  - foundry
  - archive
  - retention
  - garbage-collection
  - persona
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Archival Cleanup & Incremental Node Retention Policy

## Objective
Establish a robust policy and automated workflow for pruning stale Foundry nodes from `.foundry/archive/` to prevent repository bloat, while permanently retaining high-value architectural and decision records.

## Requirements & Retention Rules

### 1. Permanent Retention
The following node types provide long-term historical context, architectural reasoning, or foundational product direction and MUST be retained permanently in the archive:
- `ADR` (Architecture Decision Records)
- `PRD` (Product Requirements Documents)
- `RESEARCH` (Investigation and research findings)

### 2. Pruning Eligibility (Transients)
The following operational/execution node types are transient. Once completed, they lose value over time and MUST be pruned if they exceed the maximum age threshold (e.g., 3 months / 90 days):
- `TASK`
- `STORY`
- `EPIC`
- `IDEA` (if fully executed/superseded or abandoned)

### 3. Incremental Cleanup Thresholds (Chunking)
To prevent excessive git churn, merge conflicts, and performance spikes, the pruning mechanism MUST operate incrementally.
- A maximum limit of 50 node deletions per execution cycle MUST be enforced.
- The system should prioritize the oldest eligible nodes first.

### 4. Persona Ownership & Automation
- A new or existing scheduled persona (e.g., `librarian` or `archivist`) will be responsible for executing this policy.
- The automation will be orchestrated via a scheduled GitHub Actions cron job running periodically (e.g., weekly).

## Dependencies & Infrastructure
- The script will need to read git metadata or file frontmatter (`created_at`/`updated_at`) to determine node age.
- The `foundry-orchestrator.ts` or a new dedicated script will implement the chunking logic and file deletion.

## Acceptance Criteria
- [ ] epic-152-429-implement-archival-cleanup-policy
