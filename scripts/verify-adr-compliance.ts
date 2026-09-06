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
    'rounded-xl', 'rounded-2xl', 'rounded-3xl'
];

interface Violation {
    file: string;
    line: number;
    class: string;
}

export function checkAdr013ComplianceInFile(filePath: string): Violation[] {
    const violations: Violation[] = [];
    const project = new Project();

    // Skip the Context provider itself as it's allowed to have state
    if (filePath.endsWith('DagContext.tsx')) {
        return violations;
    }

    const sourceFile = project.addSourceFileAtPath(filePath);

    // Check imports for useState
    const imports = sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration);
    imports.forEach(imp => {
        const namedImports = imp.getImportClause()?.getNamedBindings();
        if (namedImports && namedImports.getKind() === SyntaxKind.NamedImports) {
            (namedImports as import('ts-morph').NamedImports).getElements().forEach(element => {
                if (element.getName() === 'useState') {
                    violations.push({
                        file: filePath,
                        line: imp.getStartLineNumber(),
                        class: 'useState (Import) - ADR 013 Violation: Use shared React Context instead of local state'
                    });
                }
            });
        }
    });

    // Check hooks for useState
    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
    callExpressions.forEach(callExpr => {
        const expr = callExpr.getExpression();
        if (expr.getKind() === SyntaxKind.Identifier && expr.getText() === 'useState') {
            violations.push({
                file: filePath,
                line: callExpr.getStartLineNumber(),
                class: 'useState (Hook) - ADR 013 Violation: Use shared React Context instead of local state'
            });
        }
    });

    return violations;
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

    console.log('Verifying ADR Compliance...');

    walkDir(srcDir, (filePath) => {
        totalFiles++;
        try {
            const violations = findViolationsInFile(filePath);
            const adr013Violations = filePath.includes('components/dashboard/')
                ? checkAdr013ComplianceInFile(filePath)
                : [];

            const allViolations = [...violations, ...adr013Violations];

            if (allViolations.length > 0) {
                hasViolations = true;
                allViolations.forEach(v => {
                    const relativePath = path.relative(rootDir, v.file);
                    const errorType = v.class.includes('ADR 013 Violation') ? v.class : `Forbidden class '${v.class}'`;
                    console.error(`Violation: ${errorType} found in ${relativePath}:${v.line}`);
                });
            }
        } catch (e) {
            console.error(`Error parsing ${filePath}:`, e);
        }
    });

    console.log(`Scanned ${totalFiles} files.`);

    if (hasViolations) {
        console.error('Compliance checks failed.');
        process.exit(1);
    } else {
        console.log('Compliance checks passed.');
    }
}

// Only run if called directly
if (process.argv[1] === __filename || process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
