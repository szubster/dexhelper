#!/bin/bash
PRD_FILE=".foundry/prds/prd-142-342-automated-adr-compliance-linter.md"
sed -i 's/- \[ \] Epic Planner: Draft an Epic breaking down the linter script and CI integration into technical chunks./- [x] Epic Planner: Draft an Epic breaking down the linter script and CI integration into technical chunks.\n- [ ] epic-142-417-automated-adr-compliance-linter\n- [ ] epic-142-418-automated-adr-compliance-ci-integration/g' "$PRD_FILE"
