---
id: story-012-026-evaluate-cloudflare-storage
type: STORY
title: "Evaluate Cloudflare Storage Mechanisms"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "13043610677363995332"
pr_number: null
parent: ".foundry/epics/epic-012-gastown-orchestrator.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
---

# Evaluate Cloudflare Storage Mechanisms

## Details
Evaluate Cloudflare D1 (SQL) and KV as potential backend stores for tracking node states atomically, as per Gastown cloud worker evaluation requirements.

## Acceptance Criteria
- [x] Assess latency and durability tradeoffs between D1 and KV.
- [x] Propose storage schema mapping node state to rows/keys.

### Latency and Durability Tradeoffs (D1 vs KV)

**Cloudflare D1 (Serverless SQL):**
- **Durability:** High. Built on SQLite with built-in replication and point-in-time recovery. Guarantees consistency.
- **Latency:** Moderate. While fast, running SQL queries involves some overhead compared to key-value lookups. Global read replicas can help, but writes are typically routed to a single primary location, meaning write latency depends on geographic distance to that primary.
- **Pros:** ACID compliant, relational data modeling (joins, foreign keys), easy to query complex states.
- **Cons:** Slower write performance globally compared to KV, potential write bottlenecks.

**Cloudflare KV (Key-Value Store):**
- **Durability:** High, but offers *eventual consistency*. Writes can take up to 60 seconds to propagate globally.
- **Latency:** Extremely low for reads at the edge. Writes are fast but not immediately consistent globally.
- **Pros:** Ultra-fast edge reads, simple API, scales automatically to handle massive read traffic.
- **Cons:** Eventual consistency is problematic for atomic state tracking. If two agents try to update the same node simultaneously, race conditions and lost updates are highly likely.

**Conclusion:** For tracking node states atomically, **Cloudflare D1 is the required choice**. The orchestrator DAG needs strict consistency to ensure nodes don't get dispatched multiple times or stuck in inconsistent states. The eventual consistency of KV is unacceptable for state tracking in this architecture.

### Proposed Storage Schema (D1)

Mapping the node state to rows involves a table structured around the properties of the node files.

```sql
CREATE TABLE foundry_nodes (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    owner_persona TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    jules_session_id TEXT,
    pr_number INTEGER,
    parent TEXT,
    rejection_count INTEGER DEFAULT 0
);

CREATE TABLE foundry_node_dependencies (
    node_id TEXT NOT NULL,
    depends_on_path TEXT NOT NULL,
    PRIMARY KEY (node_id, depends_on_path),
    FOREIGN KEY (node_id) REFERENCES foundry_nodes(id) ON DELETE CASCADE
);

CREATE TABLE foundry_node_tags (
    node_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (node_id, tag),
    FOREIGN KEY (node_id) REFERENCES foundry_nodes(id) ON DELETE CASCADE
);
```

**Schema Details:**
- **`foundry_nodes`:** The central table representing each markdown file. The `id` is the globally unique slug.
- **`foundry_node_dependencies`:** Tracks the `depends_on` array. A separate table allows for easy querying of blocked/unblocked states.
- **`foundry_node_tags`:** A simple junction table for tags to allow efficient filtering.
