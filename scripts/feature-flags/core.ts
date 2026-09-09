import { SyntaxKind, SourceFile, Node } from 'ts-morph';

export function identifyFeatureFlags(sourceFile: SourceFile, flagObjectName: string = 'flags'): string[] {
    const flags = new Set<string>();
    sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression).forEach(access => {
        if (access.getExpression().getText() === flagObjectName) {
            flags.add(access.getName());
        }
    });
    return Array.from(flags);
}

export function graduateFeatureFlag(sourceFile: SourceFile, flagName: string, flagObjectName: string = 'flags'): void {
    let changed = true;
    while(changed) {
        changed = false;

        const ifStatements = sourceFile.getDescendantsOfKind(SyntaxKind.IfStatement);

        for (const ifStmt of ifStatements) {
            const condition = ifStmt.getExpression();
            let matched = false;

            // Handle direct property access `if (flags.MY_FEATURE)`
            if (condition.getKind() === SyntaxKind.PropertyAccessExpression) {
                const propAccess = condition.asKind(SyntaxKind.PropertyAccessExpression);
                if (propAccess && propAccess.getExpression().getText() === flagObjectName && propAccess.getName() === flagName) {
                    const thenStatement = ifStmt.getThenStatement();

                    if (thenStatement.getKind() === SyntaxKind.Block) {
                        const block = thenStatement.asKind(SyntaxKind.Block);
                        if (block) {
                            const statementsText = block.getStatements().map((s: Node) => s.getText()).join('\n');
                            ifStmt.replaceWithText(statementsText);
                        }
                    } else {
                        ifStmt.replaceWithText(thenStatement.getText());
                    }
                    matched = true;
                }
            }

            // Handle negative conditions `if (!flags.MY_FEATURE)`
            if (!matched && condition.getKind() === SyntaxKind.PrefixUnaryExpression) {
                 const prefixExpr = condition.asKind(SyntaxKind.PrefixUnaryExpression);
                 if (prefixExpr && prefixExpr.getOperatorToken() === SyntaxKind.ExclamationToken) {
                     const operand = prefixExpr.getOperand();
                     if (operand.getKind() === SyntaxKind.PropertyAccessExpression) {
                         const propAccess = operand.asKind(SyntaxKind.PropertyAccessExpression);
                         if (propAccess && propAccess.getExpression().getText() === flagObjectName && propAccess.getName() === flagName) {
                             const elseStatement = ifStmt.getElseStatement();
                             if (elseStatement) {
                                 if (elseStatement.getKind() === SyntaxKind.Block) {
                                     const block = elseStatement.asKind(SyntaxKind.Block);
                                     if (block) {
                                         const statementsText = block.getStatements().map((s: Node) => s.getText()).join('\n');
                                         ifStmt.replaceWithText(statementsText);
                                     }
                                 } else {
                                     ifStmt.replaceWithText(elseStatement.getText());
                                 }
                             } else {
                                 // No else block, just remove the if statement entirely
                                 ifStmt.remove();
                             }
                             matched = true;
                         }
                     }
                 }
            }

            if (matched) {
                changed = true;
                break;
            }
        }

        if (changed) continue;

        // Process ternary expressions
        const conditionalExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.ConditionalExpression);
        for (const condExpr of conditionalExpressions) {
            const condition = condExpr.getCondition();
            let matched = false;

            if (condition.getKind() === SyntaxKind.PropertyAccessExpression) {
                 const propAccess = condition.asKind(SyntaxKind.PropertyAccessExpression);
                 if (propAccess && propAccess.getExpression().getText() === flagObjectName && propAccess.getName() === flagName) {
                     const whenTrue = condExpr.getWhenTrue();
                     condExpr.replaceWithText(whenTrue.getText());
                     matched = true;
                 }
            }

            // Handle negative ternary `!flags.MY_FEATURE ? a : b`
            if (!matched && condition.getKind() === SyntaxKind.PrefixUnaryExpression) {
                const prefixExpr = condition.asKind(SyntaxKind.PrefixUnaryExpression);
                if (prefixExpr && prefixExpr.getOperatorToken() === SyntaxKind.ExclamationToken) {
                    const operand = prefixExpr.getOperand();
                    if (operand.getKind() === SyntaxKind.PropertyAccessExpression) {
                        const propAccess = operand.asKind(SyntaxKind.PropertyAccessExpression);
                        if (propAccess && propAccess.getExpression().getText() === flagObjectName && propAccess.getName() === flagName) {
                            const whenFalse = condExpr.getWhenFalse();
                            condExpr.replaceWithText(whenFalse.getText());
                            matched = true;
                        }
                    }
                }
            }

            if (matched) {
                changed = true;
                break;
            }
        }

        if (changed) continue;

        // Process Property Accesses in larger expressions (e.g. binary expressions, assignments, variable declarations)
        // Find all PropertyAccessExpressions that match our flag
        const propertyAccesses = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression);
        for (const propAccess of propertyAccesses) {
            if (propAccess.getExpression().getText() === flagObjectName && propAccess.getName() === flagName) {
                // Determine if it's negated
                const parent = propAccess.getParent();
                let isNegated = false;
                let nodeToReplace: Node = propAccess;

                if (parent && parent.getKind() === SyntaxKind.PrefixUnaryExpression) {
                    const prefixExpr = parent.asKind(SyntaxKind.PrefixUnaryExpression);
                    if (prefixExpr && prefixExpr.getOperatorToken() === SyntaxKind.ExclamationToken) {
                        isNegated = true;
                        nodeToReplace = prefixExpr;
                    }
                }

                // If it's part of a larger expression, replace with true or false
                nodeToReplace.replaceWithText(isNegated ? 'false' : 'true');
                changed = true;
                break;
            }
        }
    }
}
