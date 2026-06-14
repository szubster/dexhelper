---
id: epic-050-090-zombie-node-remediation-and-gc
type: EPIC
title: Zombie Node Remediation and GC Logic
status: READY
owner_persona: story_owner
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - epic-050-089-zombie-node-detection-engine
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

# Epic: Zombie Node Remediation and GC Logic

## 1. Context and Problem Statement
Following the detection of "zombie" nodes (nodes incorrectly stuck in the `ACTIVE` state), the system must auto-remediate them to prevent DAG deadlocks. This involves transitioning their state to `FAILED` so the existing Resurrection Loop can pick them up and retry.

## 2. Scope
This Epic handles the remediation logic (state transitions) and the integration of the Garbage Collection (GC) workflow (either as a standalone TPM script or within the main orchestrator script). It depends on the detection engine to identify the target nodes.

## 3. High-Level Requirements
1. **Remediation Logic**: Functionality to safely update the YAML frontmatter of identified zombie nodes, changing `status: ACTIVE` to `status: FAILED`.
2. **Integration Decision & Implementation**:
   - Determine whether this GC process runs synchronously within `.github/scripts/foundry-orchestrator.ts` or as an independent scheduled script.
   - Implement the chosen integration pattern, ensuring it accurately utilizes the detection engine.
3. **Resurrection Hand-off**: Ensure that the remediated nodes (`FAILED` state) are correctly processed by the existing resurrection loop on the subsequent cycle without manual intervention.

## 4. Acceptance Criteria
- [ ] Determine the integration approach (standalone script vs. direct orchestrator integration).
- [ ] Implement state transition logic (modifying `status` to `FAILED` in the markdown files).
- [ ] Implement the integration of detection and remediation logic.
- [ ] Ensure unit test coverage for the remediation functionality.

## 5. Next Steps
- [ ] Break down into Stories.
