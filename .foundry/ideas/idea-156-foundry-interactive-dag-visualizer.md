---
id: idea-156-foundry-interactive-dag-visualizer
type: IDEA
title: Interactive Foundry DAG Visualizer UI
status: PENDING
owner_persona: product_manager
created_at: '2026-08-18'
updated_at: '2026-08-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - UI
  - tooling
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Interactive Foundry DAG Visualizer UI

## Context & Vision
While IDEA-133 proposed an automated Mermaid.js generation for the DAG, static markdown files in GitHub provide limited interactivity. As the Foundry DAG grows into hundreds of nodes (Ideas, PRDs, Epics, Stories, Tasks), a static Mermaid chart becomes unwieldy and difficult to navigate.

We propose building a dedicated, interactive React-based "Foundry Dashboard" built directly into a hidden route of DexHelper (or as a separate lightweight internal Vite app). This dashboard will consume the `.foundry` directory data and render a highly interactive graph using a library like React Flow.

## Value Proposition
- **Interactivity:** Users (and developers monitoring the agents) can pan, zoom, and click on nodes to instantly view their YAML frontmatter, markdown body, and active Jules session logs.
- **Real-time Pipeline Monitoring:** Visually identify bottlenecks, deadlocks, and "horizontal explosions" where too many nodes are dispatched at once.
- **Node Filtering:** Ability to filter the visual graph by status (e.g., show only FAILED or BLOCKED nodes), by owner persona, or by specific feature epics, drastically reducing noise.

## Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD detailing the architecture of the internal React Flow dashboard and how it will ingest the local `.foundry` YAML/Markdown data.