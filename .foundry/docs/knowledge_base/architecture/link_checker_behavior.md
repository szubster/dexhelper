# Link Checker Behavior

The link checker (`scripts/check-links.ts`) is used to validate links in markdown files, particularly within the `.foundry` directory.

## Resolution Logic

- **Frontmatter Paths**: Always resolved relative to the repository root.
- **Inline Links**: Resolved relative to the file containing the link. If not found, they are also checked relative to the repository root. This allows for flexible link styles, including repo-root-relative links like `.foundry/stories/...`.

## Usage

The link checker is integrated into the pre-commit hook via `lefthook.yml`. It can be run manually as:
`node --experimental-strip-types scripts/check-links.ts [files...]`
