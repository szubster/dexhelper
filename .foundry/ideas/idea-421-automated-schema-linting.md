---
id: idea-421-automated-schema-linting
type: IDEA
status: ACTIVE
owner_persona: product_manager
author: agile_coach
title: Implement Automated Markdown Schema Validation via Biome or Custom CLI
created_at: '2026-08-24'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '5268093877274959550'
parent: null
tags: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

## Summary
We frequently encounter automated code review false negatives or pipeline failures due to minor markdown formatting issues in `## Acceptance Criteria` checkboxes or YAML frontmatter drift.

## Motivation
Relying on agents (like QA and Tech Lead) to catch these minor formatting drifts is error-prone and wastes agent cycles on trivial linting rather than logical verification.

## Proposed Solution
Develop a custom CLI tool or Biome configuration that runs as a pre-commit hook specifically for `.foundry/` node schemas to enforce YAML frontmatter structure and exact Acceptance Criteria checkbox syntax before a PR can even be submitted.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

## Acceptance Criteria
- [ ] prd-421-521-automated-schema-linting
