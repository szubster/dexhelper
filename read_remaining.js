import fs from 'fs';

const files = [
    '.foundry/docs/adrs/008-graph-rendering-library-selection.md',
    '.foundry/docs/adrs/018-smart-route-radar.md',
    '.foundry/docs/adrs/013-kanban-board-state-management.md',
    '.foundry/docs/adrs/007-enforce-acceptance-criteria-checkboxes.md',
    '.foundry/docs/adrs/004-research-context-propagation.md',
    '.foundry/docs/adrs/011-robust-session-completion.md',
    '.foundry/docs/adrs/019-cloudflare-native-authentication.md',
    '.foundry/docs/adrs/024-tailwind-v4-utility-consolidation.md',
    '.foundry/docs/adrs/009-enforce-acceptance-criteria-empty-prs.md',
    '.foundry/docs/adrs/006-gray-matter-parsing.md',
    '.foundry/docs/adrs/002-collision-free-id-schema.md',
    '.foundry/docs/adrs/014-auditor-persona-state-machine.md',
    '.foundry/docs/adrs/015-revert-data-optimizations.md',
    '.foundry/docs/adrs/001-the-foundry-architecture.md',
    '.foundry/docs/adrs/003-gastown-migration-decision.md',
    '.foundry/docs/adrs/010-gen3-map-graph-design.md',
    '.foundry/docs/adrs/016-file-system-access-api-sync.md',
    '.foundry/docs/adrs/010-gen3-data-parsing.md',
    '.foundry/docs/adrs/012-automated-nuzlocke-tracker.md',
    '.foundry/docs/adrs/005-sibling-dependency-enforcement.md',
    '.foundry/docs/adrs/017-permanent-failure-dashboard.md',
    '.foundry/docs/adrs/010-msgpack-for-gen3-data.md',
    '.foundry/docs/adrs/020-feebas-visualization-architecture.md',
    '.foundry/docs/knowledge_base/agents/core_policies.md'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        console.log(`\n--- ${file} ---`);
        console.log(fs.readFileSync(file, 'utf8'));
    }
}
