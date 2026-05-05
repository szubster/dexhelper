---
id: idea-016-precommit-schema-validation
type: IDEA
title: 'DAG Feature: Pre-commit Schema Validation'
status: "PENDING"
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

# Idea: Pre-commit Schema Validation

## Context
Currently, the DAG orchestrator handles schema validation during its dispatch cycle, skipping malformed nodes and logging warnings. This allows malformed nodes to enter the repository, cluttering history and requiring asynchronous detection.

## Proposal
Expand the existing pre-commit hook (which currently checks links) to perform full YAML frontmatter schema validation against `schema.md` (e.g., checking `owner_persona`, `status`, `type` enums). This will prevent malformed nodes from ever entering the repository, catching errors at commit time and providing immediate feedback to agents or humans.

## Next Steps
- [ ] Convert this idea into a detailed PRD defining the pre-commit hook expansion.
