import fs from 'node:fs';
import path from 'node:path';

function formatCheckboxes(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            formatCheckboxes(fullPath);
        } else if (file.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            const lines = content.split('\n');
            let inAcceptanceCriteria = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.match(/^#+ Acceptance Criteria\s*$/i)) {
                    inAcceptanceCriteria = true;
                    continue;
                }

                if (inAcceptanceCriteria && line.match(/^#/)) {
                    inAcceptanceCriteria = false;
                }

                if (inAcceptanceCriteria) {
                    const originalLine = line;
                    // Format unchecked: -[], - [ ], * [ ], -[  ], etc.
                    let formattedLine = line.replace(/^(\s*)[-*]\s*\[\s*\]/g, '$1- [ ]');

                    // Format checked: -[x], - [X], * [x], -[ x ], etc.
                    formattedLine = formattedLine.replace(/^(\s*)[-*]\s*\[\s*[xX]\s*\]/g, '$1- [x]');

                    if (originalLine !== formattedLine) {
                        lines[i] = formattedLine;
                        modified = true;
                    }
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, lines.join('\n'));
                console.log(`Formatted checkboxes in ${fullPath}`);
            }
        }
    }
}

const foundryDir = path.resolve(process.cwd(), '.foundry');
formatCheckboxes(foundryDir);
