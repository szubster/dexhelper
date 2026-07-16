const fs = require('fs');

let content = fs.readFileSync('.foundry/epics/epic-112-310-gen2-shiny-breeding-ui.md', 'utf8');

// The validate-foundry-schema.ts seems to fail with:
// Error: Research reference path does not exist: '.foundry/docs/adrs/024-tailwind-v4-utility-consolidation.md' in file /home/runner/work/dexhelper/dexhelper/.foundry/epics/epic-112-310-gen2-shiny-breeding-ui.md
// This could be because in the workflow runner, the directory is something else or the file really isn't found relative to the CWD of the script.
// Wait, the error is: "Error: Research reference path does not exist: '.foundry/docs/adrs/024-tailwind-v4-utility-consolidation.md' in file /home/runner/work/dexhelper/dexhelper/.foundry/epics/epic-112-310-gen2-shiny-breeding-ui.md"

// But wait, the previous log also said:
// Error: Research reference path does not exist: '.foundry/docs/adrs/010-gen3-data-parsing.md' in file /home/runner/work/dexhelper/dexhelper/.foundry/tasks/task-277-322-gen3-trick-house-parser-qa.md
// Error: Research reference path does not exist: '.foundry/docs/adrs/adr-061-026-bitwise-state-extraction.md' in file /home/runner/work/dexhelper/dexhelper/.foundry/tasks/task-277-322-gen3-trick-house-parser-qa.md
