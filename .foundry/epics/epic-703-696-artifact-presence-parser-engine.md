---
id: epic-703-696-artifact-presence-parser-engine
type: EPIC
title: Artifact Presence Validator - Parser Engine
status: ACTIVE
owner_persona: story_owner
created_at: '2026-10-18'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '12027668150763017296'
pr_number: null
parent: prd-537-703-artifact-presence-precommit-validator
tags:
  - testing
  - linter
  - validation
priority: 80
rejection_reason: ''
---

# EPIC: Artifact Presence Validator - Parser Engine

## Description
Develop the parser engine that extracts expected deliverable file paths from the active Foundry TASK node's markdown. It needs to read the frontmatter to determine the task context and parse the markdown body, specifically targeting the acceptance criteria and explicitly listed deliverables.

## Acceptance Criteria
- [x] STORY breakdown generated.
- [ ] story-696-734-artifact-frontmatter-parser
- [ ] story-696-735-artifact-markdown-body-parser
- [ ] story-696-736-artifact-parser-integration-e2e
