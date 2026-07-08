# Sweeper Journal

* When using static analysis tools like `knip` to find unused exports, you must explicitly verify candidates using a global repository search (e.g., `grep`) before removal to ensure they are not implicitly required by tests, mocks, or CI scripts.
* Scheduled or foundry agents can dynamically spawn new IDEA, TASK, RESEARCH, or ADR nodes in the `.foundry/` directory to handle larger architectural changes or missing context, ensuring the `owner_persona` is set to the appropriate role (e.g., 'researcher' for RESEARCH).
* Sweeper PRs must use the title format `🧹 [description]` and include `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result` in the body.

- If `pnpm install` hangs or fails during git hook setup (e.g., `lefthook install`), run `git config --unset-all --global core.hooksPath` before retrying the installation.
If `pnpm lint` or `biome check` fails due to formatting issues, use `pnpm biome format --write <filepath>` to resolve them.
