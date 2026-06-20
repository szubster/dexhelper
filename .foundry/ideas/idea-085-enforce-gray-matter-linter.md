---
id: idea-085-enforce-gray-matter-linter
type: IDEA
title: Enforce Gray-Matter Linter for Scripts
status: PENDING
owner_persona: product_manager
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - tooling
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Gray-Matter Linter for Scripts

## Problem
Despite ADR-006 mandating the use of `gray-matter` for parsing and modifying YAML frontmatter across all programmatic tools, instances of direct regex replacements are occasionally re-introduced (e.g., in `foundry-heartbeat.ts` and `foundry-active.ts`). This regression re-introduces brittle bugs where whitespace, quotes, or trailing characters cause the orchestrator to fail silently or crash.

## Idea
We need to enforce ADR-006 programmatically to prevent regressions. We should create a custom linter rule (e.g. using `eslint-plugin-local-rules`, Biome custom rules, or a simple custom script in `scripts/lint-frontmatter.ts`) that scans all TypeScript files within the `.github/scripts/` directory.

The linter must fail the CI build if it detects any regex usage specifically attempting to match or replace `---` frontmatter blocks or `status:`, `rejection_count:`, etc., requiring the author to use `gray-matter` functions instead.

## Value Proposition
- Eliminates the recurring technical debt of tracking down frontmatter parsing bugs.
- Hard-enforces an ADR at the CI level, offloading the cognitive burden from reviewers and agents.

## Acceptance Criteria
- [ ] Investigate the best approach for a custom linter rule in our current tech stack (Biome vs standalone TS script).
- [ ] Implement the linter rule targeting `.github/scripts/`.
- [ ] Integrate the linter rule into the `pnpm lint` or `pnpm test` CI pipeline.
- [ ] Ensure the linter correctly flags a deliberate regex violation in a test file.
