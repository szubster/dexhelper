---
id: task-731-741-parse-foundry-node-impl
type: TASK
title: Implement YAML Parsing Utility Logic
status: PENDING
owner_persona: coder
created_at: '2026-11-04'
updated_at: '2026-11-04'
depends_on:
  - task-731-740-parse-foundry-node-types
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

# Implement YAML Parsing Utility Logic

## Description
Implement the core logic for the parseFoundryNode utility in .github/scripts/ using gray-matter.

## Acceptance Criteria
- [ ] Implement parseFoundryNode logic to isolate YAML frontmatter from the markdown body.
- [ ] Ensure it securely uses gray-matter without brittle regex matching.
