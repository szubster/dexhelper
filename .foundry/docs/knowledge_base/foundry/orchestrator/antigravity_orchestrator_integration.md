# Antigravity Orchestrator Integration

## Context & Purpose
As the Jules API deprecation progresses, Foundry tasks are transitioned to native dispatching via the Antigravity local CLI (`agentapi`), while preserving existing Jules CI actions during the transition window.

## Architecture & Conventions
- **Package**: `packages/antigravity-orchestrator/`
- **CLI Commands**:
  - `pnpm antigravity dispatch [node-id] [--model=<pro|flash>] [--git|--push] [--dry-run]`
  - `pnpm antigravity reconcile [--git|--push] [--dry-run]`
  - `pnpm antigravity assign <node-id> [persona] [--git|--push] [--dry-run]`
  - `pnpm antigravity status`
- **Model Tiering & Automatic Fallback**:
  - Complex personas (`architect`, `architect_visionary`, `tech-lead`, `tech_lead`, `coder`) default to `pro`.
  - All other personas (`researcher`, `qa`, `epic_planner`, etc.) default to `flash`.
  - When `pro` encounters rate limits, capacity constraints, or errors, it automatically falls back to `flash`.
- **Session IDs**:
  - Format: `agy-<conversation_id>` (or `agy-human-<timestamp>` for human assignments).
- **Heartbeat & Session API Bypass**:
  - In `foundry-heartbeat.ts` and `session-api.ts`, session IDs starting with `agy-` are treated identically to `owner_persona: human`, bypassing Jules API polling, zombie detection, and deletion calls.
  - In `dag-utils.ts`, `ACTIVE_SESSIONS.md` renders `Antigravity (\`agy-...\`)` for Antigravity sessions instead of dead Jules links.
- **PR Discovery & Lifecycle Reconciler**:
  - Agent instructions enforce branch `antigravity/<node-id>`, PR title `[<node-id>] <title>`, and checking off completed acceptance criteria checkboxes (`- [x]`).
  - Reconciler matches PRs by direct `node.pr_number`, branch name, bracketed title, prefix title, or body references case-insensitively.
  - Merged PRs transition nodes to `COMPLETED` and record `pr_number`.
  - Closed unmerged PRs increment `rejection_count` and resurrect to `READY` (or `FAILED` if `rejection_count >= 3`), clearing `jules_session_id`.
