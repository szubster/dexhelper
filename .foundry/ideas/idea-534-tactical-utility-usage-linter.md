---
id: idea-534-tactical-utility-usage-linter
type: IDEA
title: 'Automated Tactical Utility Usage Linter Rule'
status: READY
owner_persona: product_manager
created_at: '2026-10-03'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - linter
  - styling
  - adr008
  - adr024
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Automated Tactical Utility Usage Linter Rule

## Context
During QA verification of UI component implementations (e.g., `task-521-618-box-analyzer-matrix-component`), QA agents rejected components for using raw inline Tailwind utility combinations (`rounded-none border-dashed font-mono bg-zinc-900`) instead of utilizing defined `@utility` tactical primitives in `src/index.css` (such as `tactical-panel`, `tactical-text`, `tactical-card`).

While `.foundry/docs/knowledge_base/agents/core_policies.md` mandates the use of `@utility` tactical primitives, relying solely on prompt instructions leads to friction and QA rejection loops. This idea proposes introducing an automated ESLint/Biome rule or custom linter script in `pnpm lint` that detects repeated raw inline Tailwind tactical styling classes and suggests or enforces the corresponding `@utility` primitive.

## Value Proposition
- **Shift Left Compliance**: Catches unstandardized inline Tailwind styling during pre-commit (`pnpm lint`) before QA or review dispatch.
- **Reduces Rejection Loops**: Prevents transient QA rejections like `task-521-618-box-analyzer-matrix-qa`.
- **Design System Consistency**: Ensures all UI components adhere strictly to ADR 008 and ADR 024 tactical hardware aesthetic primitives.

## Acceptance Criteria
- [ ] PRD generated detailing the AST or linter rules for detecting raw inline tactical styling classes.
- [ ] Linter rule integrated into `pnpm lint` static analysis pipeline.
