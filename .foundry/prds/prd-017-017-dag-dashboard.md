---
id: prd-017-017-dag-dashboard
type: PRD
title: DAG Dashboard Webview PRD
status: BLOCKED
owner_persona: tpm
created_at: '2026-05-15'
updated_at: '2026-05-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/ideas/idea-017-dag-dashboard.md
---

# PRD: DAG Dashboard Webview

## Overview
The DAG Dashboard will be a central visualization tool to track the state of the Foundry DAG, making it easier to see dependencies, blocked nodes, and overall pipeline progress without manually reading YAML frontmatter across many files.

## Requirements
1. **Data Source:** Read and parse markdown files in the `.foundry` directory (specifically `ideas`, `prds`, `epics`, `stories`, and `tasks`).
2. **Visualization:** Use Mermaid.js or a React-based node graph library to render a directed graph of nodes.
3. **Node Details:** Nodes should display their `id`, `type`, `status`, and `owner_persona`.
4. **Interactivity:** The dashboard should allow filtering by node type or status and highlighting dependency chains.
5. **Access:** The dashboard can be a simple HTML/React webview served locally or integrated directly as an admin route in the existing app structure.

## Next Steps
- [ ] Create ADR to decide between Mermaid.js embedded in Markdown vs. a dedicated React Webview.
