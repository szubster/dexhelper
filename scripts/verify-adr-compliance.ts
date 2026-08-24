import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Project, SyntaxKind } from 'ts-morph';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const forbiddenClasses = [
    'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r',
    'rounded-tl', 'rounded-tr', 'rounded-bl', 'rounded-br',
    'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg',
    'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'
];

interface Violation {
    file: string;
    line: number;
    class: string;
}

export function findViolationsInFile(filePath: string): Violation[] {
    const violations: Violation[] = [];
    const project = new Project();

    // Add the file to ts-morph project
    const sourceFile = project.addSourceFileAtPath(filePath);

    // Find all StringLiterals and NoSubstitutionTemplateLiterals
    const stringLiterals = sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral);
    const templateLiterals = sourceFile.getDescendantsOfKind(SyntaxKind.NoSubstitutionTemplateLiteral);
    const templateHead = sourceFile.getDescendantsOfKind(SyntaxKind.TemplateHead);
    const templateMiddle = sourceFile.getDescendantsOfKind(SyntaxKind.TemplateMiddle);
    const templateTail = sourceFile.getDescendantsOfKind(SyntaxKind.TemplateTail);

    const allTextNodes = [
        ...stringLiterals,
        ...templateLiterals,
        ...templateHead,
        ...templateMiddle,
        ...templateTail
    ];

    allTextNodes.forEach(node => {
        let text = '';
        if (node.getKind() === SyntaxKind.StringLiteral || node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral) {
            text = node.getLiteralText();
        } else {
            // For template spans, we can just get the literal text
            text = node.getLiteralText();
        }

        const classes = text.split(/\s+/);
        for (const cls of classes) {
            const baseClass = cls.split(':').pop() || '';

            if (forbiddenClasses.includes(baseClass)) {
                violations.push({
                    file: filePath,
                    line: node.getStartLineNumber(),
                    class: cls
                });
            }
        }
    });

    return violations;
}

function walkDir(dir: string, callback: (filePath: string) => void) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath, callback);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            callback(filePath);
        }
    }
}

function main() {
    let hasViolations = false;
    let totalFiles = 0;

    console.log('Verifying ADR 008 Compliance...');

    walkDir(srcDir, (filePath) => {
        totalFiles++;
        try {
            const violations = findViolationsInFile(filePath);

            if (violations.length > 0) {
                hasViolations = true;
                violations.forEach(v => {
                    const relativePath = path.relative(rootDir, v.file);
                    console.error(`Violation: Forbidden class '${v.class}' found in ${relativePath}:${v.line}`);
                });
            }
        } catch (e) {
            console.error(`Error parsing ${filePath}:`, e);
        }
    });

    console.log(`Scanned ${totalFiles} files.`);

    if (hasViolations) {
        console.error('ADR 008 Compliance check failed.');
        process.exit(1);
    } else {
        console.log('ADR 008 Compliance check passed.');
    }
}

// Only run if called directly
if (process.argv[1] === __filename || process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
