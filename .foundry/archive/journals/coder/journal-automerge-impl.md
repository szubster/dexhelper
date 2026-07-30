# Coder Journal: Enable Automerge for Journal Entries

- **When manually parsing git diff outputs (e.g., in `.github/scripts/analyze-diff.js`), explicitly skip git extended header lines** (e.g., `new file mode`, `deleted file mode`, `rename from`, `rename to`, `similarity index`, `old mode`, `new mode`) to prevent the parser from falsely rejecting file creations, deletions, or renames.
- **Strictly adhere to explicit directory/file path scope constraints in task specifications.** Do not silently expand the scope to undocumented paths (e.g., adding `.jules/` when only `.foundry/journals/` is requested). This violates explicit negative constraints and poses security/workflow risks by bypassing code reviews for unauthorized directories.
