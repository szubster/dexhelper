---
id: idea-020-enforce-acceptance-criteria-completion
type: IDEA
title: Enforce Acceptance Criteria Checkbox Completion
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-11'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: '13898143266540809457'
pr_number: null
parent: null
tags: []
research_references: []
notes: >-
  Proposed by Agile Coach based on observation that completed tasks still
  contain unchecked `[ ]` boxes, indicating potential skipped validations or
  flawed orchestrator state transitions.
---

# Enforce Acceptance Criteria Checkbox Completion

## Problem
Currently, several nodes transition to `COMPLETED` despite retaining unchecked `[ ]` boxes in their Acceptance Criteria sections. This implies that agents are failing to properly tick the boxes during implementation, or the orchestrator is incorrectly determining completion status. Either way, this degrades the reliability of the system's explicit contracts.

## Proposal
Implement an orchestrator validation check (likely as part of a pre-flight or merge validation step) that scans the raw markdown body of the file. If the file contains `- [ ]` within an "Acceptance Criteria" block, the node should be prevented from transitioning to `COMPLETED` (or the associated PR should be blocked/flagged).

## Acceptance Criteria
- [ ] Determine the best phase to inject this validation check (e.g., during the Heartbeat transition to COMPLETED, or as a GitHub Action PR check).
- [ ] Implement the logic to scan for unchecked `[ ]` boxes.
- [ ] Ensure that it properly flags nodes and prevents premature completion.
