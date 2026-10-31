---
id: story-707-731-implement-yaml-parsing-utility
type: STORY
title: Implement YAML Parsing Utility
status: READY
owner_persona: tech_lead
created_at: '2026-10-27'
updated_at: '2026-10-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-587-707-yaml-parsing-utility
tags: []
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Implement YAML Parsing Utility

## Overview
Implement a strict, reliable YAML frontmatter parsing utility (e.g., `parseFoundryNode`) located in `.github/scripts/` to centralize extraction and prevent false-positive regex matches across `.foundry` markdown files.

## Acceptance Criteria
- [ ] Implement `parseFoundryNode` utility in `.github/scripts/`.
- [ ] Ensure parsing correctly isolates YAML frontmatter and avoids scanning the markdown body.
