---
id: idea-017-dag-dashboard
type: IDEA
title: 'DAG Dashboard Webview'
status: "PENDING"
owner_persona: product_manager
created_at: '2026-05-15'
updated_at: "2026-05-15"
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - visualization
notes: ''
---

# Idea: DAG Dashboard Webview

## Context
Currently, tracking the state of the Foundry DAG requires manually reading YAML frontmatter across many Markdown files in the `.foundry` directory and mentally mapping `depends_on` relationships. This is tedious, error-prone, and provides poor visibility into pipeline bottlenecks or blocked nodes.

## Proposal
Create a dashboard to visualize the DAG state. This could be achieved by generating a Mermaid.js diagram embedded in a central markdown file, or an interactive HTML/React webview that parses the `.foundry` directory and visualizes nodes, their statuses, and dependencies as a directed graph.

## Next Steps
- [ ] Convert this idea into a detailed PRD defining the visualization approach and technical requirements.
