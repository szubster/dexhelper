---
id: epic-017-028-dag-dashboard-data
type: EPIC
title: DAG Dashboard Data Source & Parsing
status: PENDING
owner_persona: story_owner
created_at: "2026-05-18"
updated_at: "2026-05-18"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-017-017-dag-dashboard.md
tags: ["dag", "dashboard", "data"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# DAG Dashboard Data Source & Parsing

## Overview
This Epic covers the backend/data layer for the DAG Dashboard Webview. It is responsible for parsing the markdown files within the `.foundry` directories and generating a structured representation of the DAG.

## Requirements
- Read all markdown files in the following directories: `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`.
- Parse the YAML frontmatter of each file using `gray-matter`.
- Extract required fields: `id`, `type`, `status`, `owner_persona`, and `depends_on`.
- Build a structured JSON representation of the nodes and their directed edges (dependencies) suitable for a frontend visualization library.

## Acceptance Criteria
- [ ] Implement a utility function to read all relevant `.foundry` files.
- [ ] Implement a parsing function to extract frontmatter into structured objects.
- [ ] Implement a builder function that outputs the final node/edge graph data structure.
