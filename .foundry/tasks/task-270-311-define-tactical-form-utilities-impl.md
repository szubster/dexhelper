---
id: task-270-311-define-tactical-form-utilities-impl
type: TASK
title: Define Tactical Form and Text Utilities (Impl)
status: PENDING
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-123-270-define-tactical-form-utilities
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Define Tactical Form and Text Utilities

## Context
As per ADR 024, we are migrating to Tailwind v4 and need to define our tactical hardware aesthetic using the `@utility` directive in `src/index.css`. This task focuses on form and text elements.

## Requirements
1.  **File Modification**: Modify `src/index.css`.
2.  **`tactical-input`**: Define a utility for text inputs and similar form elements. It must include sharp edges (`rounded-none`), appropriate tactical borders (e.g., `border-zinc-800`), and a dark background (e.g., `bg-zinc-950`).
3.  **`tactical-focus`**: Define a utility for focused states. It should override the default browser outline and provide a distinct tactical focus ring (e.g., a colored dashed border or outline).
4.  **`tactical-text`**: Define a utility for standard tactical text. It must use a monospaced font (`font-mono`) and an appropriate text color (e.g., `text-zinc-400`).
5.  **Strict Compliance**: Do not modify components yet. Just define the utilities.

## Verification Steps
1. Verify that `src/index.css` contains `@utility tactical-input`. It must enforce sharp edges (`rounded-none`).
2. Verify that `src/index.css` contains `@utility tactical-focus`.
3. Verify that `src/index.css` contains `@utility tactical-text`. It must enforce a monospaced font (`font-mono`).
4. Ensure no components were accidentally broken by these definitions. Perform a self-verification.

## Acceptance Criteria
- [ ] `tactical-input` is defined in `src/index.css` with sharp edges and dark background.
- [ ] `tactical-focus` is defined in `src/index.css`.
- [ ] `tactical-text` is defined in `src/index.css` using `font-mono`.

## Blueprint Notes for Coder
- **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task (e.g., if you find it already implemented), you MUST check off all Acceptance Criteria checkboxes before submitting.
