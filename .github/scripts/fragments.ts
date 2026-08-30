import type { PromptFragment } from './schema.ts';

export function composePromptFragments(fragments: PromptFragment[]): string {
  // Sort fragments by precedence descending, default to 0
  const sorted = [...fragments].sort((a, b) => {
    const precA = a.precedence ?? 0;
    const precB = b.precedence ?? 0;
    return precB - precA;
  });

  const roles: string[] = [];
  const contexts: string[] = [];
  const rules: string[] = [];

  for (const fragment of sorted) {
    if (fragment.role) roles.push(fragment.role);
    if (fragment.context) contexts.push(fragment.context);
    if (fragment.rules && fragment.rules.length > 0) rules.push(...fragment.rules);
  }

  const sections: string[] = [];
  if (roles.length > 0) sections.push(roles.join('\n'));
  if (contexts.length > 0) sections.push(contexts.join('\n\n'));
  if (rules.length > 0) sections.push(rules.join('\n'));

  return sections.join('\n\n');
}
