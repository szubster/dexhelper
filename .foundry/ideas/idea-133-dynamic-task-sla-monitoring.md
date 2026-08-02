---
id: idea-133-dynamic-task-sla-monitoring
type: IDEA
title: Dynamic Task SLA Monitoring and Alerting
status: PENDING
owner_persona: "product_manager"
created_at: "2026-08-02"
updated_at: "2026-08-02"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: ["foundry", "orchestrator", "scheduling"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Dynamic Task SLA Monitoring and Alerting

## Problem
Currently, the DAG orchestrator does not monitor how long a task has been in a specific state (`READY` or `ACTIVE`) unless it fails explicitly via a timeout or max rejection count. A node might remain unassigned (stuck in `READY` due to persona starvation) or trapped in an endless cycle of minor changes and re-assignments without triggering the Max Rejection Cancellation loop. This silent stalling degrades overall pipeline throughput.

## Proposed Solution
Introduce Dynamic Task SLAs (Service Level Agreements) to the DAG Orchestrator:
1. Define configurable threshold limits for node states based on their type (e.g., a TASK should resolve within X hours, an EPIC might take days).
2. The orchestrator will periodically scan all `READY` and `ACTIVE` nodes against their SLA based on `created_at` or `updated_at`.
3. Nodes assigned to the `human` persona must be strictly exempt from SLA monitoring, as human response times are highly variable and out of the orchestrator's control.
4. If an SLA is breached, the orchestrator will automatically spawn an intervention node owned by the `agile_coach` or `mechanic` persona to investigate the bottleneck, redistribute resources, or forcibly demote the stalled task for re-evaluation.

This enhances the autonomous software factory's self-healing capabilities and guarantees better predictability in the multi-agent pipeline.

## Acceptance Criteria
- [ ] Investigate node SLA breach intervention node spawning
- [ ] Implement DAG orchestrator SLA monitoring logic
