---
id: idea-129-epic-level-distillation-archival
type: IDEA
title: Epic-Level Distillation and Cold Storage Archival
status: PENDING
owner_persona: product_manager
created_at: 2026-07-29T12:00:00.000Z
updated_at: 2026-07-29T12:00:00.000Z
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - infrastructure
  - performance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic-Level Distillation and Cold Storage Archival

## Problem
The Foundry operates by creating a single Markdown file for every IDEA, PRD, EPIC, STORY, and TASK. As development progresses, the number of files in `.foundry/stories/` and `.foundry/tasks/` grows exponentially. Since the `.github/scripts/foundry-orchestrator.ts` parses the entire `.foundry` directory to calculate the DAG state on every workflow run, this unbounded growth will inevitably lead to high parsing overhead, degraded orchestrator performance, and repository bloat.

## Solution
Implement an **Epic-Level Distillation and Cold Storage Archival** strategy driven by the TPM persona.
1. **Trigger:** When an `EPIC` node transitions to `COMPLETED` (meaning all its child STORIES and TASKS are also completed).
2. **Distillation:** The TPM persona reads the contents, journals, and PR outcomes of all child STORY and TASK nodes. It synthesizes this information into a single, high-density "Changelog & Learnings" summary, which is appended to the EPIC node or a centralized historical ledger.
3. **Archival:** The TPM persona then permanently deletes the underlying granular `STORY` and `TASK` markdown files from the active `.foundry/` directory structure.
4. **Result:** The DAG orchestrator no longer parses hundreds of stale, completed leaf nodes. Repository bloat is contained, and only the macro-level nodes (IDEA, PRD, EPIC, ADR) remain as long-term documentation.

## Why this matters
This directly addresses the scalability limits of treating a Git repository as an active database. It ensures the orchestrator remains fast and cost-efficient by actively pruning dead branches of the DAG once their value has been fully realized and extracted.