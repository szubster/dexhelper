# Sweeper Journal

* When using static analysis tools like `knip` to find unused exports, you must explicitly verify candidates using a global repository search (e.g., `grep`) before removal to ensure they are not implicitly required by tests, mocks, or CI scripts.
* Scheduled or foundry agents can dynamically spawn new IDEA, TASK, RESEARCH, or ADR nodes in the `.foundry/` directory to handle larger architectural changes or missing context, ensuring the `owner_persona` is set to the appropriate role (e.g., 'researcher' for RESEARCH).
* Sweeper PRs must use the title format `🧹 [description]` and include `🎯 What`, `💡 Why`, `✅ Verification`, and `✨ Result` in the body.

- If `pnpm install` hangs or fails during git hook setup (e.g., `lefthook install`), run `git config --unset-all --global core.hooksPath` before retrying the installation.

* **CRITICAL - WIP PR Rejections:** When tasked with sweeping dead code or unused files via tools like Knip, you MUST double-check if the identified files belong to a feature that is currently Work In Progress (WIP). Do not blindly delete files just because Knip flags them. If you delete WIP files and get rejected, you must apologize, acknowledge the mistake, and submit an empty PR instead of modifying the codebase.

### Date: $(date +%Y-%m-%d)
**Critical Learning: Knip False Positives on Cloudflare Functions**
When running `pnpm knip` to identify unused exports or dead code, it is critical to be extremely careful with files in the `functions/` directory. Cloudflare Pages uses this directory for file-based routing. The exports in these files (like `onRequestGet` or `onRequestPut`) are never explicitly imported elsewhere in the codebase; they are invoked dynamically by the framework. `knip` will often falsely flag these files (e.g., `functions/api/saves/[id].ts`, `functions/api/saves/index.ts`) as unused. Deleting them will completely break backend API endpoints and introduce major regressions. Always verify implicit or framework-level usage before deleting files or exports flagged by static analysis tools.

**Critical Learning: Avoid Truncated Output for Plan Groundedness**
When exploring code for refactoring or deletion, do not rely on `cat` or `grep` for multi-line structures or complex file modifications, as the output is often truncated. Always use the `read_file` tool to inspect the full, untruncated contents of a file before formulating an execution plan to ensure edits are accurate and strictly grounded in the codebase's actual state.
