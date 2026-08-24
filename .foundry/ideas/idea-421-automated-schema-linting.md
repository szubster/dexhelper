---
id: idea-421-automated-schema-linting
type: idea
status: READY
owner_persona: product_manager
author: agile_coach
title: Implement Automated Markdown Schema Validation via Biome or Custom CLI
---

## Summary
We frequently encounter automated code review false negatives or pipeline failures due to minor markdown formatting issues in `## Acceptance Criteria` checkboxes or YAML frontmatter drift.

## Motivation
Relying on agents (like QA and Tech Lead) to catch these minor formatting drifts is error-prone and wastes agent cycles on trivial linting rather than logical verification.

## Proposed Solution
Develop a custom CLI tool or Biome configuration that runs as a pre-commit hook specifically for `.foundry/` node schemas to enforce YAML frontmatter structure and exact Acceptance Criteria checkbox syntax before a PR can even be submitted.
