---
id: epic-050-331-zombie-node-gc-integration
type: EPIC
title: Zombie Node GC Integration V2
status: READY
owner_persona: story_owner
created_at: '2026-07-17'
updated_at: '2026-08-14'
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

# Epic: Zombie Node GC Integration V2

## Context
Once zombie nodes are detected and the state transition logic is in place, the GC process must be integrated to run reliably. This is a replacement epic for the integration aspect of the failed `epic-050-090-zombie-node-remediation-and-gc`.

## Scope
This Epic handles the decision and implementation of whether this GC process runs synchronously within the main orchestrator script or as an independent scheduled script. The implementation must incorporate findings from the prerequisite research node.

## Acceptance Criteria
- [ ] Review research findings from `research-050-329-investigate-zombie-gc-failure`.
- [ ] Determine the integration approach (standalone script vs. direct orchestrator integration).
- [ ] Implement the integration pattern accurately utilizing the detection engine and remediation logic.
- [ ] Ensure that remediated nodes (`FAILED` state) are correctly processed by the existing resurrection loop on the subsequent cycle.

## Next Steps
- [ ] Break down into Stories.
