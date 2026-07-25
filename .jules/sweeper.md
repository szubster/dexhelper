# Sweeper Journal

* When using static analysis tools like `knip` to find unused exports, you must explicitly verify candidates using a global repository search (e.g., `grep`) before removal to ensure they are not implicitly required by tests, mocks, or CI scripts.
* Scheduled or foundry agents can dynamically spawn new IDEA, TASK, RESEARCH, or ADR nodes in the `.foundry/` directory to handle larger architectural changes or missing context, ensuring the `owner_persona` is set to the appropriate role (e.g., 'researcher' for RESEARCH).
* Sweeper PRs must use the title format `🧹 [description]` and include `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result` in the body.

- If `pnpm install` hangs or fails during git hook setup (e.g., `lefthook install`), run `git config --unset-all --global core.hooksPath` before retrying the installation.

* **CRITICAL - WIP PR Rejections:** When tasked with sweeping dead code or unused files via tools like Knip, you MUST double-check if the identified files belong to a feature that is currently Work In Progress (WIP). Do not blindly delete files just because Knip flags them. If you delete WIP files and get rejected, you must apologize, acknowledge the mistake, and submit an empty PR instead of modifying the codebase.

* When using tools like `knip` to identify unused code or dead exports, always explicitly verify candidates using global search (`grep`) before deletion to prevent unintentionally removing dynamically loaded dependencies (such as Cloudflare Pages API functions in `functions/` or implicitly required test files). If such dynamically loaded files are identified by Knip, do not delete them; instead, add them to the `ignore` array in `knip.json`.
