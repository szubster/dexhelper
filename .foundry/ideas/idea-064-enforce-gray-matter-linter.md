---
id: idea-064-enforce-gray-matter-linter
type: IDEA
title: Enforce gray-matter Usage via Linter Rule
status: PENDING
owner_persona: product_manager
created_at: "2026-05-23"
updated_at: "2026-05-23"
depends_on: []
jules_session_id: null
parent: null
tags:
  - architecture
  - tech-debt
  - dx
rejection_count: 0
rejection_reason: ""
notes: "Proposed by Agile Coach based on historical regex violations."
---

# Enforce gray-matter Usage via Linter Rule

## Context
ADR 006 mandates the use of `gray-matter` for parsing and stringifying markdown frontmatter to avoid brittle regex operations. However, there is currently no programmatic enforcement, leading to regressions and bugs where agents or scripts use custom regex against `.md` files.

## Proposal
Create a custom ESLint or Biome linter rule, specifically targeting `.ts` scripts in `.github/scripts/`, that flags and prevents the use of `.replace()` or `RegExp` when matching or mutating markdown frontmatter strings.

## Expected Impact
- Strict programmatic enforcement of ADR 006.
- Prevents silent failures and corrupted markdown files during node transitions.
- Better DX by catching anti-patterns during CI.
