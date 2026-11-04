---
id: task-731-743-parse-foundry-node-qa
type: TASK
title: QA YAML Parsing Utility
status: PENDING
owner_persona: qa
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - task-731-742-parse-foundry-node-tests
jules_session_id: null
pr_number: null
parent: story-707-731-implement-yaml-parsing-utility
tags:
  - foundry
  - parsing
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# QA YAML Parsing Utility

## Description
Perform QA verification for the parseFoundryNode utility to ensure it meets the requirements outlined in the story.

## Acceptance Criteria
- [ ] Verify that parseFoundryNode properly isolates YAML frontmatter and avoids scanning the body.
- [ ] Verify that the utility uses gray-matter as per architectural guidelines.
- [ ] Ensure all unit tests pass and cover edge cases.
