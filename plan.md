1. Use `replace_with_git_merge_diff` to update `.foundry/tasks/task-348-100-gen3-ash-ui-impl.md` to trigger a transient rejection, setting `status: FAILED` and incrementing `rejection_count`.
2. Document the failure in a QA journal.
3. Run core verification commands (`pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e`) to ensure a clean system state.
4. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
5. Use the `submit` tool to create the Pull Request with an appropriate title and body.
