#!/bin/bash
npx vitest run src/engine/assistant/generators/tradeGenerator.test.ts --coverage.enabled --coverage.reporter=text | grep -A 2 "tradeGenerator"
