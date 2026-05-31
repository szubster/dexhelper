---
id: story-028-043-implement-dag-parser
type: STORY
title: Implement DAG Parser
status: "COMPLETED"
owner_persona: tech_lead
created_at: '2026-05-08'
updated_at: "2026-05-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-017-028-dag-dashboard-data
tags:
  - dag
  - dashboard
  - data
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement DAG Parser

## Overview
This Story covers the backend/data layer for the DAG Dashboard Webview. It is responsible for parsing the markdown files within the `.foundry` directories and generating a structured representation of the DAG.

## Requirements
- Read all markdown files in the following directories: `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`.
- Parse the YAML frontmatter of each file using `gray-matter`.
- Extract required fields: `id`, `type`, `status`, `owner_persona`, and `depends_on`.
- Build a structured JSON representation of the nodes and their directed edges (dependencies) suitable for a frontend visualization library.

## Acceptance Criteria
- [x] Create a TASK to implement a utility function to read all relevant `.foundry` files.
  - task-043-073-read-foundry-files`
- [x] Create a TASK to implement a parsing function to extract frontmatter into structured objects.
  - task-043-074-parse-frontmatter`
- [x] Create a TASK to implement a builder function that outputs the final node/edge graph data structure.
  - task-043-075-build-dag-graph`
- [x] Create a QA TASK to verify the functionality of the DAG parser.
  - task-043-076-qa-dag-parser`
