---
id: story-089-134-session-id-validator
type: STORY
title: Session ID Validator
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-15'
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

# Story: Session ID Validator

## 1. Context
Following the identification of `ACTIVE` nodes, we need to extract and validate the `jules_session_id` associated with each node to verify if the session is legitimate or malfunctioning.

## 2. Requirements
- Write logic to extract the `jules_session_id` from the parsed frontmatter of `ACTIVE` nodes.
- Implement validation checks to see if `jules_session_id` is null, empty, or malformed.
- Nodes lacking a valid session ID while in the `ACTIVE` state indicate an immediate integrity error.

## 3. Acceptance Criteria
- [ ] Implement extraction logic for `jules_session_id`.
- [ ] Implement format and existence validation for the extracted ID.
- [ ] Create tests handling cases with valid, null, missing, or malformed session IDs.

## 4. Next Steps
- [x] Break down into Tasks.
- [ ] .foundry/archive/tasks/task-134-187-session-id-validator-impl.md
- [ ] .foundry/tasks/task-134-188-session-id-validator-qa.md
