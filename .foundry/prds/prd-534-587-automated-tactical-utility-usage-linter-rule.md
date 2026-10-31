---
id: prd-534-587-automated-tactical-utility-usage-linter-rule
type: PRD
title: 'PRD: Automated Tactical Utility Usage Linter Rule'
status: PENDING
owner_persona: auditor
created_at: '2026-10-16T18:34:13.959Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-534-tactical-utility-usage-linter
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

# PRD: Automated Tactical Utility Usage Linter Rule

## 1. Goal
Introduce an automated linter rule (e.g., custom Biome or ESLint rule, or standalone script) into the `pnpm lint` static analysis pipeline to detect and prevent the use of repeating raw inline Tailwind classes that should instead be standardized using `@utility` tactical primitives (like `tactical-panel`, `tactical-text`).

## 2. Context & Problem Statement
UI components are repeatedly rejected during QA verification because developers use inline combinations of Tailwind utilities (e.g., `rounded-none border-dashed font-mono bg-zinc-900`) rather than the predefined `@utility` primitives specified in `src/index.css` (per ADR 008 and ADR 024). Relying solely on human QA or text prompts creates friction, slows down PR merges, and results in transient failure loops.

Automating this check with a custom linting rule or script shifts compliance left, catching styling violations immediately during `pnpm lint` before PRs are created or QA dispatch begins.

## 3. Scope
- Develop a static analysis script or custom AST/linter rule capable of scanning `.tsx`, `.ts`, and `.jsx` files for forbidden raw Tailwind combinations.
- Integrate this linter into the main `pnpm lint` workflow.
- Ensure the linter outputs actionable messages suggesting the correct `@utility` equivalent.

### Exclusions
- Do not automatically rewrite the code (`--fix` is not strictly required for MVP, though a descriptive error message is).
- Do not migrate existing components in this PRD (that is handled under a separate migration effort, if needed).

## 4. Key Workflows / Usage
- A developer modifies a component and adds `className="rounded-none border-dashed font-mono"`.
- Upon running `pnpm lint` or during pre-commit checks, the linter scans the file.
- The linter throws an error: `"Error: Avoid using raw inline tactical utility combination 'rounded-none border-dashed font-mono'. Use the '@utility tactical-panel' primitive instead."`
- The developer fixes the code, and `pnpm lint` passes.

## 5. Technical Requirements
- **Integration**: Must run as part of `pnpm lint`.
- **Target Files**: `src/**/*.tsx`, `src/**/*.ts` (or relevant frontend paths).
- **Rule Definitions**:
  - Should map specific combinations of classes to their respective `@utility` counterparts (e.g., `rounded-none` + `border-dashed` -> check if it matches a `tactical-panel` or similar primitive).
  - Can be implemented via a custom ESLint plugin, a Biome script (if supported), or a standalone Node.js AST parser script using tools like `ts-morph` or regex parsing if AST is overkill for MVP.

## 6. Acceptance Criteria
- [x] An Epic is generated outlining the breakdown of creating the linter rule/script.
- [ ] epic-587-693-tactical-utility-linter
