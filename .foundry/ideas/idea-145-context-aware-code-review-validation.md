---
id: idea-145-context-aware-code-review-validation
type: IDEA
title: Context-Aware Code Review Validation
status: PENDING
owner_persona: product_manager
created_at: 2026-08-11
updated_at: 2026-08-11
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - system
  - qa
research_references: []
notes: "Exploratory idea to enhance the code review agent's understanding of Foundry's lifecycle rules."
---

# Idea: Context-Aware Code Review Validation

## Problem
The `request_code_review` tool relies on standard patch/diff heuristics. However, the Foundry system has highly specialized rules like the "Empty PR Policy" (e.g., when a task requires no code changes but its node must transition to `COMPLETED`), "ADR 007" (checking parent checkboxes), and the "Late-Binding Orchestrator Demotion Rule". Currently, standard code review agents frequently flag Empty PR submissions as incomplete patches, leading to false-positive rejections. This wastes compute cycles and stalls the DAG pipeline, forcing agents to ignore the review feedback and submit anyway.

## Proposed Solution
Enhance the internal `request_code_review` agent or wrapper script to be fully "Foundry-aware".
When a code review is requested, the system should first analyze the frontmatter of the currently active node and its immediate children. If the node qualifies for an Empty PR submission (e.g., all child tasks are archived and the only changes are to Markdown checkboxes), the code review validation should automatically bypass the standard "no patch found" error and authorize the merge.

This brings deterministic rule evaluation to the CI/CD pipeline, bridging the gap between Git operations and Foundry lifecycle semantics.

## Impact
- **Reduced False Positives:** Agents will no longer be erroneously blocked by generic patch requirements.
- **Improved Pipeline Speed:** Eliminates unnecessary retry loops.
- **Better Developer Experience:** Agents won't have to be explicitly instructed via prompt to ignore the `request_code_review` tool's false negatives.
