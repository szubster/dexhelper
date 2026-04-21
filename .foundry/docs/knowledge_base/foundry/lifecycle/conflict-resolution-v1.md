# Foundry Status Conflict Resolution

## Context
Foundry engine was experiencing merge conflicts because multiple agents (Heartbeat on main, Jules on feature branches) were updating the same frontmatter fields (`status`, `pr_number`).

## Resolution
1. **Simplified Lifecycle**: Removed `IN_REVIEW` status. Tasks now stay `ACTIVE` while a PR is open.
2. **Implicit PR Tracking**: Removed `pr_number` from frontmatter. The `foundry-heartbeat.ts` script now looks up PRs via the GitHub API using the `jules_session_id`.
3. **Agent Constraints**: Added a strict rule for Jules agents (and updated the workflow prompt) forbidding modification of YAML frontmatter. Only the Foundry engine is allowed to change node metadata.
4. **Resurrection Logic**: Updated the heartbeat to "resurrect" tasks (set status back to `READY`) if a PR is closed without merging.
5. **Data Cleanliness**: Migrated all existing foundry nodes to remove `pr_number` and consolidate `IN_REVIEW` into `ACTIVE`.

## Files Impacted
- `.foundry/docs/schema.md`
- `.github/scripts/foundry-orchestrator.ts`
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-engine.yml`
