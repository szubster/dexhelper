---
id: task-735-740-markdown-body-extraction-logic
type: TASK
title: Markdown Body Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-696-735-artifact-markdown-body-parser
tags:
  - testing
  - validation
priority: 80
rejection_reason: ''
---

# TASK: Markdown Body Extraction Logic

## Description
Implement the logic to extract raw markdown sections (the markdown body) from a Foundry task node string. This should handle splitting the file content correctly after the YAML frontmatter.

## Acceptance Criteria
- [x] Logic implemented to extract the raw markdown body from a `.foundry` node file string.
- [x] Tests verify that the extraction handles files with and without complex markdown content.
