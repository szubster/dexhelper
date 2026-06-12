## 2026-06-12
- DAG ID Strictness: When setting the `depends_on` or `parent` fields in node frontmatter, strictly use exact Node IDs without file extensions (e.g., `story-078-116-parse-rejection-count`), and never use repo-relative file paths. This is a critical requirement for the DAG parser.
- Scratchpad Cleanup Rule: Always remember to clean up developer scratchpad scripts created during a session (like `replace.sh` or `generate.sh`) before completing pre-commit steps to prevent polluting the repository.
