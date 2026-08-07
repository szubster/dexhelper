---
id: prd-129-339-epic-level-distillation-archival
type: PRD
title: Epic-Level Distillation and Cold Storage Archival
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-06'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: '1517778892017773348'
pr_number: null
parent: idea-129-epic-level-distillation-archival
tags:
  - foundry
  - infrastructure
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic-Level Distillation and Cold Storage Archival

## Context
The Foundry currently represents every node (IDEA, PRD, EPIC, STORY, TASK) as an individual Markdown file in the `.foundry` directory. The `.github/scripts/foundry-orchestrator.ts` script calculates the entire DAG state by parsing this directory during each workflow run. The exponential growth of granular STORY and TASK files leads to significant parsing overhead, degrading orchestrator performance and bloating the repository over time.

## Objective
To implement an archival strategy that maintains crucial historical context while significantly reducing the number of active node files the orchestrator must parse. This will be achieved by distilling completed granular nodes (STORY and TASK) into their parent EPIC node and permanently moving the granular files into cold storage.

## Requirements
1. **Trigger Condition:** The distillation and archival process MUST trigger when an `EPIC` node transitions to the `COMPLETED` state (which implies all child `STORY` and `TASK` nodes are also `COMPLETED`).
2. **Execution Persona:** The process MUST be executed by the `tpm` persona during its scheduled hourly run or dynamically if applicable.
3. **Data Distillation:**
   - The TPM MUST aggregate the contents, outcome summaries, and relevant journals from all child `STORY` and `TASK` nodes.
   - This aggregated information MUST be synthesized into a "Changelog & Learnings" summary section.
   - This summary MUST be appended to the corresponding `EPIC` node file (or a defined centralized ledger if architectural constraints dictate).
4. **Cold Storage Archival:**
   - After distillation is complete, the original markdown files for the processed `STORY` and `TASK` nodes MUST be permanently removed from the active `.foundry/stories/` and `.foundry/tasks/` directories.
   - The files SHOULD be moved to an archive directory (e.g., `.foundry/archive/stories/`, `.foundry/archive/tasks/`) to maintain a strict separation from the orchestrator's active parsing path.
5. **Orchestrator Bypass:** Ensure the DAG orchestrator ignores the cold storage archive paths to optimize parsing performance.

## Out of Scope
- Altering the format or metadata of macro nodes (IDEA, PRD).
- Automatic archiving of nodes that are CANCELLED or FAILED unless explicitly handled by separate workflow logic.

## Acceptance Criteria
- [ ] Implement TPM logic to trigger distillation when an EPIC completes.
- [ ] Implement synthesis logic to append "Changelog & Learnings" to the EPIC node.
- [ ] Implement file system logic to move child node files to `.foundry/archive/`.
- [ ] Ensure the orchestrator is updated to ignore `.foundry/archive/` during DAG parsing.
