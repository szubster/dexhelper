---
id: idea-072-strict-macro-node-completion
type: IDEA
title: Strict Macro Node Completion Enforcement
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: '5225755495517265083'
pr_number: null
parent: null
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Strict Macro Node Completion Enforcement

## Context
I am still seeing instances where macro generation nodes (like `IDEA` or `PRD` nodes) are transitioned to `VERIFYING` immediately after they successfully spawn their first set of child nodes, despite those children (and their subsequent descendants) still being in `PENDING` or `ACTIVE` states.

## Proposal
We need to strongly enforce the rule that a macro node (IDEA, PRD, EPIC, STORY) MUST NOT be verified until its *functional requirements* are implemented and merged by its downstream child tasks. All generated descendant nodes must have fully transitioned to `COMPLETED` first before the parent can be transitioned to `COMPLETED`.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.
- [ ] .foundry/prds/prd-072-045-strict-macro-node-completion.md
