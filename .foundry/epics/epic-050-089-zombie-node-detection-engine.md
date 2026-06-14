---
id: epic-050-089-zombie-node-detection-engine
type: EPIC
title: Zombie Node Detection Engine
status: READY
owner_persona: story_owner
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
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

# Epic: Zombie Node Detection Engine

## 1. Context and Problem Statement
To implement the Foundry Zombie Node Garbage Collection, we first need a robust mechanism to identify "zombie" nodes. These are nodes stuck in an `ACTIVE` state because their assigned session silently failed or the workflow completed without transitioning the node's state.

## 2. Scope
This Epic focuses exclusively on the logic required to sweep `.foundry/` directories and detect zombie nodes. It does not handle the actual remediation (changing state to `FAILED`), which is covered in a separate Epic.

## 3. High-Level Requirements
1. **Sweep mechanism**: Logic to iterate through all markdown files in the `.foundry/` directory tree.
2. **Detection Logic**:
   - Identify nodes with `status: ACTIVE`.
   - Extract their `jules_session_id` from the frontmatter.
3. **Liveliness Verification**:
   - Check if `jules_session_id` is null or malformed.
   - Cross-reference the `jules_session_id` with the GitHub Actions API (or an equivalent verification source) to determine if the session is still active or has terminated (success, failure, cancelled).

## 4. Acceptance Criteria
- [ ] Implement directory sweeping to identify all `ACTIVE` nodes.
- [ ] Implement logic to validate `jules_session_id` format and existence.
- [ ] Implement GitHub API integration (or equivalent) to check workflow liveliness.
- [ ] Unit tests for the detection functions.

## 5. Next Steps
- [ ] Break down into Stories.
