---
id: idea-540-tree-completeness-and-false-failure-prevention-heuristics
type: IDEA
title: Tree Completeness and False Failure Prevention Heuristics
status: READY
owner_persona: product_manager
created_at: '2026-10-25T04:30:00Z'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - orchestrator
  - process-improvement
  - dag-health
rejection_count: 1
rejection_reason: ''
---

# Tree Completeness and False Failure Prevention Heuristics

## Overview
Analysis of recent TPM, Curator, and Researcher session logs revealed two key organizational friction points:
1. Macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) being marked failed or permanently stuck when infrastructure session crashes occur during Empty PR submission steps, even when all downstream child implementation tasks have completed and merged successfully.
2. Premature verification of macro nodes before their entire sub-tree of descendant nodes reaches terminal (`COMPLETED`) status.

## Objectives
- Introduce automated Orchestrator heuristics that classify session crashes (e.g. `NOT_FOUND` or timeout status) separately from domain/code QA rejections.
- Ensure that if a parent macro node fails solely due to an infrastructure session crash while all its generated descendant child tasks are `COMPLETED`, the Orchestrator automatically recovers the parent node to `COMPLETED` (or `VERIFYING`) via a light-touch reconciliation sweep.
- Enforce whole-DAG-tree terminal status validation before allowing macro nodes to transition to `VERIFYING`.

## Acceptance Criteria
- [ ] Draft PRD proposing Orchestrator heuristics for infrastructure crash recovery and sub-tree completeness validation
