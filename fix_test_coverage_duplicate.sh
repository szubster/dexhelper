#!/bin/bash
sed -i '419,420 s/^\(.*(await getStrategy(1)).*\)\n\(.*(await getStrategy(1)).*\)$/\1/' src/engine/assistant/__tests__/test-coverage.test.ts
