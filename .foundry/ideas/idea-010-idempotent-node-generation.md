---
id: idea-010-idempotent-node-generation
type: IDEA
title: "Idempotent Node Generation Mechanism"
status: READY
owner_persona: product_manager
created_at: "2026-04-29"
updated_at: "2026-04-29"
depends_on: []
jules_session_id: null
parent: null
tags: ["orchestrator", "generation", "efficiency"]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Idempotent Node Generation Mechanism

## Context
During the generation of `prd-007-005-migrate-saves-to-indexeddb`, the Product Manager encountered an anomaly where the target PRD file already existed prior to the session. This triggers the EMPTY PR POLICY, but it wastes a Jules session credit because the agent wakes up only to discover there is no work to do.

## Proposal
Implement an idempotent generation check within the orchestrator or a standalone CLI tool. Before transitioning a node that explicitly spawns child nodes (e.g., transforming an IDEA to a PRD), the system should verify if the expected child node IDs already exist in the `.foundry/` state store.

If the target files exist and are fully formed, the orchestrator should immediately mark the parent node's generation sub-task as fulfilled without spawning a Jules matrix job, saving resources and preventing redundant session startups.

## Generated PRD
- [.foundry/prds/prd-010-008-idempotent-node-generation.md](.foundry/prds/prd-010-008-idempotent-node-generation.md)
