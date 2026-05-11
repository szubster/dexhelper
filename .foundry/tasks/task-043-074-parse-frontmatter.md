---
id: task-043-074-parse-frontmatter
type: TASK
title: 'DAG Parser: Parse Frontmatter'
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on:
  - .foundry/tasks/task-043-073-read-foundry-files.md
jules_session_id: null
pr_number: null
parent: story-028-043-implement-dag-parser
tags:
  - dag
  - dashboard
  - data
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# DAG Parser: Parse Frontmatter

## Objective
Implement a parsing function to extract frontmatter into structured objects.

## Requirements
- Create a parsing function, for example `parseFoundryNode(rawContent: string)`.
- Use the `gray-matter` library to parse the YAML frontmatter from the raw markdown string.
- Extract and strongly type the following required fields: `id`, `type`, `status`, `owner_persona`, and `depends_on`.
- Handle files that might not have valid YAML frontmatter gracefully (e.g., return `null` or skip).

## Acceptance Criteria
- [x] A parsing function is implemented and exported.
- [x] It uses `gray-matter` to parse the YAML frontmatter.
- [x] It correctly extracts `id`, `type`, `status`, `owner_persona`, and `depends_on`.
- [x] Unit tests verify correct extraction from valid markdown and graceful handling of invalid markdown.
