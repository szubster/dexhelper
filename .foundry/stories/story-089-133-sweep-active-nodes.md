---
id: story-089-133-sweep-active-nodes
type: STORY
title: Sweep Active Nodes
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-050-089-zombie-node-detection-engine
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Sweep Active Nodes

## 1. Context
As part of the Zombie Node Detection Engine (Epic 050-089), we need a mechanism to scan the `.foundry/` directory to identify any node files that are currently marked as `ACTIVE`.

## 2. Requirements
- Write a sweeping utility function that recursively iterates through all markdown files in the `.foundry/` directory tree.
- Parse the YAML frontmatter of each file.
- Filter and return only the nodes where `status` is `ACTIVE`.

## 3. Acceptance Criteria
- [ ] Implement directory traversal logic for `.foundry/`.
- [ ] Correctly parse node frontmatter and filter for `ACTIVE` status.
- [ ] Create tests to verify the sweeping logic correctly identifies active nodes and ignores non-active ones.

## 4. Next Steps
- [ ] Break down into Tasks.
