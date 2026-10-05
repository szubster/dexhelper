---
id: story-088-637-vite-jsonl-plugin-update
type: STORY
title: Update Vite Plugin for JSONL Data
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-30'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-049-088-vite-plugin-jsonl-integration
tags:
  - build
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
confidence_score: null
---

# Update Vite Plugin for JSONL Data

## Background
The application now generates `moves.jsonl` and `items.jsonl` containing extracted game data. We need to update our Vite build pipeline to correctly process and package these `.jsonl` files so they can be consumed by the client side.

## Acceptance Criteria
- [x] task-637-641-vite-jsonl-plugin-impl
- [x] task-637-642-vite-jsonl-plugin-qa
- [x] Implement or update the Vite plugin to properly resolve and bundle `.jsonl` files.
- [x] Ensure that the packaged JSONL files are served correctly in development and production environments.
