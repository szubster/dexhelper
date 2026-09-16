import { Project } from 'ts-morph';
import { identifyFeatureFlags, graduateFeatureFlag } from './core.ts';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Usage: pnpm feature-flag <command> [args]');
    console.error('Commands:');
    console.error('  list <filePattern...>                   List all feature flags found in matching files');
    console.error('  graduate <flagName> <filePattern...>    Graduate a specific feature flag in matching files');
    process.exit(1);
}

const command = args[0];

if (command === 'list') {
    const filePatterns = args.slice(1);
    if (filePatterns.length === 0) {
        console.error('Usage: pnpm feature-flag list <filePattern...>');
        process.exit(1);
    }

    const project = new Project();
    project.addSourceFilesAtPaths(filePatterns);

    const allFlags = new Set<string>();

    for (const sourceFile of project.getSourceFiles()) {
        const flags = identifyFeatureFlags(sourceFile);
        for (const flag of flags) {
            allFlags.add(flag);
        }
    }

    console.log('Feature Flags Found:');
    for (const flag of allFlags) {
        console.log(`- ${flag}`);
    }
} else if (command === 'graduate') {
    const flagName = args[1];
    const filePatterns = args.slice(2);

    if (!flagName || filePatterns.length === 0) {
        console.error('Usage: pnpm feature-flag graduate <flagName> <filePattern...>');
        process.exit(1);
    }

    const project = new Project();
    project.addSourceFilesAtPaths(filePatterns);

    let filesModified = 0;

    for (const sourceFile of project.getSourceFiles()) {
        const initialText = sourceFile.getFullText();
        graduateFeatureFlag(sourceFile, flagName);
        const newText = sourceFile.getFullText();

        if (initialText !== newText) {
            filesModified++;
            sourceFile.saveSync();
            console.log(`Updated ${sourceFile.getFilePath()}`);
        }
    }

    console.log(`Graduated flag "${flagName}". Modified ${filesModified} file(s).`);
} else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
