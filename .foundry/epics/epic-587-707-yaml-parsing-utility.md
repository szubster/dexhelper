---
id: epic-587-707-yaml-parsing-utility
type: EPIC
title: Core YAML Parsing Utility Implementation
status: READY
owner_persona: story_owner
created_at: '2026-10-18'
updated_at: '2026-10-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-530-587-strict-frontmatter-yaml-parsing-rule
tags: []
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Core YAML Parsing Utility Implementation

## Overview
Implement a strict, reliable YAML frontmatter parsing utility (e.g., `parseFoundryNode`) located in `.github/scripts/` to centralize extraction and prevent false-positive regex matches across `.foundry` markdown files.

## Acceptance Criteria
- [ ] Implement `parseFoundryNode` utility in `.github/scripts/`.
- [ ] Ensure parsing correctly isolates YAML frontmatter and avoids scanning the markdown body.
- [x] Generate an exclusive STORY dedicated to Integration and E2E Verification.
- [ ] story-707-731-implement-yaml-parsing-utility
- [ ] story-707-732-yaml-parsing-integration-e2e
