---
id: task-113-165-define-tactical-utilities-impl
type: TASK
title: Define tactical-panel and tactical-card utilities
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: '7599354570018371525'
pr_number: null
parent: story-074-113-define-tactical-panel-and-card
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Define tactical-panel and tactical-card utilities

## Context
As dictated by ADR 024 and PRD 071, we are migrating to Tailwind v4 and leveraging the `@utility` directive. The application enforces a strict "tactical hardware" aesthetic (sharp edges `rounded-none`, dashed borders `border-dashed`, monospaced fonts `font-mono`).

We need to define `@utility tactical-panel` and `@utility tactical-card` in `src/index.css` to consolidate common styling.

Based on analysis of `TacticalPanel` and `TacticalCard` in `src/components/`, the target utilities should be:

```css
@utility tactical-panel {
  @apply overflow-hidden rounded-none border border-dashed bg-zinc-900/50 text-zinc-100 font-mono transition-all duration-300;
}

@utility tactical-card {
  @apply flex flex-col rounded-none border border-dashed bg-zinc-950 p-4 font-mono transition-all duration-500 hover:scale-[1.02] active:scale-[0.98];
}
```

## Instructions for Coder
1. Add the `@utility tactical-panel` and `@utility tactical-card` to `src/index.css` in the "Tactical Primitives (@utility definitions)" section.
2. Note: Do not remove or refactor `TacticalCard.tsx` or `TacticalPanel.tsx` in this task yet, as that will be handled in a follow-up phase. This task is purely for defining the base utilities in `src/index.css`.

## Failure Constraints & Empty PR Policy
* **CRITICAL**: Do NOT modify the YAML frontmatter unless explicitly changing the status to FAILED or CANCELLED with a `rejection_reason`.
* **CRITICAL**: If the target artifacts are already completely implemented, you MUST check all Acceptance Criteria checkboxes (`- [x]`) before submitting an empty PR. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.

## Acceptance Criteria
- [ ] Appropriate `@utility tactical-panel` and `@utility tactical-card` primitives are defined in `src/index.css`.
- [ ] Tailwind v4 formatting and structure is respected.
