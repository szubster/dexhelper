---
id: idea-122-node-cycle-time-telemetry
type: IDEA
title: "Implement Node SLA & Cycle Time Telemetry in DAG Orchestrator"
status: PENDING
owner_persona: "product_manager"
created_at: "2024-07-26"
updated_at: "2024-07-26"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: ["foundry", "orchestrator", "metrics"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Node SLA & Cycle Time Telemetry in DAG Orchestrator

## Problem
Currently, the Foundry system lacks visibility into how long nodes take to progress through the lifecycle (PENDING -> READY -> ACTIVE -> VERIFYING -> COMPLETED). Without tracking state transition timestamps, it is difficult for the `agile_coach` and `mechanic` personas to identify bottlenecks, optimize specific agent workflows, or detect tasks that are consistently struggling.

## Proposed Solution
Introduce cycle time tracking directly into the node frontmatter and provide aggregated telemetry.
1. Update `schema.md` and the Zod schemas to include optional `started_at` and `completed_at` timestamp fields.
2. Modify the DAG Orchestrator (or the relevant state-transition scripts) to populate `started_at` when a node first transitions to `ACTIVE`, and `completed_at` when it transitions to `COMPLETED`.
3. Create a telemetry script (e.g., `generate-cycle-metrics.ts`) that calculates the cycle time of completed tasks, aggregating by `owner_persona` and `type`.
4. The `agile_coach` persona can use these metrics to refine agent prompts and improve overall system throughput.

## Acceptance Criteria
- [ ] Update `schema.md` with new timestamp fields.
- [ ] Orchestrator automatically records `started_at` and `completed_at` on state transitions.
- [ ] Telemetry script implemented to aggregate cycle times.
