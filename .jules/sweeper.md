# Sweeper Journal

* When using static analysis tools like `knip` to find unused exports, you must explicitly verify candidates using a global repository search (e.g., `grep`) before removal to ensure they are not implicitly required by tests, mocks, or CI scripts.
* Scheduled or foundry agents can dynamically spawn new IDEA, TASK, RESEARCH, or ADR nodes in the `.foundry/` directory to handle larger architectural changes or missing context, ensuring the `owner_persona` is set to the appropriate role (e.g., 'researcher' for RESEARCH).
* Sweeper PRs must use the title format `🧹 [description]` and include `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result` in the body.

- If `pnpm install` hangs or fails during git hook setup (e.g., `lefthook install`), run `git config --unset-all --global core.hooksPath` before retrying the installation.

* **CRITICAL - WIP PR Rejections:** When tasked with sweeping dead code or unused files via tools like Knip, you MUST double-check if the identified files belong to a feature that is currently Work In Progress (WIP). Do not blindly delete files just because Knip flags them. If you delete WIP files and get rejected, you must apologize, acknowledge the mistake, and submit an empty PR instead of modifying the codebase.
## 2024-XX-XX: Configuration Maintenance
When removing files that you suspect are dead code (e.g., ETL scripts or cloud functions), strictly verify if they are explicitly mentioned in configuration files (like `knip.json`) or imported dynamically. Tooling configuration files should be updated to properly ignore external facing code like Cloudflare Pages Functions (`functions/**`), rather than incorrectly deleting the code under the assumption it is unused.
