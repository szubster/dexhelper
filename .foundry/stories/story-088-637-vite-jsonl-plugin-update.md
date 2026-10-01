---
id: story-088-637-vite-jsonl-plugin-update
type: STORY
title: Update Vite Plugin for JSONL Data
status: READY
owner_persona: tech_lead
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: epic-049-088-vite-plugin-jsonl-integration
priority: 50
confidence_score: null
tags:
  - build
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Vite Plugin for JSONL Data

## Background
The application now generates `moves.jsonl` and `items.jsonl` containing extracted game data. We need to update our Vite build pipeline to correctly process and package these `.jsonl` files so they can be consumed by the client side.

## Acceptance Criteria
- [ ] task-637-641-vite-jsonl-plugin-impl
- [ ] task-637-642-vite-jsonl-plugin-qa
- [ ] Implement or update the Vite plugin to properly resolve and bundle `.jsonl` files.
- [ ] Ensure that the packaged JSONL files are served correctly in development and production environments.
