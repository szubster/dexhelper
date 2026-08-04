# Infras Journal - Session $(date +"%Y-%m-%d-%H-%M-%S")

## Critical Learnings
- **Tooling configuration context**: Discovered that the `.bundlemonrc.json` configuration was not using compression (`"defaultCompression": "none"`), which resulted in misleadingly large bundle size reports compared to what users actually download.
- **Action Taken**: Configured `.bundlemonrc.json` to use `"gzip"` compression and meticulously adjusted all file threshold `maxSize` rules downward to reflect realistic post-compression network sizes.
- **Vite Build Output Analysis**: When analyzing Vite's build logs or JSON files like `.bundlemonrc.json`, standard bash tools like `cat` may truncate output. Always use targeted extraction tools like `jq` (e.g. `jq '.files' .bundlemonrc.json`) or `grep` combined with `tail` (e.g. `grep -E 'dist/' build.log | tail -n 20`) to fetch complete, untruncated arrays or lists before making assumptions about paths or sizes.
