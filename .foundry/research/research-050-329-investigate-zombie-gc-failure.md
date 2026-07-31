---
id: research-050-329-investigate-zombie-gc-failure
type: RESEARCH
title: Investigate Zombie GC Remediation Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-17'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: '15689241981077109000'
pr_number: null
parent: prd-079-050-foundry-zombie-node-cleanup
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Zombie GC Remediation Failure

## Objective
Investigate the root cause behind the max rejection count and cancellation of `epic-050-090-zombie-node-remediation-and-gc` and its associated stories.

## Context
The zombie node remediation epic reached max rejections. To properly unblock this DAG and resolve the infinite loops, we need to understand what specifically failed during its implementation or verification.

## Acceptance Criteria
- [x] Read the auditor and qa persona journals to understand why `epic-050-090-zombie-node-remediation-and-gc` failed.
- [x] Produce a summary of findings.
- [x] Determine the path forward for the replacement Epics.

## Summary of Findings
Based on the auditor's journal (session `18386111525126870827`), a programmatic safeguard was implemented in `foundry-orchestrator.ts` and `foundry-heartbeat.ts` requiring that before an `EPIC` can be marked `COMPLETED`, at least one of its child `STORY` nodes must have `e2e` or `integration` in its `tags` array.
The previous epic (`epic-050-090-zombie-node-remediation-and-gc`) and its child stories (`story-090-133-remediation-state-transition-logic` and `story-090-134-garbage-collection-integration`) did not include these tags. This caused the orchestrator to fail the verification repeatedly, leading to the max rejection count being reached and the epic being cancelled.

## Path Forward for Replacement Epics
To ensure successful completion of the replacement epics (`epic-050-330-zombie-node-remediation-logic` and `epic-050-331-zombie-node-gc-integration`), they must explicitly require that at least one of their generated child `STORY` nodes includes `e2e` or `integration` in its `tags`.
