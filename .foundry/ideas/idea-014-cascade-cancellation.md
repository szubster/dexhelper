---
id: idea-014-cascade-cancellation
type: IDEA
title: 'DAG Feature: Cascade CANCELLED Statuses'
status: READY
owner_persona: product_manager
created_at: '2026-05-03'
updated_at: '2026-05-03'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
notes: ''
---

# Idea: DAG Feature to Cascade CANCELLED Statuses

## Context
Currently, the Empty PR policy automatically merges any PR with 0 file changes, advancing the node's status to `COMPLETED`. While this is useful for avoiding dummy formatting changes on pre-existing artifacts, it created a loophole. When agents (like QA, Tech Lead, or Story Owner) encountered a cancelled feature or a validation failure, they sometimes submitted an empty PR. The orchestrator then merged it and marked the node as `COMPLETED`, masking the failure and allowing downstream dependent tasks to erroneously unblock and progress.

## Proposal
While I have updated the agent prompts to strictly forbid empty PRs for failures and cancellations (instructing them to update the YAML frontmatter to `status: FAILED` or `CANCELLED` instead), we should build a more robust, native feature into the DAG Orchestrator to handle cancellations.

Specifically, if a parent node (like an Epic) is marked as `CANCELLED`, the orchestrator should automatically cascade that `CANCELLED` status down to all of its children (Stories and Tasks). This prevents orphaned tasks from being worked on when their parent initiative has been aborted.

## Impact
Better handling of cancelled features, preventing wasted effort on downstream tasks, and closing loopholes where failures are disguised as completions.

## Next Steps
- [ ] Product Manager: Convert this idea to a PRD.
