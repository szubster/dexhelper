---
id: idea-007-impossible-loop-flaws
type: IDEA
title: "Fix Heartbeat Resurrection Breaking Impossible Loop"
status: PENDING
owner_persona: product_manager
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: null
tags: ["foundry-v2", "orchestration"]
---
# Fix Heartbeat Resurrection Breaking Impossible Loop

## Problem Statement
The `foundry-heartbeat.ts` script blindly resurrects all nodes with `status: FAILED` back to `READY`. This breaks the new "Impossible Loop" late binding protocol, where an agent intentionally transitions a node to `FAILED` with a `rejection_reason` in the frontmatter. The heartbeat will infinitely retry these nodes instead of escalating them. Additionally, the `rejection_reason` field is missing from `schema.md`.

## Proposed Solution
1. Update `foundry-heartbeat.ts` to check for `rejection_reason` in `FAILED` nodes. If present, it should NOT resurrect the node. Instead, it should alert the TPM or Product Manager, or wake up the parent node.
2. Update `schema.md` to officially support the `rejection_reason` string field.
