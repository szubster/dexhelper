import { Project } from 'ts-morph';
const project = new Project();
project.addSourceFileAtPath('src/components/PokemonDetails.tsx');
const sourceFile = project.getSourceFileOrThrow('src/components/PokemonDetails.tsx');
const unusedImports = sourceFile.getImportDeclarations().flatMap(decl => {
    return decl.getNamedImports().filter(named => {
        return named.getNameNode().findReferencesAsNodes().length === 1;
    }).map(named => named.getName());
});
console.log('Unused Named Imports:', unusedImports);
