---
id: task-010-024-enforce-persona-permissions
type: TASK
title: "Implement Pre-Commit Hook for Node Creation Permissions"
status: PENDING
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-010-persona-permissions-matrix.md
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
notes: ""
---

# Implement Pre-Commit Hook for Node Creation Permissions

## Goal
Enforce node creation permissions per persona using a pre-commit hook.

## Context
As defined in the story `.foundry/stories/story-010-persona-permissions-matrix.md`, we need to implement the strict permissions model for node creation.

## Blueprint / Implementation Details
1. **Create the validation script:**
   - Create `.github/scripts/foundry-permissions-check.ts`
   - It should accept a list of staged files as arguments.
   - For each staged file in `.foundry/`, parse its YAML frontmatter. If the file is newly created, it needs to be validated against the persona creating it.
   - To determine the "creating persona" locally during a session, the script should read the `parent` file referenced in the new node's frontmatter. The `owner_persona` of that parent node is the persona currently active and creating the child node.
   - For `IDEA` nodes without a parent, ensure the system allows creation by `architect` or `product_manager`.
   - Permissions Matrix:
     - `architect` can create `TASK`, `ADR`, and `IDEA` nodes.
     - `tech_lead` can create `TASK` and `ADR` nodes.
     - `story_owner` can create `STORY` and `EPIC` nodes.
     - `product_manager` can create `IDEA`, `PRD`, and `EPIC` nodes.
   - The script should exit with `1` if an unauthorized node creation is detected, printing a descriptive error message.

2. **Integrate with `lefthook.yml`:**
   - Add a `permissions-check` command to the `pre-commit` phase in `lefthook.yml`.
   - The command should be something like `pnpm exec tsx .github/scripts/foundry-permissions-check.ts {staged_files}` or using `node --experimental-strip-types` if it's run with Node >= 24 as a native ES module without `tsx`. Follow existing script conventions in `.github/scripts/`.

3. **Orchestrator check:**
   - Consider adding the same validation to `.github/scripts/foundry-orchestrator.ts` during its parsing phase to provide a secondary safety net or warning.

## Acceptance Criteria
- [ ] A script exists to validate newly created node files against the allowed permissions matrix.
- [ ] The script accurately resolves the active persona using the `parent` node reference.
- [ ] `lefthook.yml` is updated to run this check on pre-commit.
- [ ] Appropriate tests or safeguards ensure that valid nodes are committed and invalid node creations fail the commit.
