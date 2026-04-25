---
id: task-009-028-deprecate-composite-nodes
type: TASK
title: "Deprecate Composite Nodes in Schema"
status: READY
owner_persona: coder
created_at: "2026-04-24"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-009-composite-deprecation.md
tags: []
rejection_count: 0
notes: ""
---

# Deprecate Composite Nodes in Schema

## Context
As defined in Story 009, we need to explicitly deprecate the concept of "composite nodes" in `.foundry/docs/schema.md`. Since the term doesn't currently exist, we must add an explicit rule forbidding it to prevent confusion. Composite nodes are an anti-pattern because they lead to DAG deadlocks in our orchestrated workflow.

## Requirements
1. Update `.foundry/docs/schema.md` to explicitly flag "Composite Nodes" as an anti-pattern.
2. Add an explanation for *why* composite nodes cause deadlocks (e.g., they bundle multiple lifecycle states or responsibilities that conflict with the strict Directed Acyclic Graph orchestrator, leading to circular dependencies or unresolved `depends_on` chains).
3. The `coder` can self-verify this change since it is a simple documentation update.

## Acceptance Criteria
- [ ] "Composite node" terminology is explicitly flagged as an anti-pattern in `.foundry/docs/schema.md`.
- [ ] Context is added explaining why composite nodes cause deadlocks.
