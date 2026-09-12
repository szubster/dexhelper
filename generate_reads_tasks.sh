#!/bin/bash
find .foundry/tasks -type f -name "task-536-565-core-policies-parent-nodes-update.md" | while read -r file; do
    echo "call:default_api:read_file{filepath:\"$file\"}"
done
