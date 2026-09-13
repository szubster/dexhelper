import { describe, expect, it } from 'vitest';
import { Project } from 'ts-morph';
import { identifyFeatureFlags, graduateFeatureFlag } from './core';

describe('Feature Flag Core Logic', () => {
    it('should identify feature flags in code', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test.ts', `
            if (flags.MY_FEATURE) {
                console.log('feature on');
            }
            const x = flags.OTHER_FEATURE ? 1 : 2;
        `);

        const flags = identifyFeatureFlags(sourceFile);
        expect(flags).toContain('MY_FEATURE');
        expect(flags).toContain('OTHER_FEATURE');
    });

    it('should graduate feature flags by replacing if statement with its then block', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test2.ts', `
            function test() {
                if (flags.MY_FEATURE) {
                    console.log('feature on');
                } else {
                    console.log('feature off');
                }
            }
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');

        const result = sourceFile.getText();
        expect(result).toContain("console.log('feature on');");
        expect(result).not.toContain("if (flags.MY_FEATURE)");
        expect(result).not.toContain("console.log('feature off');");
    });

    it('should graduate feature flag in ternary operator', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test3.ts', `
            const result = flags.MY_FEATURE ? 'a' : 'b';
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("const result = 'a';");
        expect(result).not.toContain("flags.MY_FEATURE");
        expect(result).not.toContain("'b'");
    });

    it('should not graduate other feature flags', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test4.ts', `
            if (flags.OTHER_FEATURE) {
                console.log('other');
            }
        `);
        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        expect(sourceFile.getText()).toContain('flags.OTHER_FEATURE');
    });

    it('should graduate inverted feature flags (!flags.MY_FEATURE)', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test5.ts', `
            if (!flags.MY_FEATURE) {
                console.log('old behavior');
            } else {
                console.log('new behavior');
            }
        `);
        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("console.log('new behavior');");
        expect(result).not.toContain("flags.MY_FEATURE");
        expect(result).not.toContain("console.log('old behavior');");
    });

    it('should graduate inverted feature flags (!flags.MY_FEATURE) with no else block', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test5b.ts', `
            console.log('start');
            if (!flags.MY_FEATURE) {
                console.log('old behavior');
            }
            console.log('end');
        `);
        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("console.log('start');");
        expect(result).toContain("console.log('end');");
        expect(result).not.toContain("flags.MY_FEATURE");
        expect(result).not.toContain("console.log('old behavior');");
    });

    it('should graduate inverted feature flag in ternary operator', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test6.ts', `
            const result = !flags.MY_FEATURE ? 'a' : 'b';
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("const result = 'b';");
        expect(result).not.toContain("flags.MY_FEATURE");
        expect(result).not.toContain("'a'");
    });

    it('should graduate feature flags by replacing property access in expressions', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test7.ts', `
            const isEnabled = flags.MY_FEATURE;
            if (isEnabled) {
                console.log('enabled');
            }
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("const isEnabled = true;");
        expect(result).not.toContain("flags.MY_FEATURE");
    });

    it('should graduate feature flags in binary expressions', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test8.ts', `
            if (flags.MY_FEATURE && otherCondition) {
                console.log('enabled');
            }
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("if (true && otherCondition) {");
        expect(result).not.toContain("flags.MY_FEATURE");
    });

    it('should graduate feature flags by replacing negated feature flags in expressions', () => {
        const project = new Project();
        const sourceFile = project.createSourceFile('test9.ts', `
            const isDisabled = !flags.MY_FEATURE;
            if (isDisabled) {
                console.log('disabled');
            }
        `);

        graduateFeatureFlag(sourceFile, 'MY_FEATURE');
        const result = sourceFile.getText();
        expect(result).toContain("const isDisabled = false;");
        expect(result).not.toContain("flags.MY_FEATURE");
    });
});
