#!/bin/bash
set -e

echo "--- PokéAPI Sync Script ---"

# 1. Run generation
pnpm tsx scripts/generate-pokedata.ts

# 2. Check for changes
if [[ -z $(git status -s public/data/pokedata.json) ]]; then
  echo "No changes detected in pokedata.json. Skipping PR."
  exit 0
fi

# 3. Create a branch and PR
UPSTREAM_SHA=$(node -e "console.log(JSON.parse(require('fs').readFileSync('public/data/pokedata.json', 'utf8')).sourceSha)")
BRANCH_NAME="chore/sync-pokeapi-${UPSTREAM_SHA:0:7}"

echo "Detected changes. Creating PR on branch ${BRANCH_NAME}..."

git checkout -b "$BRANCH_NAME"
git add public/data/pokedata.json
git commit -m "chore: sync PokéAPI data to ${UPSTREAM_SHA:0:7}"
git push origin "$BRANCH_NAME"

gh pr create \
  --title "chore: sync PokéAPI data (${UPSTREAM_SHA:0:7})" \
  --body "Automated sync of PokéAPI data based on upstream changes in PokeAPI/api-data.

Upstream SHA: ${UPSTREAM_SHA}
Generated on: $(date -u)" \
  --base main \
  --head "$BRANCH_NAME"

echo "PR created successfully."
