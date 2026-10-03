1. Draft the implementation TASK markdown file `.foundry/tasks/task-638-652-client-db-jsonl-loader-db.md` to update `pokeDB` with `getItemsBulk` using a bash heredoc payload.
2. Verify the new implementation TASK markdown file `.foundry/tasks/task-638-652-client-db-jsonl-loader-db.md` was created successfully using `cat .foundry/tasks/task-638-652-client-db-jsonl-loader-db.md`.
3. Draft the implementation TASK markdown file `.foundry/tasks/task-638-653-client-db-jsonl-loader-dex.md` to update `dexDataLoader` with `moves` and `items` loaders using a bash heredoc payload.
4. Verify the new implementation TASK markdown file `.foundry/tasks/task-638-653-client-db-jsonl-loader-dex.md` was created successfully using `cat .foundry/tasks/task-638-653-client-db-jsonl-loader-dex.md`.
5. Draft the QA verification TASK markdown file `.foundry/tasks/task-638-654-client-db-jsonl-loader-qa.md` to verify the implementations using a bash heredoc payload.
6. Verify the new QA verification TASK markdown file `.foundry/tasks/task-638-654-client-db-jsonl-loader-qa.md` was created successfully using `cat .foundry/tasks/task-638-654-client-db-jsonl-loader-qa.md`.
7. Append the newly generated child TASK IDs as unchecked checkboxes to the parent `.foundry/stories/story-088-638-client-db-jsonl-loader.md` file using `replace_with_git_merge_diff`.
8. Verify the parent `.foundry/stories/story-088-638-client-db-jsonl-loader.md` file was modified correctly using `cat .foundry/stories/story-088-638-client-db-jsonl-loader.md`.
9. Run core project verification commands (`pnpm lint` and `pnpm test`).
10. Delete `plan.md`.
11. Verify the deletion of `plan.md` using `ls plan.md || true`.
12. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
13. Use the `submit` tool to open a PR.
