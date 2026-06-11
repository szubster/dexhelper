---
id: adr-003-gastown-migration-decision
type: ADR
title: 'ADR 003: Gastown Migration Decision'
status: COMPLETED
owner_persona: architect
created_at: '2026-04-20'
updated_at: '2026-04-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 003: Gastown Migration Decision

## Status
Accepted

## Context
The Foundry currently relies on GitHub Actions as its orchestration engine. While functional, it is prone to slow start times, race conditions, and limited observability. We have evaluated migrating the orchestration logic ("Gastown") to Cloudflare Workers to address these issues.

## Decision
We will migrate the Foundry orchestrator from GitHub Actions to a Cloudflare Worker using D1 for state persistence.

### Cloudflare Worker Benefits
- **Reliable sub-minute scheduling**: Cloudflare Workers allow for precise and frequent cron triggers, solving the lag inherent in GitHub Actions scheduling.
- **Atomic transitions**: Centralizing state transitions in a single Worker environment eliminates race conditions between parallel Actions.
- **External reachability**: Workers provide a natural HTTP endpoint for webhooks and API interactions.

### D1 vs KV
We will use Cloudflare D1 (SQLite) instead of Workers KV.
- D1 provides **strict consistency**, which is critical for maintaining the integrity of the Directed Acyclic Graph (DAG).
- D1 allows for complex state queries needed to efficiently calculate the graph's `in-degree` and resolve dependencies.

### Architecture
- **D1 Schema**:
  - `nodes` table (id, type, status, owner_persona, updated_at, session_id)
  - `dependencies` table (parent_id, child_id)
  - `tags` table (node_id, tag_name)
- **Webhook Sync Mechanism**:
  1. A commit is pushed to the repository.
  2. GitHub triggers a webhook to the Cloudflare Worker.
  3. The Worker identifies changed markdown files.
  4. The Worker fetches the updated markdown content from GitHub.
  5. The Worker parses the frontmatter and updates the D1 relational schema accordingly.

### Migration Plan (High-Level)
1. **Phase 1: Dual-Write Setup.** Implement the Cloudflare Worker and D1 schema. Configure the repo webhook to sync `.foundry/` file changes to D1 passively.
2. **Phase 2: Validation.** Run a shadow orchestrator on the Worker to compare D1 state and in-degree calculations against the existing GitHub Actions graph.
3. **Phase 3: Cutover.** Disable the GitHub Actions orchestrator workflow. Enable the Worker to actively dispatch Jules sessions via GitHub API based on D1 state.

## Consequences
- The orchestrator will no longer run locally inside the repository context; it requires external infrastructure.
- Requires maintaining the sync mechanism between the GitHub repository file state and the D1 database.
