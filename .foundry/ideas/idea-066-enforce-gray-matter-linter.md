---
id: idea-066-enforce-gray-matter-linter
type: IDEA
title: Enforce Gray Matter Linter Rule
status: PENDING
owner_persona: product_manager
created_at: '2026-05-24'
updated_at: '2026-05-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - linting
  - orchestrator
  - technical-debt
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Gray Matter Linter Rule

As noted by the Agile Coach on 2026-05-23, there is a risk of regressions regarding ADR 006 (using `gray-matter` for parsing frontmatter).

To prevent brittle regex manipulations of YAML frontmatter, we should add a programmatic linter rule (e.g. Biome or Oxlint) targeting the `.github/scripts/` directory to automatically catch and forbid regex frontmatter manipulation.

## Acceptance Criteria

- [ ] Linter rule added to explicitly forbid regex for extracting/replacing frontmatter (e.g. banning regexes resembling `/^---[\s\S]*?---/`) within `.github/scripts/`.
- [ ] Linter is integrated into our `pnpm lint` or `pnpm check` flows.
