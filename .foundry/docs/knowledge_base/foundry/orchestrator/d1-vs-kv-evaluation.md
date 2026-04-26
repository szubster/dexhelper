# D1 vs KV Evaluation

## KV Tradeoffs
- **Latency**: Very low read latency (edge cached). High global write latency.
- **Durability / Consistency**: Eventually consistent. Writes can take time to propagate globally.
- **Model**: Key-Value store. Fast direct lookups. No complex querying.

## D1 (SQL) Tradeoffs
- **Latency**: Low latency when close to the main DB node, but can be higher globally compared to KV.
- **Durability / Consistency**: Strong consistency. SQLite database on the edge. Supports transactions.
- **Model**: Relational. Allows complex querying, joins, and indexing. Better for structured state data and complex lookups.

## Recommendation for Node State Tracking
**D1** is recommended. Node states (`READY`, `ACTIVE`, `COMPLETED`, etc.) require atomic transitions and strict consistency to avoid race conditions. Orchestration often needs complex queries (e.g. "Find all READY nodes where dependencies are COMPLETED"). While KV is faster for reads, its eventual consistency is problematic for state machines where out-of-order or delayed state updates can break the DAG resolution.

## Proposed Storage Schema (D1 SQLite)

```sql
CREATE TABLE nodes (
    id TEXT PRIMARY KEY,           -- e.g. "task-012-026-eval-d1"
    type TEXT NOT NULL,          -- e.g. "STORY"
    title TEXT NOT NULL,
    status TEXT NOT NULL,        -- e.g. "ACTIVE"
    owner_persona TEXT NOT NULL, -- e.g. "coder"
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    jules_session_id TEXT,
    pr_number INTEGER,
    parent TEXT,
    rejection_count INTEGER DEFAULT 0,
    rejection_reason TEXT,
    notes TEXT
);

CREATE TABLE dependencies (
    node_id TEXT NOT NULL,        -- The node that is blocked
    depends_on_path TEXT NOT NULL, -- The path of the blocking node
    PRIMARY KEY (node_id, depends_on_path),
    FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    node_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    PRIMARY KEY (node_id, tag),
    FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);
```
