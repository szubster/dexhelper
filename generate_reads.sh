#!/bin/bash
find .foundry/docs -type f -name "*.md" | while read -r file; do
    echo "call:default_api:read_file{filepath:\"$file\"}"
done
find .foundry/archive/docs/adrs -type f -name "*.md" | while read -r file; do
    echo "call:default_api:read_file{filepath:\"$file\"}"
done
