---
id: idea-015-enforce-persona-pipeline
type: IDEA
title: 'DAG Feature: Enforce Persona Pipeline Handoffs'
status: "COMPLETED"
owner_persona: product_manager
created_at: '2026-05-04'
updated_at: "2026-05-04"
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - orchestrator
  - validation
notes: ''
---

# Idea: Enforce Persona Pipeline Handoffs in DAG Orchestrator

## Context
Nodes are occasionally being assigned to incorrect personas, breaking the required pipeline flow. For example, `prd-013-012` was assigned to `architect` instead of `epic_planner`, which resulted in silent failures and an endless resurrection loop.

## Proposal
The DAG Orchestrator should include a pre-flight schema validation check that ensures the `owner_persona` defined in the YAML frontmatter matches the expected persona for the given node `type` (e.g., `IDEA` -> `product_manager`, `PRD` -> `epic_planner`, `EPIC` -> `story_owner`, etc., with `architect` restricted to ADRs/architecture tasks). If there is a mismatch, the orchestrator should flag the node as invalid before attempting to dispatch it to a Jules session.

## Next Steps
- [x] Convert this idea into a detailed PRD defining the allowed type-to-persona mappings.


### References
- .foundry/prds/prd-015-014-enforce-persona-pipeline.md
