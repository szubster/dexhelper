#!/bin/bash
for file in $(find .foundry/docs .foundry/archive/docs/adrs -type f -name "*.md"); do
  cat "$file" > /dev/null
done
