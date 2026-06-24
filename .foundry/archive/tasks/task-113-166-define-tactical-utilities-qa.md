---
id: task-113-166-define-tactical-utilities-qa
type: TASK
title: QA - Verify tactical-panel and tactical-card utilities
status: COMPLETED
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-16'
depends_on: []jules_session_id: null
pr_number: null
parent: story-074-113-define-tactical-panel-and-card
tags:
  - qa
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Task: Verify tactical-panel and tactical-card utilities

## Context
The Coder has been tasked with defining `@utility tactical-panel` and `@utility tactical-card` in `src/index.css` according to ADR 024. These utilities must match the application's "tactical hardware" aesthetic.

## Instructions for QA
1. Check `src/index.css` to verify that both `@utility tactical-panel` and `@utility tactical-card` exist.
2. Verify that they use the `@apply` directive to consolidate the core classes (e.g. `rounded-none`, `border-dashed`, etc.).
3. Verify that the syntax correctly follows Tailwind v4.

## Failure Constraints & Empty PR Policy
* **CRITICAL**: Do NOT modify the YAML frontmatter unless explicitly changing the status to FAILED or CANCELLED with a `rejection_reason`.
* **CRITICAL**: If the target artifacts are already verified, you MUST check all Acceptance Criteria checkboxes (`- [x]`) before submitting an empty PR. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.

## Acceptance Criteria
- [x] Confirmed that `@utility tactical-panel` is properly defined in `src/index.css`.
- [x] Confirmed that `@utility tactical-card` is properly defined in `src/index.css`.
- [x] Confirmed the implementation adheres to the aesthetic requirements defined in ADR 024.
