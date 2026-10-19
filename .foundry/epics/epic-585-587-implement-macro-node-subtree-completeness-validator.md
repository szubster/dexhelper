---
id: epic-585-587-implement-macro-node-subtree-completeness-validator
type: EPIC
title: Implement Macro Node Subtree Completeness Validator Tool
status: ACTIVE
owner_persona: story_owner
created_at: '2026-10-16T18:04:19.673Z'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: '7680343253248997459'
locks: []
pr_number: null
parent: prd-527-585-macro-node-subtree-completeness-validator
priority: 50
confidence_score: null
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Macro Node Subtree Completeness Validator Tool

## Description
This Epic covers the implementation of the Macro Node Subtree Completeness Validator Tool as defined in PRD `prd-527-585-macro-node-subtree-completeness-validator`. The tool will recursively traverse the DAG sub-tree for any target macro node, identifying all direct and transitive child nodes linked via `parent` or markdown checkboxes (`- [ ]`). It will then assert that every descendant node is in the `COMPLETED` state before allowing the parent node to transition to `VERIFYING` or `READY`.

This tool aims to eliminate premature Auditor rejections, enforce compliance with System Invariant 15 in `.foundry/docs/schema.md`, and prevent DAG state corruptions.

## Acceptance Criteria
- [ ] story-587-588-implement-validator-core-logic
- [ ] story-587-589-integrate-validator-with-orchestrator
- [ ] story-587-590-e2e-verification-macro-node-completeness
