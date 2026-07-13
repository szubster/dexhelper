#!/bin/bash
# A more robust script to archive nodes properly.

# We only archive nodes in status COMPLETED or CANCELLED
nodes_to_archive=($(find .foundry/epics .foundry/stories .foundry/tasks .foundry/research .foundry/prds .foundry/ideas -name "*.md" -type f -not -path "*/archive/*" | xargs grep -lE "^status: (COMPLETED|CANCELLED)$" || true))

for node in "${nodes_to_archive[@]}"; do
    filename=$(basename "$node" .md)
    node_id="$filename"
    type=$(echo "$node_id" | awk -F'-' '{print $1}')

    if [[ "$type" == "epic" || "$type" == "story" || "$type" == "prd" || "$type" == "idea" ]]; then
        if [ "$type" == "idea" ]; then
            seq_num=$(echo "$node_id" | awk -F'-' '{print $2}')
        else
            seq_num=$(echo "$node_id" | awk -F'-' '{print $3}')
        fi

        active_children=$(find .foundry/epics .foundry/stories .foundry/tasks .foundry/research .foundry/prds -name "*-${seq_num}-*.md" -type f -not -path "*/archive/*" -not -path "*${node_id}*" | head -n 1)

        if [ -n "$active_children" ]; then
            echo "Skipping $node because it has active child $active_children"
            continue
        fi
    fi

    echo "Archiving $node"

    dir=$(dirname "$node")
    base_dir=$(basename "$dir")
    archive_dir=".foundry/archive/$base_dir"
    mkdir -p "$archive_dir"
    mv "$node" "$archive_dir/"

    old_path="$node"
    old_path=${old_path#./} # strip leading ./

    new_path=".foundry/archive/$base_dir/$(basename "$node")"

    # Update ALL active files that reference them in inline markdown links to use the new archived path.
    # Note: If the review failed because we missed something, it's possible some links didn't start with `.foundry/`
    # E.g. they might just be `[text](task-xxx.md)` or similar.
    # But usually they are repo-relative paths.

    find .foundry -name "*.md" -type f -not -path "*/archive/*" -not -path "*/docs/*" -not -path "*/journals/*" | while read -r f; do
        if grep -q "$old_path" "$f"; then
            echo "Updating link in $f"
            perl -0777 -pi -e "s/^(---.*?---)//s; my \$fm = \$1; s|\\Q$old_path\\E|$new_path|g; \$_ = \$fm . \$_" "$f"
        fi
    done
done
