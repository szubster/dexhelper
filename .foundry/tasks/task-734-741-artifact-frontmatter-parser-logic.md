---
id: task-734-741-artifact-frontmatter-parser-logic
type: TASK
title: Implement Frontmatter Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-11-02'
updated_at: '2026-11-02'
depends_on:
  - task-734-740-artifact-frontmatter-parser-types
jules_session_id: null
pr_number: null
parent: story-696-734-artifact-frontmatter-parser
tags:
  - typescript
priority: 80
---

# TASK: Implement Frontmatter Extraction Logic

## Description
Implement the core logic to parse and extract context variables (like the owner persona and status) from the YAML frontmatter of a Foundry task node. You should use `gray-matter` for parsing and handle potential errors (like malformed YAML or missing files).

## Acceptance Criteria
- [ ] Logic implemented to extract YAML frontmatter.
- [ ] Errors handled gracefully (e.g., malformed YAML).
