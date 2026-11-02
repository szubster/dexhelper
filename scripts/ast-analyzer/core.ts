import { Project, SyntaxKind, Node } from 'ts-morph';

export interface DetectionResult {
  file: string;
  line: number;
  column: number;
  path: string;
}

export function analyzePlaywrightPaths(filePaths: string[]): DetectionResult[] {
  const project = new Project();
  project.addSourceFilesAtPaths(filePaths);

  const results: DetectionResult[] = [];

  for (const sourceFile of project.getSourceFiles()) {
    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

    for (const callExpr of callExpressions) {
      const expression = callExpr.getExpression();

      if (Node.isPropertyAccessExpression(expression)) {
        const name = expression.getName();
        const obj = expression.getExpression();

        if (name === 'goto' && obj.getText() === 'page') {
          const args = callExpr.getArguments();
          if (args.length > 0) {
            const firstArg = args[0];
            let valueToTest: string | undefined;

            if (firstArg && (Node.isStringLiteral(firstArg) || Node.isNoSubstitutionTemplateLiteral(firstArg))) {
              valueToTest = firstArg.getLiteralValue();
            }

            if (firstArg && valueToTest !== undefined) {
              if (
                valueToTest.startsWith('/') &&
                !valueToTest.startsWith('//') &&
                !valueToTest.startsWith('http://') &&
                !valueToTest.startsWith('https://')
              ) {
                const start = firstArg.getStart();
                const { line, column } = sourceFile.getLineAndColumnAtPos(start);
                results.push({
                  file: sourceFile.getFilePath(),
                  line,
                  column,
                  path: valueToTest,
                });
              }
            }
          }
        }
      }
    }
  }

  return results;
}
