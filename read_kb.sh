#!/bin/bash
find .foundry/docs/knowledge_base -type f | while read -r f; do
  echo "--- $f ---"
  cat "$f"
done
