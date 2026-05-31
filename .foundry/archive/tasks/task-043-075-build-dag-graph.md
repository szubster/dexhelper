---
id: task-043-075-build-dag-graph
type: TASK
title: 'DAG Parser: Build DAG Graph'
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-11'
depends_on:
  - .foundry/tasks/task-043-074-parse-frontmatter.md
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

# DAG Parser: Build DAG Graph

## Objective
Implement a builder function that outputs the final node/edge graph data structure.

## Requirements
- Create a builder function, for example `buildDagGraph(parsedNodes: ParsedNode[])`.
- It should take the parsed nodes from the previous steps.
- Build a structured JSON representation of the nodes and their directed edges (dependencies) suitable for a frontend visualization library (like React Flow or similar).
- A common structure might look like:
  ```json
  {
    "nodes": [ { "id": "node-1", "data": { "type": "TASK", "status": "COMPLETED", "owner_persona": "coder" } } ],
    "edges": [ { "source": "node-1", "target": "node-2" } ]
  }
  ```
- Ensure the `depends_on` array (which contains file paths) is correctly mapped to node `id`s for the edges. You may need to map paths to node IDs.

## Acceptance Criteria
- [x] A builder function is implemented and exported.
- [x] It produces a structured JSON output with `nodes` and `edges`.
- [x] `depends_on` paths are correctly translated into edges linking node IDs.
- [x] Unit tests verify the correct generation of the graph structure from mock parsed nodes.
