# Jules Journal: Coder
## Auto-Merge Empty PRs (2026-04-23)
- **What was changed**: Replaced the `auto-close-empty-pr.yml` GitHub workflow with `auto-merge-empty-pr.yml`.
- **Why**: The orchestrator was experiencing problems with empty PRs being closed instead of merged, preventing correct progression of the node state and creating a storm of open/closed PRs.
- **Pattern/Learning**: Empty PRs should be merged using `gh pr merge --auto --squash` rather than closed to trigger the orchestrator's success flow correctly when the `EMPTY PR POLICY` is applied.
