#!/bin/bash

# Setup temp dir
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Create mock foundry structure
mkdir -p "$TEMP_DIR/.foundry/tasks"

# Write valid mock node
VALID_FILE="$TEMP_DIR/.foundry/tasks/task-123-000-valid.md"
cat << 'INNER_EOF' > "$VALID_FILE"
---
id: task-123-000-valid
title: Valid Title
type: TASK
status: READY
owner_persona: coder
created_at: '2023-10-10'
updated_at: '2023-10-10'
depends_on: []
jules_session_id: null
rejection_reason: ''
---
# Valid Task
INNER_EOF

# Write invalid mock node (missing required fields)
INVALID_FILE="$TEMP_DIR/.foundry/tasks/task-123-001-invalid.md"
cat << 'INNER_EOF' > "$INVALID_FILE"
---
id: task-123-001-invalid
---
# Invalid Task
INNER_EOF

SCRIPT_PATH="$(pwd)/scripts/validate-foundry-schema.ts"

# Test valid file
echo "Testing valid schema file..."
if node --experimental-strip-types "$SCRIPT_PATH" "$VALID_FILE"; then
    echo "Valid file test passed."
else
    echo "Valid file test failed (exited with non-zero)."
    exit 1
fi

# Test invalid file
echo "Testing invalid schema file..."
if node --experimental-strip-types "$SCRIPT_PATH" "$INVALID_FILE" >/dev/null 2>&1; then
    echo "Invalid file test failed: Script exited with 0 but should have exited with 1."
    exit 1
else
    echo "Invalid file test passed."
fi

echo "All lefthook schema validation E2E tests passed."
