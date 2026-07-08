1. Use `replace_with_git_merge_diff` to fix the `parseSecretBaseRecord` in `src/engine/gen3/secretBase/parser.ts` to use different offsets and lengths for Emerald (`TRAINER_NAME_LENGTH = 8`, `TRAINER_ID_OFFSET = 10`) versus Ruby/Sapphire (`TRAINER_NAME_LENGTH = 7`, `TRAINER_ID_OFFSET = 9`). Note that both have `TRAINER_ID_LENGTH = 4`. The party offset remains 0x34 for both.
2. Use `read_file` to verify the updates.
3. Use `run_in_bash_session` to execute `pnpm test`.
4. Call `request_code_review`.
