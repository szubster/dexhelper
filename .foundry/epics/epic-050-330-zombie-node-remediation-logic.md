---
id: epic-050-330-zombie-node-remediation-logic
type: EPIC
title: Zombie Node Remediation Logic V2
status: PENDING
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-09-01'
depends_on:
  - research-050-329-investigate-zombie-gc-failure
jules_session_id: null
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

# Epic: Zombie Node Remediation Logic V2

## Context
Following the detection of "zombie" nodes (nodes incorrectly stuck in the `ACTIVE` state), the system must auto-remediate them to prevent DAG deadlocks. This involves transitioning their state to `FAILED`.
This is a replacement epic following the failure of `epic-050-090-zombie-node-remediation-and-gc`. The implementation must incorporate findings from the prerequisite research node.

## Scope
This Epic handles the remediation logic (state transitions) specifically updating the YAML frontmatter of identified zombie nodes to change `status: ACTIVE` to `status: FAILED`.

## Acceptance Criteria
- [ ] Review research findings from `research-050-329-investigate-zombie-gc-failure`.
- [ ] Implement state transition logic to modify `status` to `FAILED` in the markdown files safely.
- [ ] Ensure robust unit test coverage for the remediation functionality.

## Next Steps
- [x] Break down into Stories.
- [ ] story-330-514-remediation-state-transition-logic
- [ ] story-330-515-remediation-logic-e2e
